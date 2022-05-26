import { IsNumber, IsString, ValidateNested } from "class-validator";
import useSWR from "swr";

import fetcher, { APIError } from "./fetcher";

export class UserTag {
  @IsNumber()
  id!: number;
  @IsString()
  name!: string;
}

export default class User {
  @IsNumber()
  id!: number;
  @IsString()
  name!: string;
  @ValidateNested()
  tags!: UserTag[];
  @IsString()
  phone!: string;
  static getAll() {
    return useSWR<User[], APIError>("/admin/user/all", fetcher);
  }
}
