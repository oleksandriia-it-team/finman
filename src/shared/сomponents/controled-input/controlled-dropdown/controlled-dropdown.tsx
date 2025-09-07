import { Controller, useFormContext } from 'react-hook-form';
import { ControlledDropdownProps } from '../../models/controlled-dropdown.model';
import { Dropdown, DropdownChangeEvent } from 'primereact/dropdown';


export default function ControlledDropdown({
                                             name,
                                             options,
                                             className,
                                             virtualScrollerOptions,
                                             placeholder,
                                             onChange,
                                             filter,
                                             filterTemplate,
                                           }: ControlledDropdownProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={ name }
      control={ control }
      render={ ({ field, fieldState }) => (
        <div className="flex flex-col items-center justify-center">
          <Dropdown
            className={ `drop-down-component ${ className || '' } ${ fieldState.invalid ? 'p-invalid' : '' }` }
            placeholder={ placeholder }
            value={ field.value ?? null }
            options={ options }
            onChange={ onChange ?? ((e: DropdownChangeEvent) => field.onChange(e.value)) }
            virtualScrollerOptions={ virtualScrollerOptions }
            filter={ filter ?? false }
            filterTemplate={ filterTemplate ?? false }
                />
          { fieldState.error && (
            <p className="error-text">{ fieldState.error.message }</p>
                ) }
        </div>
          ) }
      />
  );
}