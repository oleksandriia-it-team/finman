import type { BreadcrumbItem } from '@common/models/bread-crumbs-item.model';
import type { ReactNode } from 'react';

export interface ErrorLogPageLayoutProps {
  breadcrumbs: BreadcrumbItem[];
  actions?: ReactNode;
  children: ReactNode;
}
