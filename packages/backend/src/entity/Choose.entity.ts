import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Course } from "./Course.entity";
import { User } from "./User.entity";

@Entity()
export class Choose {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Course)
  course: Course;
  @ManyToOne(() => User)
  user: User;
  @Column()
  score: number;
  @Column()
  confirm: boolean;
}
