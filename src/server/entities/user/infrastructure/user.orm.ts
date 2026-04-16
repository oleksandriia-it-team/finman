import { Column, Entity, JoinColumn, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { DefaultTableColumnsOrm } from '../../../shared/infrastructure/default-table-columns.orm';
import { type FullUserData } from '@common/records/user.record';
import { UserRequirements } from '@common/domains/user/constants/user-requirements.constant';
import { RoleEnum } from '@common/domains/user/enums/role.enum';
import { type RegularEntryOrm } from '@backend/entities/regular-entry/infrastructure/regular-entry.orm';
import { CountryOrm } from '@backend/entities/country/infrastructure/country.orm';
import { CurrencyOrm } from '@backend/entities/currency/infrastructure/currency.orm';

@Entity('user')
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
    name: 'currency_code',
    referencedColumnName: 'code',
  })
  currency!: CurrencyOrm;

  @RelationId((user: UserOrm) => user.currency)
  currencyCode!: string;

  @ManyToOne(() => CountryOrm, (country) => country.users)
  @JoinColumn({
    name: 'locale',
    referencedColumnName: 'locale',
  })
  country!: CountryOrm;

  @RelationId((user: UserOrm) => user.country)
  locale!: string;

  @OneToMany('RegularEntryOrm', 'user')
  regularEntries!: RegularEntryOrm[];
}
