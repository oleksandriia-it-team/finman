import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { LazyLoadProps } from './props/lazy-load.props';
import { ChildrenComponentProps } from '../../models/component-with-chilren.model';
import { usePreviousValue } from '../../hooks/previous-value/previous-value.hook';
import { useEventHandler } from '../../hooks/event-handler/event-handler.hook';
import { isEmpty } from '../../../../common/utils/is-empty.util';

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
  itemHeight,
}: LazyLoadProps<T> & ChildrenComponentProps) {
  const [topSentinel, setTopSentinel] = useState<HTMLDivElement | null>(null);

  const [startPage, setStartPage] = useState(page);

  const totalScrollHeight = useMemo(() => total * itemHeight, [itemHeight, total]);

  const topSentinelScrollHeight = useMemo(
    () => Math.min(totalScrollHeight, (startPage - 1) * pageSize * itemHeight),
    [startPage, pageSize, itemHeight, totalScrollHeight],
  );

  const bottomSentinelScrollHeight = useMemo(() => {
    return Math.max(0, totalScrollHeight - topSentinelScrollHeight - showOptions.length * itemHeight);
  }, [totalScrollHeight, topSentinelScrollHeight, showOptions, itemHeight]);

  const prevPage = useRef<number | undefined>(undefined);
  const prevOptions = usePreviousValue(newOptions, newOptions);

  const scrollHandler = useCallback(
    (event: Event) => {
      if (isLoading) return;

      const scrollTop = (event.target as HTMLElement).scrollTop;

      if (scrollTop >= totalScrollHeight) {
        return;
      }

      const currentVisibleItem = Math.floor(scrollTop / itemHeight);

      const firstPageItem = (page - 1) * pageSize;
      const lastPageItem = page * pageSize - 1;

      if (currentVisibleItem > lastPageItem) {
        setPage(page + 1);
      } else if (currentVisibleItem < firstPageItem && page > 1) {
        setPage(page - 1);
      }
    },
    [itemHeight, page, pageSize, setPage, totalScrollHeight, isLoading],
  );

  useEventHandler('scroll', topSentinel?.parentElement, scrollHandler);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (showOptions.length === 0 && newOptions.length > 0) {
      setShowOptions(newOptions);
      setStartPage(page);
      prevPage.current = page;
      return;
    }

    if (isEmpty(prevPage.current) || prevPage.current === page || prevOptions === newOptions) return;

    if (page > prevPage.current) {
      const keepFromOld = showOptions.length > pageSize ? showOptions.slice(pageSize) : showOptions;

      setShowOptions([...keepFromOld, ...newOptions]);

      setStartPage(page - 1);
    } else if (page < prevPage.current) {
      if (page === startPage) {
        setShowOptions(showOptions.slice(0, pageSize));
        return;
      }

      const keepFromOld = showOptions.slice(0, pageSize);
      setShowOptions([...newOptions, ...keepFromOld]);

      setStartPage(page);
    }

    prevPage.current = page;
  }, [page, newOptions, isLoading, prevPage, setShowOptions, pageSize, startPage, showOptions]);

  return (
    <>
      <div
        ref={setTopSentinel}
        style={{ height: `${topSentinelScrollHeight}px` }}
      />
      {children}
      <div style={{ height: `${bottomSentinelScrollHeight}px` }} />
    </>
  );
}
