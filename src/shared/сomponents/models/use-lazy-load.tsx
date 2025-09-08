import { useCallback, useEffect, useRef, useState } from 'react';
import { UseLazyLoadModel } from './use-lazy-load.model';


export function useLazyLoad<F, C>(service: UseLazyLoadModel<F, C>,) {

  const [ items, setItems ] = useState<{ label: string; value: string }[]>([]);
  const [ loading, setLoading ] = useState(false);
  const loadLazyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const step = service.step;

  useEffect(() => {
    service.getTotalCount(service.filter).then((res) => {
      setItems(Array.from({ length: res }));
      onLazyLoad({ first: 0, last: 25 });
    });
  }, [ service, service.filter ]);

  const onLazyLoad = useCallback(
      (event: { first: number; last: number }) => {
        setLoading(true);
        if (loadLazyTimeout.current) {
          clearTimeout(loadLazyTimeout.current);
        }

        loadLazyTimeout.current = setTimeout(() => {
          const from = event.first + 1;
          const to = event.last + 1;
          console.log(from);
          console.log(to);

          service.getItems(from, to, service.filter).then((res) => {
            const newItems = res.map(service.mapItem);

            setItems((prev) => {
              const updated = [ ...prev ];
              newItems.forEach((item: { label: string, value: string }, index: number) => {
                updated[event.first + index] = item;
              });
              console.log(updated);
              return updated;
            });

            setLoading(false);
          });

          loadLazyTimeout.current = null;
        });
      },
      [ service, service.filter ]
  );
  const virtualScrollerOptions = {
    lazy: true,
    onLazyLoad,
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
