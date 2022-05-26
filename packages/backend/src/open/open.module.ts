import { Module } from "@nestjs/common";

import OpenController from "./open.controller";

@Module({
  controllers: [OpenController],
})
export default class OpenModule {}
