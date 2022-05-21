import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  type: string;
}
