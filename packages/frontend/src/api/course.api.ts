import { APIResponse, useFetch } from "./fetcher";
import { Subject } from "./subject.api";
import { User } from "./user.api";

export class Course {
  id!: number;
  subject!: Subject;
  currentStudent!: number;
  myScore!: number;
  students!: User[];
  static useMy() {
    return useFetch<
      APIResponse<{
        teach: Course[];
        student: Course[];
      }>
    >("/course", APIResponse, {
      authorize: true,
    });
  }
}
