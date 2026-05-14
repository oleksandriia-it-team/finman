import type { ReactNode } from 'react';
import type { BreadcrumbItem } from '@common/models/bread-crumbs-item.model';

export interface ErrorLogPageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  actions?: ReactNode;
}
