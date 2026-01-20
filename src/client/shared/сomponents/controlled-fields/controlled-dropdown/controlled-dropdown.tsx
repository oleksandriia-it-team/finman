import { ControlledDropdownProps } from '../models/controlled-dropdown.model';

// TODO update later
export default function ControlledDropdown({ name, placeholder, options, className }: ControlledDropdownProps) {
  // const { control } = useFormContext();
  // return (
  //   <Controller
  //     name={ name }
  //     control={ control }
  //     render={ ({ field, fieldState }) => (
  //       <div className="flex flex-col items-center justify-center">
  //         <Dropdown
  //           className={ `drop-down-component ${ className || '' } ${ fieldState.invalid ? 'p-invalid' : '' }` }
  //           placeholder={ placeholder }
  //           value={ field.value ?? null }
  //           options={ options }
  //           onChange={ (e: DropdownChangeEvent) => field.onChange(e.value) }
  //         />
  //         { fieldState.error && (
  //           <p className="error-text">{ fieldState.error.message }</p>
  //         ) }
  //       </div>
  //     ) }
  //   />
  // );
}
