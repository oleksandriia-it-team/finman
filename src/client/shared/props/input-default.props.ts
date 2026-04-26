export interface InputDefaultProps {
  value?: string | undefined | null;
  placeholder?: string | undefined;
  disabled?: boolean;
  id?: string | undefined;
  className?: string | undefined;
  onBlur?: (event: Event) => void;
}
