import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'contacts' })
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ nullable: false })
  mobile: string;

  @Column({ nullable: true })
  email: string;
}
