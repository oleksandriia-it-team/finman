import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultTableColumnsOrm } from '../../../database/default-table-columns.orm';
import { type CountryAndLocale } from '@common/records/countries.record';
import { type UserOrm } from '@backend/entities/user/infrastructure/user.orm';
import { CountryRequirementsConstant } from '@common/constants/country-requirements.constant';

@Entity('country')
export class CountryOrm extends DefaultTableColumnsOrm implements CountryAndLocale {
  @Column({ type: 'varchar', length: CountryRequirementsConstant.MaxCountryLength })
  country!: string;

  @Column({ type: 'varchar', length: CountryRequirementsConstant.MaxLocaleLength, unique: true })
  locale!: string;

  @Column({ type: 'varchar', length: 100, nullable: true, default: null })
  adminName: string | null = null;

  @OneToMany('UserOrm', 'country')
  users!: UserOrm[];
}
