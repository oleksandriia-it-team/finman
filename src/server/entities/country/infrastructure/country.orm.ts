import { Column, Entity } from 'typeorm';
import { DefaultTableColumnsOrm } from '../../../shared/infrastructure/default-table-columns.orm';
import { type CountryAndLocale } from '@common/records/countries.record';
import { CountryRequirementsConstant } from '@common/domains/lookups/constants/country-requirements.constant';

@Entity('country')
export class CountryOrm extends DefaultTableColumnsOrm implements CountryAndLocale {
  @Column({ type: 'varchar', length: CountryRequirementsConstant.MaxCountryLength })
  country!: string;

  @Column({ type: 'varchar', length: CountryRequirementsConstant.MaxLocaleLength })
  locale!: string;
}
