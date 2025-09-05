/**
 * Represents the complete state and control interface for an asynchronous resource operation.
 * Designed to be easily destructured and used in React components with intuitive property names.
 *
 * @template T - The type of data expected from the successful async operation
 */
export interface Resource<T> {
  /**
   * Loading state indicator. True when the async operation is in progress,
   * false when the operation has completed (successfully or with error).
   * Useful for showing loading spinners, skeleton screens, or disabling interactive elements.
   */
  isLoading: boolean;
  /**
   * Error state indicator. True if the most recent async operation resulted in an error.
   * Resets to false when refresh() is called again. Use with errorMessage for complete error handling.
   */
  isError: boolean;
  /**
   * Descriptive error message from the failed operation. Empty string when no error has occurred.
   * Contains the error message from the caught exception, suitable for displaying to users.
   */
  errorMessage: string;
  /**
   * The successfully retrieved data from the async operation.
   * Null when: data hasn't been loaded yet, loading is in progress, or an error occurred.
   * Type-safe access to the requested data when available.
   */
  value: T | null;
  /**
   * Function to manually trigger the async operation. Returns a promise that resolves when
   * the operation completes (use await if you need to perform actions after completion).
   * Automatically resets error states and triggers loading state when called.
   *
   * @returns {Promise<void>} Promise that resolves after the operation completes
   * @throws Does not throw errors - errors are captured in isError and errorMessage states
   */
  refresh: () => Promise<void>;
}