import { useCallback, useEffect, useRef, useState } from 'react';
import { UseLazyLoadModel } from './use-lazy-load.model';
import { blockSameProps } from '../../utils/block-same-props.util';


export function useLazyLoad<F, C>(service: UseLazyLoadModel<F, C>,) {

  const [ items, setItems ] = useState<{ label: string; value: string }[]>([]);
  const [ loading, setLoading ] = useState(false);
  const loadLazyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const step = service.step;

  useEffect(() => {
    service.getTotalCount(service.filter).then((res) => {
      setItems(Array.from({ length: res }));
      onLazyLoad(1, step + 1);
    });
  }, [ service, service.filter ]);

  const onLazyLoad = useCallback(
    blockSameProps(
      (first: number, last: number) => {
        setLoading(true);
        if (loadLazyTimeout.current) {
          clearTimeout(loadLazyTimeout.current);
        }

        loadLazyTimeout.current = setTimeout(() => {
          const from = first;
          const to = last;
          console.log(from);
          console.log(to);

          service.getItems(from, to, service.filter).then((res) => {
            const newItems = res.map(service.mapItem);

            setItems((prev) => {
              const updated = [ ...prev ];
              newItems.forEach((item: { label: string, value: string }, index: number) => {
                updated[first + index - 1] = item;
              });
              return updated;
            });

            setLoading(false);
          });

          loadLazyTimeout.current = null;
        });
      },
      (curr, prev) => {
        return curr[0] === prev[0] && curr[1] <= prev[1];
      }
    ),
    [ service, service.filter ]
  );
  const virtualScrollerOptions = {
    lazy: true,
    onLazyLoad: ({ first, last }: { first: number, last: number }) => onLazyLoad(first + 1, (last || step) + 1),
    itemSize: 38,
    showLoader: true,
    loading,
    step
  };

  return {
    items,
    virtualScrollerOptions,
  };
}
