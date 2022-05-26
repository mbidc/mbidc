import { Module } from "@nestjs/common";

import UserTagController from "./tag.controller";
import UserTagService from "./tag.service";
import UserController from "./user.controller";

@Module({
  controllers: [UserController, UserTagController],
  providers: [UserTagService],
})
export default class UserModule {}
