import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { CourseDetail } from "./CourseDetail.entity";
import { Subject } from "./Subject.entity";

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => Subject)
  @JoinColumn()
  subject: Subject;
  @OneToMany(() => CourseDetail, (detail) => detail.course)
  details: CourseDetail[];
}
