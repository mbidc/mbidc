import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";

import { Pagination } from "../common/common.dto";
import { Course, User } from "../entity";

@Injectable()
export class CourseService {
  constructor(
    @Inject(Course) private readonly courseRepository: Repository<Course>
  ) {}
  public async findMy(
    user: User
  ): Promise<{ teach: Course[]; student: Course[] }> {
    const courses = await this.courseRepository.find({
      where: [
        {
          subject: {
            teacher: {
              id: user.id,
            },
          },
        },
        {
          students: {
            id: user.id,
          },
        },
      ],
      relations: ["subject", "subject.teacher"],
    });
    const ret: { teach: Course[]; student: Course[] } = {
      teach: [],
      student: [],
    };
    courses.forEach((course) => {
      if (course.subject.teacher.id === user.id) {
        ret.teach.push(course);
      } else {
        course.myScore = course.score[user.id] ?? -1;
        ret.student.push(course);
      }
    });
    return ret;
  }
  public async setScore(
    user: User,
    courseId: number,
    studentId: string,
    score: number
  ) {
    const course = await this.courseRepository.findOneOrFail({
      where: {
        id: courseId,
        subject: {
          teacher: {
            id: user.id,
          },
        },
        students: {
          id: studentId,
        },
      },
      relations: ["students", "subject", "subject.teacher"],
    });
    course.score[studentId] = score;
    return await this.courseRepository.save(course);
  }
  public async getScore(
    user: User,
    courseId: number,
    query: Pagination
  ): Promise<[number, (Omit<User, "setPassword"> & { score: number })[]]> {
    let { page, limit } = query;
    page = page ?? 0;
    limit = limit ?? 10;
    const course = await this.courseRepository.findOneOrFail({
      where: {
        id: courseId,
        subject: {
          teacher: {
            id: user.id,
          },
        },
      },
      relations: ["students", "subject", "subject.teacher"],
    });
    return [
      course.students.length,

      course.students.slice(page * limit, (page + 1) * limit).map((stu) => ({
        ...stu,
        score: course.score[stu.id] ?? -1,
      })),
    ];
  }
}
