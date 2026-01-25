'use client';

import Dropdown from '../client/shared/сomponents/fields/dropdown/dropdown';
import { useState } from 'react';
import { addToast } from '../client/shared/hooks/toast/toast.hook';

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
    </div>
  );
}
