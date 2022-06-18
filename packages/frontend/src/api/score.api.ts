import {
  APIPaginationResponse,
  APIResponse,
  fetcher,
  Pagination,
  useFetch,
} from "./fetcher";
import { User } from "./user.api";

export class Score extends User {
  score!: number;
  static useScore(courseId: string, pagination?: Pagination) {
    return useFetch<APIPaginationResponse<Score>>(
      `/course/${courseId}/score?page=${pagination?.page ?? ""}&limit=${
        pagination?.limit ?? ""
      }`,
      APIPaginationResponse,
      {
        authorize: true,
      },
    );
  }
  static async setScore(courseId: string, studentId: number, score: number) {
    return fetcher(APIResponse, { authorize: true })(
      `/course/${courseId}/score/${studentId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ score }),
      },
    );
  }
}
