import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Course } from "./Course.entity";

@Entity()
export class CourseDetail {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  week: number;
  @Column()
  timeStart: number;
  @Column()
  timeEnd: number;
  @Column()
  location: string;
  @ManyToOne(() => Course)
  course: Course;
}
