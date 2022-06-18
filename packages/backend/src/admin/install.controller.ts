import { Get, UseGuards } from "@nestjs/common";
import { DataSource } from "typeorm";

import { Controller, Public } from "../common/common.decorator";
import { User } from "../entity";
import { LockService } from "../runtime/lock.service";

import { InstallGuard } from "./install.guard";

@Controller("install")
@UseGuards(InstallGuard)
export class InstallController {
  constructor(
    private readonly lockService: LockService,
    private readonly db: DataSource
  ) {
    //
  }
  @Get()
  @Public()
  async install() {
    const user = new User();
    user.id = "0";
    user.name = "admin";
    await user.setPassword("admin");
    user.phone = "+8618888888888";
    user.email = "admin@ecnu.edu.cn";
    user.department = "管理员";
    user.tags = "admin";
    await this.db.manager.save([user]);
    await this.lockService.releaseFileLock("install");
    return "OK";
  }
}
