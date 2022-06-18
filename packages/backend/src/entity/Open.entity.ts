import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { HideProperty } from "../common/common.decorator";

import { Course } from "./Course.entity";

@Entity()
export class Open {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ unique: true }) name!: string;
  @Column() start!: Date;
  @Column() end!: Date;
  @HideProperty()
  @OneToMany(() => Course, (course) => course.open)
  @JoinColumn()
  courses!: Course[];
  @Column() studentTag!: string;
}
