'use client'

import { InputText } from 'primereact/inputtext';
import './styles/first-page.scss'

export default function FirstForm (){
  return (
    <div className="flex flex-col gap-2">
      <InputText className="FormInput" type='text' placeholder="Username" />
      <InputText type='select' className="FormInput" placeholder="Preferable Formats" />
      <InputText className="FormInput" placeholder="Languages"/>
    </div>
  );
}