import { Controller, Get } from "@nestjs/common";
import { DataSource } from "typeorm";

import { UserTag } from "../entity/UserTag.entity";

@Controller("auth")
export class AuthController {
  constructor(private readonly dataSource: DataSource) {}
  @Get("/login")
  async login() {
    const tags = await this.dataSource.getRepository(UserTag).find();
    return tags;
  }
}
