import { type DefaultDropdownInputProps, type LazyDropdownInputProps } from '../props/input.props';
import { FinLazyDropdown } from './fin-lazy-dropdown';
import { FinDefaultDropdown } from './fin-default-dropdown';

type Props<T> = ({ lazy: true } & LazyDropdownInputProps<T>) | ({ lazy?: false } & DefaultDropdownInputProps<T>);

export function FinDropdown<T>(props: Props<T>) {
  if (props.lazy) {
    return <FinLazyDropdown {...props} />;
  }
  return <FinDefaultDropdown {...props} />;
}
