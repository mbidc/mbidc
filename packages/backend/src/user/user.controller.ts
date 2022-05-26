import {
  Body,
  Controller,
  Get,
  Inject,
  NotFoundException,
  Post,
  Query,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiTags,
} from "@nestjs/swagger";
import { DataSource, Repository } from "typeorm";

import Rule from "../auth/auth.decorator";
import { TagRule } from "../auth/auth.rules";
import ReqUser from "../auth/user.decorator";
import { Pagination } from "../common/common.dto";
import { User } from "../entity";

import { UserCreateDto } from "./dto/user.dto";

@ApiTags("user")
@Controller("user")
export default class UserController {
  constructor(
    @Inject(User) private readonly userRepository: Repository<User>,
    private readonly db: DataSource
  ) {}

  @ApiTags("admin")
  @ApiBearerAuth("jwt")
  @Rule(new TagRule("admin"))
  @Get("all")
  async all(@Query() query: Pagination) {
    let { page, limit } = query;
    page = page ?? 1;
    limit = limit ?? 10;
    return await this.userRepository.find({
      relations: ["tags"],
      skip: page * limit - limit,
      take: limit,
    });
  }

  @ApiBearerAuth("jwt")
  @ApiNotFoundResponse({ description: "User not found" })
  @Get()
  async self(@ReqUser() user: User) {
    const u = await this.userRepository.findOne({
      relations: ["tags"],
      where: { id: user.id },
    });
    if (!u) {
      throw new NotFoundException();
    } else {
      return u;
    }
  }

  @ApiTags("admin")
  @Rule(new TagRule("admin"))
  @ApiBearerAuth("jwt")
  @ApiNotFoundResponse({ description: "User not found" })
  @Get("/:id")
  async get(@Query("id") id: number) {
    const u = await this.userRepository.findOne({
      relations: ["tags"],
      where: { id },
    });
    if (!u) {
      throw new NotFoundException();
    } else {
      return u;
    }
  }

  @ApiTags("admin")
  @Rule(new TagRule("admin"))
  @ApiBearerAuth("jwt")
  @ApiConflictResponse({ description: "User already exists" })
  @Post()
  async create(@Body() user: UserCreateDto) {
    const u = await this.userRepository.findOne({
      where: { name: user.name },
    });
    if (u) {
      throw new Error("User already exists");
    } else {
      return this.userRepository.save(new User());
    }
  }
}
