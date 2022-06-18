import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";

import { User } from "../entity";

@Injectable()
export class AuthService {
  constructor(
    @Inject(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}
  async validate(id: string, password: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
  }
  login(user: User) {
    const { password, ...payload } = user;
    return this.jwtService.sign(payload);
  }
}
