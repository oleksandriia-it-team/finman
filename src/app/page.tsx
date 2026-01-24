'use client';

import Dropdown from '../client/shared/сomponents/fields/dropdown/dropdown';
import { useState } from 'react';

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
  );
}
