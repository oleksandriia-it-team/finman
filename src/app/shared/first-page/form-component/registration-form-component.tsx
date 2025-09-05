'use client';

import '../styles/first-page.scss';
import ControlledInput from '../../../../shared/сomponents/controled-input/controlled-input/controled-input-component';
import ControlledDropdown from '../../../../shared/сomponents/controled-input/controlled-dropdown/controlled-dropdown';
import { useLazyLoad } from '../../../../shared/сomponents/models/use-lazy-load';
import { LookupsTypeEnum } from '../../../api/lookups/shared/enums/lookups-type.enum';
import { CountryAndLocale } from '../../../api/lookups/countries-and-locales/shared/models/countries-and-locales.model';
import { useInject } from '../../../../shared/contexts/use-inject.context';
import { lookupsProvider } from '../../../../data-access/lookups/lookups.service';
import { UseLazyLoadModel } from '../../../../shared/сomponents/models/use-lazy-load.model';
import {
  CountriesAndLocalesFilter
} from '../../../api/lookups/countries-and-locales/shared/filters/countries-and-locales.filter';
import { useMemo } from 'react';

export default function RegistrationFormComponent() {

  const languages = [
    { label: 'English', value: 'English' },
    { label: 'Spanish', value: 'Spanish' },
    { label: 'Ukrainian', value: 'Ukrainian' },
  ];
  const filter = useMemo(() => ({}), []);
  const step: number = 25;
  const service = useInject(lookupsProvider, true);
  const params = useMemo<UseLazyLoadModel<LookupsTypeEnum.CountriesAndLocales, CountriesAndLocalesFilter, CountryAndLocale>>(() => ({
    type: LookupsTypeEnum.CountriesAndLocales,
    filter,
    getTotalCount: (type, filter) => service.getTotalCount(type, filter).then(result => result.data),
    getItems: (type, from, to, filter) => service.getItems(type, from, to, filter).then(result => result.data),
    mapItem: (item) => ({ label: item.country, value: item.locale }),
    step
  }), [ service, step ]);
  const { items, virtualScrollerOptions } = useLazyLoad(params);


  return (
    <form className="flex flex-col justify-center ">
      <div className=" text-center">
        <p className="form-text">Please enter your general information</p>
      </div>
      <ControlledInput
        className="w-full form-input"
        name="userName"
        placeholder="Username"/>
      <ControlledDropdown
        className="w-full form-input"
        name="preferableLocale"
        placeholder="Preferable Formats"
        options={ items }
        virtualScrollerOptions={ virtualScrollerOptions }
      />
      <ControlledDropdown
        className="w-full form-input"
        name="language"
        placeholder="Languages"
        options={ languages }/>
    </form>
  );
}