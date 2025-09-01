'use client';

import '../styles/first-page.scss';
import ControlledInput from '../../../../shared/сomponents/controled-input/controlled-input/controled-input-component';
import ControlledDropdown from '../../../../shared/сomponents/controled-input/controlled-dropdown/controlled-dropdown';
import { useInject } from '../../../../shared/contexts/use-inject.context';
import { lookupsProvider } from '../../../../data-access/lookups/lookups.service';
import { useEffect, useRef, useState } from 'react';
import { LookupsTypeEnum } from '../../../api/lookups/shared/enums/lookups-type.enum';
import { CountryAndLocale } from '../../../api/lookups/countries-and-locales/shared/models/countries-and-locales.model';

export default function RegistrationFormComponent() {

  const languages = [
    { label: 'English', value: 'English' },
    { label: 'Spanish', value: 'Spanish' },
    { label: 'Ukrainian', value: 'Ukrainian' },
  ];

  const service = useInject(lookupsProvider, true);
  const [ items, setItems ] = useState<{ label: string; value: string; }[]>([]);

  useEffect(() => {
    service.getTotalCount(0, {}).then(myItems => {
      setItems(Array.from({ length: myItems.data }));
    });
  }, [ service ]);

  const [ loading, setLoading ] = useState(false);
  const loadLazyTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onLazyLoad = (event: { first: number, last: number }) => {
    setLoading(true);
    if (loadLazyTimeout.current) {
      clearTimeout(loadLazyTimeout.current);
    }
    loadLazyTimeout.current = setTimeout(() => {
      const { first, last } = event;
      const from = first + 1;
      const to = last + 1;

      service.getItems(LookupsTypeEnum.CountriesAndLocales, from, to, {}).then((response) => {
        setItems(prevItems => {
          const _items = [ ...prevItems ];
          response.data.forEach((item: CountryAndLocale, index: number) => {
            _items[first + index] = {
              label: item.country,
              value: item.locale,
            };
          });
          return _items;
        });
        setLoading(false);
      });

      loadLazyTimeout.current = null;
    }, 250);
  };


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
        virtualScrollerOptions={ {
          lazy: true,
          onLazyLoad: onLazyLoad,
          itemSize: 38,
          showLoader: true,
          loading: loading,
          delay: 250
        } }
      />
      <ControlledDropdown
        className="w-full form-input"
        name="language"
        placeholder="Languages"
        options={ languages }/>
    </form>
  );
}