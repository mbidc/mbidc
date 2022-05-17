import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "./config";
import { Config } from "./config.interface";
import { LogModule } from "./log/log.module";

@Module({
  imports: [ConfigModule.forRoot(Config), LogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
