import { PaginationResponse, SuccessResponse } from "../../common/common.dto";
import { User } from "../../entity";

export class UserCreateDto {
  id!: string;
  avatar?: string;
  name!: string;
  password!: string;
  phone!: string;
  email!: string;
  department!: string;
  tags!: string;
}

export class UserPaginationResponse extends PaginationResponse<User> {
  data!: User[];
}

export class UserResponse extends SuccessResponse<User> {
  data!: User;
}
