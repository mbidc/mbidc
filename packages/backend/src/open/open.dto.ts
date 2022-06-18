import { ApiProperty } from "@nestjs/swagger";

import { PaginationResponse, SuccessResponse } from "../common/common.dto";
import { Course, Open } from "../entity";

export class CreateOpenDto {
  name!: string;
  start!: Date;
  end!: Date;
  studentTag!: string;
}

export class OpensResponse extends SuccessResponse<Open[]> {
  @ApiProperty({ type: () => [Open] })
  data!: Open[];
}

export class OpenResponse extends SuccessResponse<Open> {
  @ApiProperty({ type: () => Open })
  data!: Open;
}

export class CoursePaginationResponse extends PaginationResponse<Course> {
  @ApiProperty({ type: () => [Course] })
  data!: Course[];
}

export class CourseResponse extends SuccessResponse<Course> {
  @ApiProperty({ type: () => Course })
  data!: Course;
}
