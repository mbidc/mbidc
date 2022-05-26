import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

import { UserTag } from "../entity";

@Injectable()
export default class UserTagService {
  constructor(
    @Inject(UserTag) private readonly userTagRepository: Repository<UserTag>
  ) {}
  public async create(...name: string[]) {
    return this.userTagRepository.create(
      (
        await this.userTagRepository
          .createQueryBuilder()
          .insert()
          .values(name.map((n) => ({ name: n })))
          .orUpdate(["name"], ["name"])
          .returning("*")
          .execute()
      ).generatedMaps
    );
  }
  public async findAll() {
    return this.userTagRepository.find();
  }
  public async delete(id: number) {
    const res = await this.userTagRepository.delete(id);
    console.log(res);
    return res.affected;
  }
}
