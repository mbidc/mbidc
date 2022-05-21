import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "./config";
import { Config } from "./config.interface";
import { DatabaseModule } from "./database/database.module";
import { LogModule } from "./log/log.module";

@Module({
  imports: [
    ConfigModule.forRoot(Config),
    LogModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
