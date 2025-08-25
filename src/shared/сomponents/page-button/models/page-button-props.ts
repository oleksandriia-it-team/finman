'use client';

import { ButtonProps } from 'primereact/button';

export interface PageButtonProps extends ButtonProps {
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}