import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'api_keys',
})
export class KeyEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  title: string;

  @Column({
    unique: true,
  })
  key: string;

  @CreateDateColumn()
  createdAt: Date;
}
