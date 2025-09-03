import { useCallback, useEffect, useRef, useState } from 'react';
import { LookupsTypeEnum } from '../../../app/api/lookups/shared/enums/lookups-type.enum';
import { LookupsService } from '../../../data-access/lookups/lookups.service';
import { DatabaseResultOperationSuccess } from '../../models/database-result-operation.model';
import { LookupsFilters } from '../../../app/api/lookups/shared/models/lookups-filters';
import { LookupsDto } from '../../../app/api/lookups/shared/models/lookups-dto';


type LazyMapper<T> = (item: T) => { label: string; value: string };

export function useLazyLoad<T extends LookupsTypeEnum>(
  service: LookupsService,
  type: T,
  filter: Partial<LookupsFilters[T]>,
  mapItem: LazyMapper<LookupsDto[T]>,
  step: number
) {
  const [ items, setItems ] = useState<{ label: string; value: string }[]>([]);
  const [ loading, setLoading ] = useState(false);
  const loadLazyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    service.getTotalCount(type, filter).then((res: DatabaseResultOperationSuccess<number>) => {
      setItems(Array.from({ length: res.data }));
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

        service.getItems(type, from, to, filter).then((res) => {
          const newItems = res.data.map(mapItem);

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
    [ service, type, mapItem ]
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
