import path from "path";

import { Body, Post, Request } from "@nestjs/common";
import { ApiConsumes } from "@nestjs/swagger";

import { Controller, JWT } from "../common/common.decorator";
import { AppRequest } from "../common/common.interface";

import { FileUploadDto, UploadResponse, URLUploadDto } from "./file.dto";
import { FileService } from "./file.service";

@JWT()
@Controller("file")
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @ApiConsumes("multipart/form-data")
  @Post()
  async upload(@Body() body: FileUploadDto) {
    return new UploadResponse(
      await this.fileService.save({
        name:
          body.name && path.basename(body.name)
            ? path.basename(body.name)
            : body.file[0].filename,
        buffer: body.file[0].data,
        type: "file",
      })
    );
  }

  @Post("url")
  async uploadURL(@Request() req: AppRequest, @Body() body: URLUploadDto) {
    return new UploadResponse(
      await this.fileService.save({
        name:
          body.name && path.basename(body.name)
            ? path.basename(body.name)
            : path.basename(body.url),
        url: body.url,
        type: "url",
      })
    );
  }
}
