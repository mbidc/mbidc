import { ApiProperty } from "@nestjs/swagger";
import * as bcrypt from "bcrypt";
import { Column, Entity, PrimaryColumn } from "typeorm";

import { HideProperty } from "../common/common.decorator";

@Entity()
export class User {
  @PrimaryColumn()
  id!: string;

  @ApiProperty({
    format: "file",
  })
  @Column({
    nullable: true,
  })
  avatar?: string;

  @Column() name!: string;
  @Column() tags!: string;
  @Column() phone!: string;
  @Column() email!: string;
  @Column() department!: string;

  @Column()
  @HideProperty()
  password!: string;
  async setPassword(password: string) {
    this.password = await bcrypt.hash(password, 10);
  }
}
