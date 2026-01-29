import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { LazyLoadProps } from './props/lazy-load.props';
import { ChildrenComponentProps } from '../../models/component-with-chilren.model';
import { useObserver } from '../../hooks/observer/observer.hook';
import { usePreviousValue } from '../../hooks/previous-value/previous-value.hook';
import { getTotalPages } from '../../utils/get-total-pages.util';

export default function LazyLoad<T>({
  children,
  page,
  setPage,
  pageSize,
  total,
  newOptions,
  setShowOptions,
  showOptions,
  isLoading,
}: LazyLoadProps<T> & ChildrenComponentProps) {
  const [topSentinel, setTopSentinel] = useState<HTMLDivElement | null>(null);
  const [bottomSentinel, setBottomSentinel] = useState<HTMLDivElement | null>(null);

  const isFirstIntersection = useObserver(topSentinel);
  const isLastIntersection = useObserver(bottomSentinel);

  const totalPages = useMemo(() => getTotalPages(total, pageSize), [pageSize, total]);

  const prevPage = usePreviousValue(page);
  const previousScrollHeight = useRef<number>(0);

  useLayoutEffect(() => {
    const container = topSentinel?.parentElement;

    if (!container) return;

    const currentScrollHeight = container.scrollHeight;
    const scrollDiff = currentScrollHeight - previousScrollHeight.current;

    if (prevPage !== undefined && page < prevPage) {
      if (scrollDiff > 0) {
        container.scrollTop += scrollDiff;
      }
    }

    if (prevPage !== undefined && page > prevPage) {
      container.scrollTop += scrollDiff;
    }

    previousScrollHeight.current = currentScrollHeight;
  }, [showOptions, page, prevPage, topSentinel]);

  useEffect(() => {
    if (prevPage === undefined) return;
    else if (showOptions.length === 0 && total !== 0) {
      console.log(1);
      setShowOptions(newOptions);
      return;
    }

    const container = topSentinel?.parentElement;
    if (container) {
      previousScrollHeight.current = container.scrollHeight;
    }

    if (page > prevPage) {
      const keepFromOld = showOptions.slice(-pageSize);
      setShowOptions([...keepFromOld, ...newOptions]);
    } else if (page < prevPage) {
      const keepFromOld = showOptions.slice(0, pageSize);
      setShowOptions([...newOptions, ...keepFromOld]);
    }
  }, [page, newOptions]);

  useEffect(() => {
    if (!isLoading && isFirstIntersection && page > 1) {
      setPage(page - 1);
    }
  }, [isFirstIntersection, isLoading, page, setPage]);

  useEffect(() => {
    if (!isLoading && isLastIntersection && page < totalPages) {
      setPage(page + 1);
    }
  }, [isLastIntersection, isLoading, page, setPage, totalPages]);

  return (
    <>
      <div
        ref={setTopSentinel}
        style={{ height: '1px' }}
      />

      {children}

      <div
        ref={setBottomSentinel}
        style={{ height: '1px' }}
      />
    </>
  );
}
