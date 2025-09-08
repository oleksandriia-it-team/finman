import { Resource } from '../models/resource.model';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getErrorMessage } from '../utils/get-error-message.util';
import { ErrorTexts } from '../constants/error-texts.contant';

/**
 * A custom React hook for managing asynchronous operations with built-in loading, error, and data states.
 * Provides a simple way to handle async data fetching with automatic state management
 * and request cancellation.
 *
 * Features:
 * - Tracks loading, error, and resolved value states
 * - Aborts the current request if:
 *   - `refresh()` is called again before the previous request finishes
 *   - The component using this hook is unmounted
 *   - The `asyncFunction` dependency changes
 *
 * @template T - The type of the data returned by the async function
 *
 * @param {(signal?: AbortSignal) => Promise<T>} asyncFunction - An asynchronous function that returns a promise.
 * It receives an optional AbortSignal, which allows the hook to cancel in-flight requests safely.
 * The function should handle its own API errors or let them propagate to be caught by the hook.
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
 * const userResource = useResource(async (signal) => {
 *   const response = await fetch('/api/user/123', { signal });
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
 * const dashboardData = useResource(async (signal) => {
 *   const [user, posts, notifications] = await Promise.all([
 *     fetch('/api/user', { signal }).then(res => res.json()),
 *     fetch('/api/posts', { signal }).then(res => res.json()),
 *     fetch('/api/notifications', { signal }).then(res => res.json())
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
export function useResource<T>(asyncFunction: (signal?: AbortSignal) => Promise<T>): Resource<T> {
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isError, setIsError ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ value, setValue ] = useState<T | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const refresh = useCallback(async () => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setIsLoading(true);
    setIsError(false);
    setErrorMessage('');
    try {
      const result = await asyncFunction(controller.signal);
      console.log(result);
      setValue(result);
    } catch ( error ) {
      const message = getErrorMessage(error);
      if (message === ErrorTexts.UnknownError) return;
      setIsError(true);
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  }, [ asyncFunction ]);

  useEffect(() => {
    refresh();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [ refresh ]);

  return { isLoading, isError, errorMessage, value, refresh };
}
