import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { DefaultTableColumnsOrm } from '@backend/database/default-table-columns.orm';
import { type FullUserData } from '@common/records/user.record';
import { RoleEnum } from '@common/domains/user/enums/role.enum';
import { type RegularEntryOrm } from '@backend/entities/regular-entry/infrastructure/regular-entry.orm';
import { CountryOrm } from '@backend/entities/country/infrastructure/country.orm';
import { CurrencyOrm } from '@backend/entities/currency/infrastructure/currency.orm';
import { UserRequirements } from '@common/constants/user-requirements.constant';
import { CurrencyRequirements } from '@common/constants/currency-requirements.constant';
import { CountryRequirementsConstant } from '@common/constants/country-requirements.constant';
import { SupportLanguages } from '@common/enums/support-languages.enum';
import type { TrackingOperationOrm } from '@backend/entities/tracking-operation/infrastructure/tracking-operation.orm';
import { BudgetPlanOrm } from '@backend/entities/budget-plan/infrastructure/budget-plan.orm';

@Entity('users')
export class UserOrm extends DefaultTableColumnsOrm implements FullUserData {
  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.User })
  role!: RoleEnum;

  @Column({ type: 'varchar', length: UserRequirements.MaxEmailLength, unique: true })
  email!: string;

  @Column({ type: 'varchar', length: UserRequirements.MaxLoginLength, unique: true })
  name!: string;

  @Column({ type: 'varchar', length: UserRequirements.MaxPasswordLength, select: false })
  password!: string;

  @ManyToOne(() => CurrencyOrm, (currency) => currency.users)
  @JoinColumn({
    name: 'currencyCode',
    referencedColumnName: 'currencyCode',
  })
  currency!: CurrencyOrm;

  @Column({ type: 'varchar', length: CurrencyRequirements.MaxCurrencyCodeLength })
  currencyCode!: string;

  @ManyToOne(() => CountryOrm, (country) => country.users)
  @JoinColumn({
    name: 'locale',
    referencedColumnName: 'locale',
  })
  country!: CountryOrm;

  @Column({ type: 'varchar', length: CountryRequirementsConstant.MaxLocaleLength })
  locale!: string;

  @Column({ type: 'enum', enum: Object.values(SupportLanguages), default: SupportLanguages.Ukrainian })
  language!: SupportLanguages;

  @OneToMany('RegularEntryOrm', 'user')
  regularEntries!: RegularEntryOrm[];

  @OneToMany('TrackingOperationOrm', 'user')
  trackingOperations?: TrackingOperationOrm[];

  @OneToMany(() => BudgetPlanOrm, (budgetPlan) => budgetPlan.user)
  budgetPlans?: BudgetPlanOrm[];

  online = true as const;
}
