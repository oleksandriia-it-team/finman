'use client';
import { useQuery } from '@tanstack/react-query';
import { lookupsService } from '@frontend/entities/lookups/lookups.service';
import { LookupsTypeEnum } from '@common/domains/lookups/enums/lookups-type.enum';
import type { CountryAndLocale } from '@common/records/countries.record';
import { LookupTable, type LookupColumn } from '@frontend/entities/lookups/lookup-table/lookup-table';

const COLUMNS: LookupColumn<CountryAndLocale>[] = [
  { key: 'country', label: 'Країна' },
  { key: 'locale', label: 'Локаль' },
  { key: 'createdAt', label: 'Створено' },
  { key: 'updatedAt', label: 'Оновлено' },
];

const PAGE_SIZE = 100;

export default function CountriesPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['admin', 'lookups', 'countries'],
    queryFn: () => lookupsService.getItems(LookupsTypeEnum.CountriesAndLocales, 1, PAGE_SIZE, {}),
  });

  return (
    <LookupTable<CountryAndLocale>
      title="Країни та локалі"
      columns={COLUMNS}
      items={data ?? []}
      isLoading={isLoading}
      isError={isError}
    />
  );
}
