import { Get, NotFoundException } from "@nestjs/common";

import { ReqUser } from "../auth/user.decorator";
import { Controller, JWT } from "../common/common.decorator";
import { User } from "../entity";

import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @JWT()
  @Get()
  async self(@ReqUser() user: User) {
    const u = await this.userService.findOne(user.id);
    if (!u) {
      throw new NotFoundException();
    } else {
      return u;
    }
  }
}
