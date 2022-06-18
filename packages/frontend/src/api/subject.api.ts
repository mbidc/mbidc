import {
  APIPaginationResponse,
  APIResponse,
  fetcher,
  Pagination,
  useFetch,
} from "./fetcher";
import { upload } from "./upload";
import { User } from "./user.api";

export class Subject {
  subId!: string;
  name!: string;
  type!: string;
  department!: string;
  img?: string;
  detail!: string;
  description!: string;
  document?: string;
  maxStudents!: number;
  teacher!: User;
  static useSubject(id: string) {
    return useFetch<APIResponse<Subject>>(`/subject/${id}`, APIResponse, {
      authorize: true,
    });
  }
  static getAll(pagination?: Pagination) {
    return useFetch<APIPaginationResponse<Subject>>(
      `/subject/all?page=${pagination?.page ?? ""}&limit=${
        pagination?.limit ?? ""
      }`,
      APIPaginationResponse,
      {
        authorize: true,
      },
    );
  }
  static async create(create: any) {
    const payload: any = create;
    if (create.img) {
      payload.img = await upload(create.img[0]);
    }
    if (create.document) {
      payload.document = await upload(create.document[0]);
    }
    return fetcher(APIResponse, { authorize: true })("/admin/subject", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  }
}
