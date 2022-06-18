import { FastifyRequest, FastifyReply } from "fastify";

import { User } from "../entity";

export interface AppRequest extends FastifyRequest {
  user: Omit<User, "password" | "setPassword">;
}

export interface UploadFile {
  data: Buffer;
  filename: string;
  encoding: string;
  mimetype: string;
  limit: false;
}

export type AppReply = FastifyReply;
