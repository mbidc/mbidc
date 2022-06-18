import { Module } from "@nestjs/common";

import { UserModule } from "../user/user.module";

import { SubjectAdminController } from "./subject.admin.controller";
import { SubjectController } from "./subject.controller";
import { SubjectService } from "./subject.service";

@Module({
  imports: [UserModule],
  controllers: [SubjectController, SubjectAdminController],
  providers: [SubjectService],
  exports: [SubjectService],
})
export class SubjectModule {}
