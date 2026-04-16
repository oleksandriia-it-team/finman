import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultTableColumnsOrm } from '../../../shared/infrastructure/default-table-columns.orm';
import { type Currency } from '@common/records/currencies.record';
import { CurrencyRequirements } from '@common/domains/lookups/constants/currency-requirements.constant';
import { UserOrm } from '@backend/entities/user/infrastructure/user.orm';

@Entity('currency')
export class CurrencyOrm extends DefaultTableColumnsOrm implements Currency {
  @Column({ type: 'varchar', length: CurrencyRequirements.MaxCurrencyNameLength })
  currencyName!: string;

  @Column({ type: 'varchar', length: CurrencyRequirements.MaxCurrencyCodeLength })
  currencyCode!: string;

  @Column({ type: 'varchar', length: CurrencyRequirements.MaxCurrencySymbolLength })
  currencySymbol!: string;

  @OneToMany(() => UserOrm, (user) => user.currency)
  users!: UserOrm[];
}
