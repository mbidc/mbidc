import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

import { User } from "../entity";

import { UserCreateDto } from "./dto/user.dto";
import UserTagService from "./tag.service";

@Injectable()
export default class UserService {
  constructor(
    @Inject(User) private readonly userRepository: Repository<User>,
    private readonly userTagService: UserTagService
  ) {}
  public async create(dto: UserCreateDto) {
    const user = new User();
    user.name = dto.name;
    user.phone = dto.phone;
    user.tags = await this.userTagService.create(...dto.tags);
    return await this.userRepository.save(user);
  }
}
