import type { ReactNode } from 'react';
import type { BreadcrumbItem } from '@common/models/bread-crumbs-item.model';

export interface FinPageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  actions?: ReactNode;
}
