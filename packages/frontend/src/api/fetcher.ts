import { plainToInstance } from "class-transformer";
import { IsNumber, IsString, ValidateNested } from "class-validator";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "reflect-metadata";
import useSWR from "swr";

import { API } from "../constants";

export class Pagination {
  page?: number;
  limit?: number;
  constructor(page?: number, limit?: number) {
    this.page = page;
    this.limit = limit;
  }
}

export class APIResponse<T = any> {
  @IsNumber()
  statusCode!: number;
  @IsString()
  message!: string;
  @ValidateNested()
  data!: T;
}

export class APIPaginationResponse<T = any> extends APIResponse<T[]> {
  @IsNumber()
  total!: number;
}

export class APIError extends Error {
  code: number;
  cause?: Error;
  constructor(code: number, cause?: Error | string) {
    super();
    this.code = code;
    if (typeof cause === "string") {
      this.message = cause;
    } else {
      this.cause = cause;
      if (cause) {
        this.message = cause.message;
        this.stack = cause.stack;
      }
    }
  }
  toString() {
    return (
      `APIError: ${this.code}` +
      (this.cause ? `, cause: ${this.stack}` : `${this.message}`)
    );
  }
}

export interface FetcherOptions {
  authorize?: boolean;
}

export const fetcher =
  <T extends APIResponse>(obj?: { new (): T }, options?: FetcherOptions) =>
  (url: string, init?: RequestInit): Promise<T> => {
    const headers = new Headers(init?.headers);
    if (options?.authorize) {
      console.log("Authorizing request");
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    }
    init = { ...init, headers };

    return fetch(API + url, init)
      .then((r) => {
        if (r.status === 404) {
          throw new APIError(404);
        }
        return r.json();
      })
      .then((r) => {
        let p;
        if (obj) {
          p = plainToInstance(obj, r, {
            enableImplicitConversion: true,
          });
        } else {
          p = r;
        }
        if (p.statusCode !== 200) {
          throw new APIError(p.statusCode, p.message);
        }
        return p;
      })
      .catch((e) => {
        if (e instanceof APIError) {
          throw e;
        } else if (e instanceof TypeError) {
          throw new APIError(-1, e);
        }
        throw new APIError(-1, e);
      });
  };

export const useFetch = <T extends APIResponse>(
  url: string,
  obj?: { new (): T },
  options?: FetcherOptions,
) => {
  const navigate = useNavigate();
  const { error, data } = useSWR<T, APIError>(url, {
    fetcher: fetcher(obj, options),
  });
  useEffect(() => {
    if (error?.code === 401) {
      navigate("/login");
    }
  }, [error, data]);
  return { error, data };
};
