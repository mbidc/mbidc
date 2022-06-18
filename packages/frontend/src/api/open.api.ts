import { Type } from "class-transformer";

import { Course } from "./course.api";
import {
  APIPaginationResponse,
  APIResponse,
  fetcher,
  Pagination,
  useFetch,
} from "./fetcher";

class OpensResponse extends APIResponse<Open[]> {
  @Type(() => Open)
  data!: Open[];
}

class OpenResponse extends APIResponse<Open> {
  @Type(() => Open)
  data!: Open;
}

export class Open {
  id!: number;
  name!: string;
  @Type(() => Date)
  start!: Date;
  @Type(() => Date)
  end!: Date;
  studentTag!: string;
  addSubject(subId: string) {
    return fetcher(APIResponse, { authorize: true })(
      `/admin/open/${this.id}/add/${subId}`,
    );
  }
  selectCourse(courseId: number) {
    return fetcher<APIResponse<Course>>(APIResponse, { authorize: true })(
      `/open/${this.id}/select/${courseId}`,
      {
        method: "POST",
      },
    );
  }

  public static useMyOpen() {
    return useFetch("/open", OpensResponse, {
      authorize: true,
    });
  }
  public static useOpen(id: string) {
    return useFetch(`/open/${id}`, OpenResponse, {
      authorize: true,
    });
  }
  public static create(create: any) {
    return fetcher(APIResponse, { authorize: true })("/admin/open", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(create),
    });
  }
  public static useCourses(id: string, pagination?: Pagination) {
    return useFetch<APIPaginationResponse<Course>>(
      `/open/${id}/courses?page=${pagination?.page ?? ""}&limit=${
        pagination?.limit ?? ""
      }`,
      APIPaginationResponse,
      {
        authorize: true,
      },
    );
  }
}
