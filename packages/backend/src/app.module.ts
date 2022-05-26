import {
  CacheModule,
  ClassSerializerInterceptor,
  Module,
} from "@nestjs/common";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";

import { AdminModule } from "./admin/admin.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import JwtAuthGuard from "./auth/jwt-auth.guard";
import { ConfigModule } from "./config";
import { Config } from "./config.interface";
import { DatabaseModule } from "./database/database.module";
import { LogModule } from "./log/log.module";
import OpenModule from "./open/open.module";
import { RuntimeModule } from "./runtime/runtime.module";
import UserModule from "./user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot(Config),
    CacheModule.register({
      isGlobal: true,
    }),
    LogModule,
    DatabaseModule,
    RuntimeModule,
    AuthModule,
    AdminModule,
    UserModule,
    OpenModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
