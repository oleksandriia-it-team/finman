'use client';

import { Button, ButtonProps } from 'primereact/button';
import './styles/page-button.scss';

interface PageButtonProps extends ButtonProps {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

//Button for stepper component

export default function PageButton({ className, ...props }: PageButtonProps) {
  return (
    <div className="flex justify-center items-center">
      <Button className={ `PageButton ${ className || '' }` }
        severity="help"
        icon="pi pi-angle-right"
        size={ 'large' }
        rounded
        text
        aria-label="Next page"
        { ...props }
      />
    </div>
  );
}