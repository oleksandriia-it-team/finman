import { DropdownChangeEvent } from 'primereact/dropdown';

export interface InputProps {
  value?: string;
  className?: string;
  onChange?: (e: DropdownChangeEvent) => void;
  placeholder?: string | undefined;

}

export interface DropdownInputProps extends InputProps {
  options: { label: string; value: string }[];
}
