'use client';

import Dropdown from '../client/shared/сomponents/fields/dropdown/dropdown';

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

  return (
    <div className="w-24">
      <Dropdown<string>
        value={''}
        options={options}
        onChange={(value) => console.log(value)}
      />
    </div>
  );
}
