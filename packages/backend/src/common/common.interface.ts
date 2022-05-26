import { FastifyRequest } from "fastify";

import { User } from "../entity";

export interface AppRequest extends FastifyRequest {
  user: Pick<User, "id" | "name"> & {
    tags: string[];
  };
}
