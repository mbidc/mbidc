import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { AppRequest } from "../common/common.interface";

export const ReqUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AppRequest>();
    return request.user;
  }
);
