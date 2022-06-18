import { Body, Delete, Param, Post } from "@nestjs/common";

import { Controller } from "../common/common.decorator";

import { CreateSubjectDto, SubjectResponse } from "./subject.dto";
import { SubjectService } from "./subject.service";

@Controller("subject", true)
export class SubjectAdminController {
  constructor(private readonly subjectService: SubjectService) {}
  @Post("")
  public async create(@Body() create: CreateSubjectDto) {
    return new SubjectResponse(await this.subjectService.create(create));
  }
  @Delete(":subId")
  public async delete(@Param("subId") subId: string) {
    return this.subjectService.delete(subId);
  }
}
