'use client';

import DefaultDropdown from '../client/shared/сomponents/fields/dropdown/default-dropdown';
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
      <DefaultDropdown<string>
        className="w-24"
        value={firstDropdownValue}
        options={options}
        onChange={(value) => setFirstDropdownValue(value)}
      />

      <DefaultDropdown<string>
        className="w-24"
        value={secondDropdownValue}
        options={options}
        onChange={(value) => setSecondDropdownValue(value)}
      />
    </div>
  );
}
