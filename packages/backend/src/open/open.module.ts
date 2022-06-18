import { Module } from "@nestjs/common";

import { SubjectModule } from "../subject/subject.module";

import { OpenAdminController } from "./open.admin.controller";
import { OpenController } from "./open.controller";
import { OpenService } from "./open.service";

@Module({
  imports: [SubjectModule],
  controllers: [OpenController, OpenAdminController],
  providers: [OpenService],
})
export class OpenModule {}
