'use client';

import { Button } from 'primereact/button';
import './styles/page-button.scss';
import { PageButtonProps } from './models/page-button-props';


/**
 * PageButton component.
 *
 * A styled button for navigating pages, using PrimeReact's Button under the hood.
 * It is wrapped in a div to center it horizontally and vertically.
 *
 * @param {PageButtonProps} props - Props for the PageButton component.
 * @param {string} [props.className] - Additional CSS class for custom styling.
 * @param {'button' | 'submit' | 'reset'} [props.type] - The button type.
 * @param {...PageButtonProps} [props] - All other PrimeReact Button props are supported.
 *
 * @example
 * <PageButton onClick={handleNextPage} type="button" className="my-custom-class" />
 */

export default function PageButton({ className, ...props }: PageButtonProps) {
  return (
    <div className="flex justify-center items-center">
      <Button className={ `page-button ${ className || '' }` }
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