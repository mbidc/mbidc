import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Course } from "./Course.entity";
import { Open } from "./Open.entity";
import { User } from "./User.entity";

@Entity()
export class Select {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Open)
  open: Open;
  @ManyToOne(() => User)
  user: User;
  @ManyToOne(() => Course)
  course: Course;
}
