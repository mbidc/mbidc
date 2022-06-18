import { Injectable, Inject, ConflictException } from "@nestjs/common";
import { In, Repository } from "typeorm";

import { Pagination } from "../common/common.dto";
import { Open, User, Course, Subject } from "../entity";

import { CreateOpenDto } from "./open.dto";

@Injectable()
export class OpenService {
  constructor(
    @Inject(Open) private readonly openRepository: Repository<Open>,
    @Inject(Course) private readonly courseRepository: Repository<Course>
  ) {}
  async create(create: CreateOpenDto): Promise<Open> {
    const open = new Open();
    open.name = create.name;
    open.start = create.start;
    open.end = create.end;
    open.studentTag = create.studentTag;
    return await this.openRepository.save(open);
  }
  async findAll(): Promise<Open[]> {
    return this.openRepository.find();
  }
  async find(id: number): Promise<Open> {
    return this.openRepository.findOneByOrFail({
      id: id,
    });
  }
  async findMyOpens(user: User): Promise<Open[]> {
    return this.openRepository.findBy({
      studentTag: In(user.tags.split(",")),
    });
  }
  checkAccess(user: User, open: Open): boolean {
    return (
      user.tags.split(",").includes("admin") ||
      (open.start <= new Date() &&
        open.end >= new Date() &&
        user.tags.split(",").includes(open.studentTag))
    );
  }
  async listOpenCourses(open: Open, query: Pagination) {
    let { page, limit } = query;
    page = page ?? 0;
    limit = limit ?? 10;
    const res = await this.courseRepository.findAndCount({
      where: {
        open: {
          id: open.id,
        },
      },
      skip: page * limit,
      take: limit,
      relations: ["subject", "subject.teacher"],
    });
    return {
      data: res[0],
      count: res[1],
    };
  }
  async addCourse(open: Open, subject: Subject) {
    const course = new Course();
    course.open = open;
    course.currentStudent = 0;
    course.students = [];
    course.subject = subject;
    course.score = {};
    return await this.courseRepository.save(course);
  }
  async selectCourse(open: Open, courseId: number, user: User) {
    const course = await this.courseRepository.findOneOrFail({
      where: {
        open: {
          id: open.id,
        },
        id: courseId,
      },
      relations: ["students", "subject"],
    });
    if (course.students.findIndex((s) => s.id === user.id) !== -1) {
      throw new ConflictException("你已经选过这门课了");
    } else if (course.currentStudent >= course.subject.maxStudents) {
      throw new ConflictException("这门课已经满了");
    } else {
      course.students.push(user);
      course.currentStudent++;
      return await this.courseRepository.save(course);
    }
  }
}
