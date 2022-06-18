import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

import { Pagination } from "../common/common.dto";
import { User } from "../entity";

import { UserCreateDto } from "./dto/user.dto";

@Injectable()
export class UserService {
  constructor(
    @Inject(User) private readonly userRepository: Repository<User>
  ) {}
  public async create(dto: UserCreateDto) {
    if (await this.userRepository.countBy({ id: dto.id })) {
      return null;
    }
    const user = new User();
    user.id = dto.id;
    user.name = dto.name;
    user.phone = dto.phone;
    user.email = dto.email;
    user.department = dto.department;
    user.avatar = dto.avatar;
    await user.setPassword(dto.password);
    user.tags = dto.tags;
    return await this.userRepository.save(user);
  }
  public async findAll(query: Pagination) {
    let { page, limit } = query;
    page = page ?? 0;
    limit = limit ?? 10;
    const res = await this.userRepository.findAndCount({
      skip: page * limit,
      take: limit,
    });
    return {
      count: res[1],
      data: res[0],
    };
  }
  public async findOne(id: string) {
    return await this.userRepository.findOneByOrFail({ id });
  }
  public async delete(id: string) {
    return await this.userRepository.delete({ id });
  }
}
