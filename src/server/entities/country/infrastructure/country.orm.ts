import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultTableColumnsOrm } from '../../../database/default-table-columns.orm';
import { type CountryAndLocale } from '@common/records/countries.record';
import { UserOrm } from '@backend/entities/user/infrastructure/user.orm';
import { CountryRequirementsConstant } from '@common/constants/country-requirements.constant';

@Entity('country')
export class CountryOrm extends DefaultTableColumnsOrm implements CountryAndLocale {
  @Column({ type: 'varchar', length: CountryRequirementsConstant.MaxCountryLength })
  country!: string;

  @Column({ type: 'varchar', length: CountryRequirementsConstant.MaxLocaleLength, unique: true })
  locale!: string;

  @OneToMany(() => UserOrm, (user) => user.country)
  users!: UserOrm[];
}
