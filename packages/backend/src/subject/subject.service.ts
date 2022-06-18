import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

import { Pagination } from "../common/common.dto";
import { Subject } from "../entity";
import { UserService } from "../user/user.service";

import { CreateSubjectDto } from "./subject.dto";

@Injectable()
export class SubjectService {
  constructor(
    private readonly userService: UserService,
    @Inject(Subject) private readonly subjectRepository: Repository<Subject>
  ) {}
  public async create(create: CreateSubjectDto): Promise<Subject> {
    const subject = new Subject();
    subject.subId = create.subId;
    subject.name = create.name;
    subject.description = create.description;
    subject.type = create.type;
    subject.detail = create.detail;
    subject.maxStudents = create.maxStudents;
    subject.teacher = await this.userService.findOne(create.teacherId);
    subject.department = create.department;
    subject.img = create.img;
    subject.document = create.document;
    return this.subjectRepository.save(subject);
  }
  public async delete(subId: string) {
    return this.subjectRepository.delete({
      subId,
    });
  }
  public async find(subId: string) {
    return this.subjectRepository.findOneOrFail({
      where: { subId },
      relations: {
        teacher: true,
      },
    });
  }
  public async findAll(query: Pagination) {
    let { page, limit } = query;
    page = page ?? 0;
    limit = limit ?? 10;
    const res = await this.subjectRepository.findAndCount({
      skip: page * limit,
      take: limit,
    });
    return {
      count: res[1],
      data: res[0],
    };
  }
}
