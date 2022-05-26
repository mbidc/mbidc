import {
  Column,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { HideProperty } from "../common/common.decorator";

import { User } from "./User.entity";

@Entity()
export class UserTag {
  constructor(name: string, id?: number) {
    this.name = name;
    if (id !== undefined) this.id = id;
  }
  @HideProperty()
  @PrimaryGeneratedColumn()
  id: number;
  @Index({ unique: true })
  @Column()
  name: string;
  @HideProperty()
  @ManyToMany(() => User, (user) => user.tags)
  users: User[];
}
