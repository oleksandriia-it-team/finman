import { DropdownProps } from 'primereact/dropdown';
import { VirtualScrollerProps } from 'primereact/virtualscroller';


export interface ControlledDropdownProps extends DropdownProps {
  name: string;
  virtualScrollerOptions?: VirtualScrollerProps | undefined;
}