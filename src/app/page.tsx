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

  // TODO: remove later, it's an example
  return (
    <div className="flex gap-2">
      <Dropdown<string>
        className="w-24"
        value={''}
        options={options}
        onChange={(value) => console.log(value)}
      />

      <Dropdown<string>
        className="w-24"
        value={''}
        options={options}
        onChange={(value) => console.log(value)}
      />
    </div>
  );
}
