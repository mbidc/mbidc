import { ApiProperty } from "@nestjs/swagger";

import { SuccessResponse } from "../common/common.dto";
import { UploadFile } from "../common/common.interface";

export class FileUploadDto {
  @ApiProperty({ type: "string", format: "binary" })
  file!: UploadFile[];
  name?: string;
}

export class URLUploadDto {
  @ApiProperty({ type: "string" })
  url!: string;
  name?: string;
}

export class UploadResponse extends SuccessResponse<string> {
  data!: string;
}
