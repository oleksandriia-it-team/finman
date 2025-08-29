'use client';

import { ButtonProps } from 'primereact/button';

export interface PageButtonModel extends ButtonProps {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}