import { Inject, Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";

import { AppRequest } from "../common/common.interface";
import { RuntimeConfig } from "../config.interface";
import { User } from "../entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    runtimeConfig: RuntimeConfig,
    @Inject(User) private readonly userRepository: Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: runtimeConfig.JWT_SECRET,
    });
  }

  async validate(payload: any): Promise<AppRequest["user"]> {
    return {
      id: payload.id,
      name: payload.name,
      tags: payload.tags,
      avatar: payload.avatar,
      phone: payload.phone,
      email: payload.email,
      department: payload.department,
    };
  }
}
