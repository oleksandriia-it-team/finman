import { LazyEventProps } from '../../../props/lazy-event.props';

export interface LazyLoadProps<T> extends LazyEventProps {
  newOptions: T[];
  showOptions: T[];
  setShowOptions: (showOptions: T[]) => void;
}
