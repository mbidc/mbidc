import * as bcrypt from "bcrypt";
import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";

import { HideProperty } from "../common/common.decorator";

import { UserTag } from "./UserTag.entity";

@Entity()
export class User {
  @PrimaryColumn()
  id: number;
  @Column()
  name: string;
  @ManyToMany(() => UserTag, {
    cascade: true,
  })
  @JoinTable()
  tags: UserTag[];
  @Column()
  phone: string;
  @Column()
  @HideProperty()
  private password: string;
  getPassword() {
    return this.password;
  }
  async setPassword(password: string) {
    this.password = await bcrypt.hash(password, 10);
  }
}
