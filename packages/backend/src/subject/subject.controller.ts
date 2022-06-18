import { Get, Param, Query } from "@nestjs/common";

import { Controller } from "../common/common.decorator";
import { Pagination } from "../common/common.dto";

import { SubjectPaginationResponse, SubjectResponse } from "./subject.dto";
import { SubjectService } from "./subject.service";

@Controller("subject")
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}
  @Get(":subId")
  public async find(@Param("subId") subId: string) {
    return new SubjectResponse(await this.subjectService.find(subId));
  }
  @Get("all")
  public async findAll(@Query() query: Pagination) {
    const { count, data } = await this.subjectService.findAll(query);
    return new SubjectPaginationResponse(count, data);
  }
}
