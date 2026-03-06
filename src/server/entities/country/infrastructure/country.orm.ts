import { Column, Entity } from 'typeorm';
import { DefaultTableColumnsOrm } from '../../../shared/infrastructure/default-table-columns.orm';
import { CountryAndLocale } from '../../../../common/records/countries.record';
import { CountryRequirements } from '../../../../common/domains/admin/constants/country-requirements';

@Entity('country')
export class CountryOrm extends DefaultTableColumnsOrm implements CountryAndLocale {
  @Column({ type: 'varchar', length: CountryRequirements.MaxCountryLength })
  country!: string;

  @Column({ type: 'varchar', length: CountryRequirements.MaxLocaleLength })
  locale!: string;
}
