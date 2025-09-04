import { Resource } from '../models/resource.model';
import { useCallback, useState } from 'react';

/**
 * A custom React hook for managing asynchronous operations with built-in loading, error, and data states.
 * Provides a simple way to handle async data fetching with automatic state management.
 *
 * @template T - The type of the data returned by the async function
 *
 * @param {() => Promise<T>} asyncFunction - An asynchronous function that returns a promise.
 * This function is called when refresh() is invoked. The function should handle its own API errors
 * or let them propagate to be caught by the hook.
 *
 * @returns {Resource<T>} An object containing the async operation state and controls
 * @returns {boolean} isLoading - True when the async operation is in progress
 * @returns {boolean} isError - True if the last operation resulted in an error
 * @returns {string} errorMessage - Descriptive error message from the failed operation
 * @returns {T | null} value - The successfully fetched data, or null if not loaded/errored
 * @returns {() => Promise<void>} refresh - Function to manually trigger the async operation
 *
 * @example
 * // Fetch user data with automatic error handling
 * const userResource = useResource(async () => {
 *   const response = await fetch('/api/user/123');
 *   if (!response.ok) throw new Error('Failed to fetch user');
 *   return response.json();
 * });
 *
 * // Auto-fetch on component mount
 * useEffect(() => {
 *   userResource.refresh();
 * }, []);
 *
 * @example
 * // Complex data transformation with error handling
 * const dashboardData = useResource(async () => {
 *   const [user, posts, notifications] = await Promise.all([
 *     fetch('/api/user').then(res => res.json()),
 *     fetch('/api/posts').then(res => res.json()),
 *     fetch('/api/notifications').then(res => res.json())
 *   ]);
 *
 *   return {
 *     user,
 *     recentPosts: posts.slice(0, 5),
 *     unreadNotifications: notifications.filter(n => !n.read)
 *   };
 * });
 *
 * @example
 * // Usage in component with loading states and error boundaries
 * function UserProfile() {
 *   const userResource = useResource(fetchUserData);
 *   const { isLoading, isError, errorMessage, value, refresh } = userResource;
 *
 *   if (isLoading) {
 *     return (
 *       <div className="flex justify-center items-center h-64">
 *         <Spinner size="lg" />
 *         <span className="ml-3">Loading user profile...</span>
 *       </div>
 *     );
 *   }
 *
 *   if (isError) {
 *     return (
 *       <ErrorContainer
 *         message={errorMessage}
 *         onRetry={refresh}
 *       />
 *     );
 *   }
 *
 *   return (
 *     <div>
 *       <h1>Welcome, {value.name}!</h1>
 *       <p>Email: {value.email}</p>
 *       <button onClick={refresh} className="btn btn-secondary">
 *         Refresh Data
 *       </button>
 *     </div>
 *   );
 * }
 *
 * @example
 * // Integration with React Query-like refetching patterns
 * function DataTable() {
 *   const { value: data, isLoading, refresh } = useResource(fetchTableData);
 *
 *   const handleFiltersChange = useCallback((filters) => {
 *     // Update filters then refresh data
 *     updateFilters(filters);
 *     refresh();
 *   }, [refresh]);
 *
 *   return (
 *     <div>
 *       <FilterPanel onChange={handleFiltersChange} />
 *       {isLoading ? <SkeletonTable /> : <Table data={data} />}
 *     </div>
 *   );
 * }
 */
export function useResource<T>(asyncFunction: () => Promise<T>): Resource<T> {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isError, setIsError ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ value, setValue ] = useState<T | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    setErrorMessage('');
    try {
      const result = await asyncFunction();
      setValue(result);
    } catch ( error ) {
      setIsError(true);
      setErrorMessage(error instanceof Error ? error.message : String(error));
    } finally {
      setIsLoading(false);
    }
  }, [ asyncFunction ]);

  return { isLoading, isError, errorMessage, value, refresh };
}
