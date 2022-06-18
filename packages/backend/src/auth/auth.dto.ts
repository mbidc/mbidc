import { SuccessResponse } from "../common/common.dto";

export class LoginDto {
  id!: string;
  password!: string;
}

export class LoginResponseDto extends SuccessResponse<string> {
  data!: string;
}
