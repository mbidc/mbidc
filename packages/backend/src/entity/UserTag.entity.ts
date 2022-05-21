import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserTag {
  @PrimaryGeneratedColumn()
  id: number;
  @Index({ unique: true })
  @Column()
  name: string;
}
