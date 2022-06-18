import { plainToClass } from "class-transformer";
import { useNavigate } from "react-router-dom";

import {
  fetcher,
  APIPaginationResponse,
  APIResponse,
  Pagination,
  useFetch,
} from "./fetcher";

class AuthResponse extends APIResponse<string> {
  token!: string;
}

export class User {
  id!: number;
  name!: string;
  tags!: string;
  phone!: string;
  email!: string;
  department!: string;
  get isAdmin() {
    return this.tags.split(",").includes("admin");
  }
  static getAll(pagination?: Pagination) {
    return useFetch<APIPaginationResponse<User>>(
      `/admin/user/all?page=${pagination?.page ?? ""}&limit=${
        pagination?.limit ?? ""
      }`,
      APIPaginationResponse,
      {
        authorize: true,
      },
    );
  }
  static useMe() {
    const navigate = useNavigate();
    let token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return new User();
    }
    token = token.replace(/\s+/g, "").replace(/\-/g, "+").replace(/\_/g, "/");

    return plainToClass(User, JSON.parse(atob(token.split(".")[1])));
  }
  static login(id: string, password: string) {
    return fetcher(AuthResponse)("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, password }),
    });
  }
  static async create(create: {
    id: string;
    department: string;
    email: string;
    name: string;
    password: string;
    phone: string;
    tags: string;
  }) {
    return fetcher(APIResponse, { authorize: true })("/admin/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...create,
      }),
    });
  }
}
