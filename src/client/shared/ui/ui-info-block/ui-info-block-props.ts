import type { SizeVariantModel } from '@frontend/shared/models/size-variant.model';
import type { AllCategories } from '@common/enums/categories.enum';

export interface UiInfoBlockProps {
  icon: string;
  title: string;
  description?: string | null;
  className?: string;
  iconClassName?: string;
  bgClassName?: string;
  onClick?: () => void;
  size?: SizeVariantModel;
  category?: AllCategories;
  isIconRoundedFull?: boolean;
}
