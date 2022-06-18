import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { HideProperty } from "../common/common.decorator";

import { Open } from "./Open.entity";
import { Subject } from "./Subject.entity";
import { User } from "./User.entity";

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Subject)
  @JoinColumn()
  subject!: Subject;

  @HideProperty()
  @ManyToMany(() => User)
  @JoinTable()
  students!: User[];

  @Column({
    default: 0,
  })
  currentStudent!: number;

  @HideProperty()
  @Column({
    type: "json",
  })
  score!: Record<number, number>;

  myScore = -1;

  @HideProperty()
  @ManyToOne(() => Open, (open) => open.courses)
  open!: Open;
}
