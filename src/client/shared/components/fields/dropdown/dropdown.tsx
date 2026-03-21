import { DefaultDropdownInputProps, LazyDropdownInputProps } from '../props/input.props';
import LazyDropdown from './lazy-dropdown';
import DefaultDropdown from './default-dropdown';

type Props<T> = ({ lazy: true } & LazyDropdownInputProps<T>) | ({ lazy?: false } & DefaultDropdownInputProps<T>);

export default function Dropdown<T>(props: Props<T>) {
  if (props.lazy) {
    return <LazyDropdown {...props} />;
  }
  return <DefaultDropdown {...props} />;
}
