import { useCallback, useEffect, useRef, useState } from 'react';
import { Resource } from './models/resource.model';
import { getErrorMessage } from '../../../../common/utils/get-error-message.util';
import { ErrorTexts } from '../../../../common/constants/error-texts.contant';
import { useDeepCompareMemoize } from '../deep-compare-memoize/deep-compate-memoize.hook';
import { usePreviousValue } from '../previous-value/previous-value.hook';

export function useResource<T, P extends Array<unknown>>(
  params: P,
  asyncFunction: (signal: AbortSignal, ...params: P) => Promise<T>,
): Resource<T> {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [value, setValue] = useState<T | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const asyncFunctionRef = usePreviousValue(asyncFunction, asyncFunction);

  const memoizedParams = useDeepCompareMemoize(params);

  const refresh = useCallback(async () => {
    abortControllerRef.current?.abort();
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    setIsError(false);
    setErrorMessage('');

    try {
      const result = await asyncFunctionRef(controller.signal, ...memoizedParams);
      setValue(result);
      setIsLoading(false);
    } catch (error) {
      if (controller.signal.aborted) return;

      const message = getErrorMessage(error);
      if (message === ErrorTexts.UnknownError) return;
      setIsError(true);
      setErrorMessage(message);
      setIsLoading(false);
    }
  }, [memoizedParams]);

  useEffect(() => {
    void refresh();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [refresh]);

  return { isLoading, isError, errorMessage, value, refresh };
}
