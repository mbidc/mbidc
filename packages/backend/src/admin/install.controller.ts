import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DataSource } from "typeorm";

import Rule from "../auth/auth.decorator";
import { Public } from "../auth/auth.rules";
import { User, UserTag } from "../entity";
import { LockService } from "../runtime/lock.service";

import { InstallGuard } from "./install.guard";

@ApiTags("admin")
@Controller("admin/install")
@UseGuards(InstallGuard)
export class InstallController {
  constructor(
    private readonly lockService: LockService,
    private readonly db: DataSource
  ) {
    //
  }
  @Rule(new Public())
  @Get()
  async install() {
    const tag = new UserTag("admin", 0);
    const user = new User();
    user.id = 0;
    user.name = "admin";
    await user.setPassword("admin");
    user.phone = "+8618888888888";
    user.tags = [tag];
    await this.db.manager.save([
      user,
      new UserTag("teacher", 1),
      new UserTag("student", 2),
    ]);
    await this.lockService.releaseFileLock("install");
    return "OK";
  }
}
