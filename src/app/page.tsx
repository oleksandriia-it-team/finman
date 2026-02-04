'use client';

import { useState } from 'react';
import { addToast } from '../client/shared/hooks/toast/toast.hook';
import { useModalStore } from '../client/shared/hooks/modal/modal.hook';
import ModalTemplate from '../client/shared/сomponents/modal/modal-template';
import { useDropdownResource } from '../client/shared/hooks/dropdown-resource/dropdown-resource.hook';
import { useQuery } from '@tanstack/react-query';
import { lookupsService } from '../client/api-clients/lookups/lookups.service';
import { LookupsTypeEnum } from '../server/shared/enums/lookups-type.enum';
import Dropdown from '../client/shared/сomponents/fields/dropdown/dropdown';
import { PromiseState } from '../client/shared/enums/promise-state.enum';

export function ConfirmModal({ onClose }: { onClose: (result: boolean | undefined) => void }) {
  const hideModal = useModalStore((state) => state.hideModal);

  const footer = (
    <button
      onClick={() => {
        onClose(true);
        hideModal();
      }}
    >
      Yes
    </button>
  );

  return (
    <ModalTemplate
      header={'Confirm Action'}
      body={'Are you sure?'}
      footer={footer}
      onClose={onClose}
    />
  );
}

export default function MainPage() {
  const [page, setPage] = useState(1);

  const [firstDropdownValue, setFirstDropdownValue] = useState<number | undefined>(undefined);

  const data = useDropdownResource({
    currentValue: firstDropdownValue,
    getTotalCountQuery: useQuery({
      queryKey: ['total count country'],
      queryFn: () => lookupsService.getTotalCount(LookupsTypeEnum.CountriesAndLocales, {}).then((r) => r.data),
    }),
    getLabelFn: (id) => lookupsService.getItem(LookupsTypeEnum.CountriesAndLocales, id).then((r) => r.data?.country),
    getOptionsQuery: useQuery({
      queryKey: ['options country', page],
      queryFn: () =>
        lookupsService
          .getItems(LookupsTypeEnum.CountriesAndLocales, (page - 1) * 20 + 1, page * 20 + 1, {})
          .then((r) => r.data.map((data) => ({ label: data.country, value: data.id }))),
    }),
    labelQueryKey: ['label country', String(firstDropdownValue ?? '')],
  });

  const { openModal } = useModalStore();

  const handleClose = (result: boolean | undefined) => {
    addToast({ message: `You selected: ${result}`, type: 'info', duration: 3000 });
  };

  const modalTemplate = <ConfirmModal onClose={handleClose} />;

  const handleConfirm = () => {
    openModal(modalTemplate, handleClose);
  };

  // TODO: remove later, it's an example
  return (
    <div className="flex gap-2">
      <Dropdown<number>
        lazy={true}
        className="w-24"
        optionListClassName="overflow-auto max-h-96"
        total={data.totalCount}
        isLoading={data.state === PromiseState.Loading}
        pageSize={20}
        page={page}
        itemHeight={32}
        setPage={setPage}
        value={firstDropdownValue}
        customInputValue={data.inputLabel}
        options={data.options}
        onChange={(value) => setFirstDropdownValue(value)}
      />
      <div className="mt-4 flex gap-2">
        <button onClick={() => addToast({ message: '1', type: 'info', duration: 5000 })}>Test Toast1</button>
        <button onClick={() => addToast({ message: '2', type: 'error', duration: 1000000 })}>Test Toast2</button>
        <button onClick={() => addToast({ message: '3', type: 'success' })}>Test Toast3</button>
      </div>
      <div className="mt-4 flex gap-2">
        <button onClick={() => handleConfirm()}>Open Test Modal</button>
      </div>
    </div>
  );
}
