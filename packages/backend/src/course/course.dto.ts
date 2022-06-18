import { Type } from "class-transformer";

import { PaginationResponse, SuccessResponse } from "../common/common.dto";
import { Course, User } from "../entity";

export class CourseResponse extends SuccessResponse<Course> {
  @Type(() => Course)
  data!: Course;
}

export class CoursesResponse extends SuccessResponse<Course[]> {
  @Type(() => Course)
  data!: Course[];
}

export class MyCourseResponse extends SuccessResponse<{
  teach: Course[];
  student: Course[];
}> {
  data!: { teach: Course[]; student: Course[] };
}

export class ScorePaginationResponse extends PaginationResponse<
  Omit<User, "setPassword"> & { score: number }
> {
  data!: (Omit<User, "setPassword"> & { score: number })[];
}
