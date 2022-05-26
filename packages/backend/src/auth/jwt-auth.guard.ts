import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";

import { AppRequest } from "../common/common.interface";

import { RULES_KEY } from "./auth.decorator";
import { AuthRule, Public } from "./auth.rules";

@Injectable()
export default class JwtAuthGuard extends AuthGuard("jwt") {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const rules = this.reflector.getAllAndMerge<AuthRule[]>(RULES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (rules?.find((rule) => rule instanceof Public)) {
      return true;
    }
    return super.canActivate(context);
  }
  handleRequest<U = AppRequest["user"]>(
    err: Error | null,
    user: U,
    info: any,
    context: ExecutionContext
  ): U {
    if (err) {
      throw new InternalServerErrorException(err);
    }
    if (!user) {
      throw new UnauthorizedException();
    }
    const request = context.switchToHttp().getRequest<AppRequest>();
    request.user = user as any;
    const rules = this.reflector.getAllAndMerge<AuthRule[]>(RULES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (rules && rules.length > 0) {
      console.log(rules);
      const accessible = rules.every((rule) => rule.access(request));
      if (!accessible) {
        throw new ForbiddenException();
      }
    }
    return user;
  }
}
