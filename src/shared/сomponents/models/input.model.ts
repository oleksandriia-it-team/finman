import { InputTextProps } from 'primereact/inputtext';


export interface InputProps extends InputTextProps {
  className?: string;
  placeholder?: string | undefined;
}

export interface DropdownInputProps extends InputProps {
  options: { label: string; value: string }[];
}
