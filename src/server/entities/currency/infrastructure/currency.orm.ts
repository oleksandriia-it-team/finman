import { Column, Entity } from 'typeorm';
import { DefaultTableColumnsOrm } from '../../../shared/infrastructure/default-table-columns.orm';
import { Currency } from '../../../../common/records/currencies.record';
import { CurrencyRequirements } from '../../../../common/domains/admin/constants/currency-requirements.constant';

@Entity('currency')
export class CurrencyOrm extends DefaultTableColumnsOrm implements Currency {
  @Column({ type: 'varchar', length: CurrencyRequirements.MaxCurrencyNameLength })
  currencyName!: string;

  @Column({ type: 'varchar', length: CurrencyRequirements.MaxCurrencyCodeLength })
  currencyCode!: string;

  @Column({ type: 'varchar', length: CurrencyRequirements.MaxCurrencySymbolLength })
  currencySymbol!: string;
}
