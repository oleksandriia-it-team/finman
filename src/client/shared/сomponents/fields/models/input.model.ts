export interface InputProps {
  value?: string;
  className?: string;
  onChange?: (value: string) => void;
  placeholder?: string | undefined;
}

export interface DropdownInputProps extends InputProps {
  options?: { label: string; value: string }[];
}
