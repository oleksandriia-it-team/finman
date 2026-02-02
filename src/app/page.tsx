'use client';

import Dropdown from '../client/shared/сomponents/fields/dropdown/dropdown';
import { useState } from 'react';
import { addToast } from '../client/shared/hooks/toast/toast.hook';
import { useModalStore } from '../client/shared/hooks/modal/modal.hook';
import ModalTemplate from '../client/shared/сomponents/modal/modal-template';

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
  const options = [
    {
      value: 'first',
      label: 'First test',
    },
    {
      value: 'second',
      label: 'Second test',
    },
  ];

  const [firstDropdownValue, setFirstDropdownValue] = useState('');
  const [secondDropdownValue, setSecondDropdownValue] = useState('');

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
    <div>
      <div className="flex gap-2">
        <Dropdown<string>
          className="w-24"
          value={firstDropdownValue}
          options={options}
          onChange={(value) => setFirstDropdownValue(value)}
        />

        <Dropdown<string>
          className="w-24"
          value={secondDropdownValue}
          options={options}
          onChange={(value) => setSecondDropdownValue(value)}
        />
      </div>
      <div className="mt-4 flex gap-2">
        <button onClick={() => addToast({ message: '1', type: 'success', duration: 5000 })}>Test Toast1</button>
        <button onClick={() => addToast({ message: '2', type: 'success', duration: 10000 })}>Test Toast2</button>
        <button onClick={() => addToast({ message: '3', type: 'success' })}>Test Toast3</button>
      </div>
      <div className="mt-4 flex gap-2">
        <button onClick={() => handleConfirm()}>Open Test Modal</button>
      </div>
    </div>
  );
}
