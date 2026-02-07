import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { DefaultTableColumns } from '../../../common/models/default-table-columns.model';

export abstract class DefaultTableColumnsOrm implements DefaultTableColumns {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ enum: [0, 1] })
  softDeleted!: 0 | 1;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
