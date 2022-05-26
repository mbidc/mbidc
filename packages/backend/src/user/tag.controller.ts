import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
} from "@nestjs/common";
import { ApiBearerAuth, ApiNotFoundResponse, ApiTags } from "@nestjs/swagger";

import { UserTagCreateDto } from "./dto/tag.dto";
import UserTagService from "./tag.service";

@ApiTags("tag")
@Controller("tag")
export default class UserTagController {
  constructor(private readonly tagService: UserTagService) {}
  @ApiBearerAuth("jwt")
  @Post()
  async create(@Body() body: UserTagCreateDto) {
    return await this.tagService.create(...body.names);
  }
  @ApiBearerAuth("jwt")
  @Get()
  async findAll() {
    return await this.tagService.findAll();
  }
  @ApiBearerAuth("jwt")
  @ApiNotFoundResponse({ description: "Not Found" })
  @Delete("/:id")
  async delete(@Param("id") id: number) {
    const res = await this.tagService.delete(id);
    if (res === 0) {
      throw new NotFoundException();
    }
    return id;
  }
}
