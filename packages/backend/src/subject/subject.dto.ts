import { ApiProperty } from "@nestjs/swagger";

import { PaginationResponse, SuccessResponse } from "../common/common.dto";
import { Subject } from "../entity";

export class CreateSubjectDto {
  subId!: string;
  name!: string;
  description!: string;
  detail!: string;
  type!: string;
  department!: string;
  maxStudents!: number;
  teacherId!: string;
  @ApiProperty({ type: String, format: "file" })
  img?: string;
  @ApiProperty({ type: String, format: "file" })
  document?: string;
}

export class SubjectPaginationResponse extends PaginationResponse<Subject> {
  data!: Subject[];
}

export class SubjectResponse extends SuccessResponse<Subject> {
  data!: Subject;
}
