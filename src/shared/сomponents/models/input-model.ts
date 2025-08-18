export interface InputProps {
  value: string;
  className?: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export interface DropdownInputProps extends InputProps {
  options: { label: string; value: string }[];
}
