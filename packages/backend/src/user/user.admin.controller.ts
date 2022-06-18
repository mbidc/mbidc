import {
  Body,
  ConflictException,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
} from "@nestjs/common";

import { Controller, IsAdmin } from "../common/common.decorator";
import { Pagination } from "../common/common.dto";

import {
  UserCreateDto,
  UserPaginationResponse,
  UserResponse,
} from "./dto/user.dto";
import { UserService } from "./user.service";

@Controller("user", true)
export class UserAdminController {
  constructor(private readonly userService: UserService) {}

  @Get("all")
  async all(@Query() query: Pagination) {
    const { count, data } = await this.userService.findAll(query);
    return new UserPaginationResponse(count, data);
  }

  @Get("/:id")
  async get(@Param("id") id: string) {
    const u = await this.userService.findOne(id);
    if (!u) {
      throw new NotFoundException();
    } else {
      return new UserResponse(u);
    }
  }

  @Post()
  async create(@Body() user: UserCreateDto) {
    const u = await this.userService.create(user);
    if (!u) {
      throw new ConflictException();
    } else {
      return new UserResponse(u);
    }
  }

  @IsAdmin()
  @Delete(":id")
  async delete(@Param("id") id: string) {
    const u = await this.userService.findOne(id);
    if (!u) {
      throw new NotFoundException();
    } else {
      await this.userService.delete(u.id);
    }
  }
}
