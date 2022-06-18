import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { HideProperty } from "../common/common.decorator";

import { User } from "./User.entity";

@Entity()
export class Subject {
  @HideProperty()
  @PrimaryGeneratedColumn()
  id!: string;
  @Column() subId!: string;
  @Column() name!: string;
  @Column() description!: string;
  @Column() detail!: string;
  @Column() type!: string;
  @Column() department!: string;
  @Column() maxStudents!: number;
  @Column({ nullable: true }) img?: string;
  @Column({ nullable: true }) document?: string;
  @ManyToOne(() => User) teacher!: User;
}
