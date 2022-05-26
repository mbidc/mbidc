import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";

import { User } from "../entity";

@Injectable()
export default class AuthService {
  constructor(
    @Inject(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}
  async validate(name: string, password: string) {
    const user = await this.userRepository.findOne({
      where: {
        name,
      },
      relations: ["tags"],
    });
    if (user && bcrypt.compareSync(password, user.getPassword())) {
      return user;
    }
  }
  login(user: User) {
    console.log(user);
    const payload = {
      username: user.name,
      sub: user.id,
      tags: user.tags.map((t) => t.name),
    };
    return this.jwtService.sign(payload);
  }
}
