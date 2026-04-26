'use client';
import { useQuery } from '@tanstack/react-query';
import { lookupsService } from '@frontend/entities/lookups/lookups.service';
import { LookupsTypeEnum } from '@common/domains/lookups/enums/lookups-type.enum';
import type { Currency } from '@common/records/currencies.record';
import { LookupTable, type LookupColumn } from '@frontend/entities/lookups/lookup-table/lookup-table';

const COLUMNS: LookupColumn<Currency>[] = [
  { key: 'currencyName', label: 'Назва' },
  { key: 'currencyCode', label: 'Код' },
  { key: 'currencySymbol', label: 'Символ' },
  { key: 'createdAt', label: 'Створено' },
  { key: 'updatedAt', label: 'Оновлено' },
];

const PAGE_SIZE = 300;

export default function CurrenciesPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin', 'lookups', 'currencies'],
    queryFn: () => lookupsService.getItems(LookupsTypeEnum.Currency, 1, PAGE_SIZE, {}),
  });

  return (
    <LookupTable<Currency>
      title="Валюти"
      columns={COLUMNS}
      items={data ?? []}
      isLoading={isLoading}
      isError={isError}
    />
  );
}
