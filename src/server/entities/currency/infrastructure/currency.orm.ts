import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultTableColumnsOrm } from '../../../database/default-table-columns.orm';
import { type Currency } from '@common/records/currencies.record';
import { type UserOrm } from '@backend/entities/user/infrastructure/user.orm';
import { CurrencyRequirements } from '@common/constants/currency-requirements.constant';

@Entity('currency')
export class CurrencyOrm extends DefaultTableColumnsOrm implements Currency {
  @Column({ type: 'varchar', length: CurrencyRequirements.MaxCurrencyNameLength })
  currencyName!: string;

  @Column({ type: 'varchar', length: CurrencyRequirements.MaxCurrencyCodeLength, unique: true })
  currencyCode!: string;

  @Column({ type: 'varchar', length: CurrencyRequirements.MaxCurrencySymbolLength })
  currencySymbol!: string;

  @Column({ type: 'varchar', length: 100, nullable: true, default: null })
  adminName: string | null = null;

  @OneToMany('UserOrm', 'currency')
  users!: UserOrm[];
}
