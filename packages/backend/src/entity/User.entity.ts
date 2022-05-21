import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";

import { UserTag } from "./UserTag.entity";

@Entity()
export class User {
  @PrimaryColumn()
  id: number;
  @Column()
  name: string;
  @ManyToMany(() => UserTag)
  @JoinTable()
  tags: UserTag[];
  @Column()
  phone: string;
  @Column()
  password: string;
}
