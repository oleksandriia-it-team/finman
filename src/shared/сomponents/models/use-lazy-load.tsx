import { useCallback, useEffect, useRef, useState } from 'react';
import { UseLazyLoadModel } from './use-lazy-load.model';


/**
 * React hook for implementing **lazy loading with virtual scrolling**.
 *
 * This hook handles:
 * - Fetching the total count of items to create a placeholder array.
 * - Loading data chunks (pages) on demand when the virtual scroller requests them.
 * - Updating items efficiently by replacing only the loaded portion.
 * - Exposing virtual scroller options compatible with libraries like PrimeReact.
 *
 * @template L - The lookup type or entity type used by the service.
 * @template F - The filter type used for querying data.
 * @template C - The raw item type returned from the service before mapping.
 *
 * @param {UseLazyLoadModel<L, F, C>} service - Service definition containing:
 *   - `type`: the lookup type or entity identifier.
 *   - `filter`: filter options for data queries.
 *   - `step`: number of items to load per request (page size).
 *   - `mapItem`: function mapping raw service results into `{ label, value }` objects.
 *   - `getTotalCount(type, filter)`: async function returning the total item count.
 *   - `getItems(type, from, to, filter)`: async function fetching a range of items.
 *
 * @returns {{
 *   items: { label: string; value: string }[];
 *   virtualScrollerOptions: {
 *     lazy: boolean;
 *     onLazyLoad: (event: { first: number; last: number }) => void;
 *     itemSize: number;
 *     showLoader: boolean;
 *     loading: boolean;
 *     step: number;
 *   };
 * }} Object containing:
 * - `items`: The array of currently loaded items (placeholders + fetched).
 * - `virtualScrollerOptions`: Config for virtual scroller integration, including lazy loading callback.
 *
 * @example
 * const { items, virtualScrollerOptions } = useLazyLoad({
 *   type: LookupsTypeEnum.Countries,
 *   filter: { region: 'Europe' },
 *   step: 25,
 *   mapItem: (country) => ({ label: country.name, value: country.code }),
 *   getTotalCount: async (type, filter) => { ... },
 *   getItems: async (type, from, to, filter) => { ... }
 * });
 *
 * <VirtualScroller
 *   items={items}
 *   {...virtualScrollerOptions}
 *   itemTemplate={(item) => <span>{item?.label}</span>}
 * />
 */

export function useLazyLoad<L, F, C>(service: UseLazyLoadModel<L, F, C>) {

  const [ items, setItems ] = useState<{ label: string; value: string }[]>([]);
  const [ loading, setLoading ] = useState(false);
  const loadLazyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const step = service.step;

  useEffect(() => {
    service.getTotalCount(service.type, service.filter).then((res) => {
      setItems(Array.from({ length: res }));
    });
  }, [ service ]);

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

        service.getItems(service.type, from, to, service.filter).then((res) => {
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
    [ service ]
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
