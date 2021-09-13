import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  DeleteDateColumn,
} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  street: string;

  @Column({ nullable: true })
  street_number: string;

  @Column()
  city: string;

  @Column({ nullable: true })
  state: string;

  @Column()
  country: string;

  @Column('simple-array', { nullable: true })
  phones: string[];

  @Column({ nullable: true })
  photo: string;

  @DeleteDateColumn()
  deletedAt?: Date;
}
