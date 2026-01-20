import { ControlledInputProps } from '../models/controlled-input.model';

// TODO update later
export default function ControlledInput({ name, placeholder, className }: ControlledInputProps) {
  // const { control } = useFormContext();

  // return (
  //   <Controller
  //     name={ name }
  //     control={ control }
  //     render={ ({ field, fieldState }) => (
  //       <div className="flex flex-col items-center justify-center">
  //         <InputComponent
  //           className={ `input-component ${ className || '' } ${ fieldState.invalid ? 'p-invalid' : '' }` }
  //           placeholder={ placeholder }
  //           value={ field.value ?? '' }
  //           onChange={ field.onChange }
  //         />
  //         { fieldState.error && (
  //           <p className="error-text">{ fieldState.error.message }</p>
  //         ) }
  //       </div>
  //     ) }
  //   />
  // );
}