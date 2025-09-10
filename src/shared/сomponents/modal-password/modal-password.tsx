'use client';

import './styles/modal-password.scss'
import { userInformationServiceProvider } from '../../../data-access/user-information/user-information.service';
import { modalPasswordPrompts } from '../../models/modal-password-props.model';
import { useState } from 'react';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { useInject } from '../../contexts/use-inject.context';



export default function ModalPassword({ onUnlock }: modalPasswordPrompts) {
  const [ password, setPassword ] = useState('');
  const [ time, setTime ] = useState<number>(0);
  const [ noLimit, setNoLimit ] = useState(false);
  const [ error, setError ] = useState('');
  const [ visible, setVisible ] = useState(true);
  const userInformation = useInject(userInformationServiceProvider, true)
  const savedPass = userInformation.getAllUserInformation()?.password;

  const handleSubmit = () => {
    if (!savedPass) {
      if (!password || password.length < 4) {
        return setError('Password must be at least 4 characters');
      }
      userInformation.setUserInformation({password});
    } else {
      if (password !== savedPass) {
        return setError('Incorrect passcode. Please try later');
      }
    }

    onUnlock(time, noLimit);
  };

  return (
    <Dialog header="Аuthorization" visible={ visible } modal closable={ false } onHide={ () => setVisible(false) }>
      <div className={ 'flex-col items-center flex gap-4 w-full ' }>
        <div className="w-full">
          <label htmlFor="password">{ savedPass ? 'Enter password' : 'Create password' } </label>
          <Password className={ 'w-full' } inputId="password" value={ password } onChange={ (e) => setPassword(e.target.value) } toggleMask feedback={ false }/>
        </div>
        <div className="flex-col w-full">
          <label htmlFor="number-input">Time of inactivity</label>
          <InputNumber id="number-input" value={ time } onValueChange={ (e) => setTime(e.value ?? 0) } useGrouping={ false } min={ 1 } className="w-full"/>
        </div>
        <div className="items-center">
          <label htmlFor="noLimit">Dont need </label>
          <Checkbox className={ 'w-full' } inputId="noLimit" checked={ noLimit } onChange={ (e) => setNoLimit(e.checked!) }/>
        </div>

        { error && <p>{ error }</p> }
        <Button className={'w-full'} label="Submit" onClick={ handleSubmit }/>
      </div>
    </Dialog>
  );
}
