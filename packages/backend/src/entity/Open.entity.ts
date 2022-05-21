import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { Course } from "./Course.entity";
import { User } from "./User.entity";

@Entity()
export class Open {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  start: Date;
  @Column()
  end: Date;
  @ManyToMany(() => Course)
  courses: Course[];
  @ManyToMany(() => User)
  users: User[];
}
