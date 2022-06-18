import path from "path";

import {
  CacheModule,
  ClassSerializerInterceptor,
  Module,
} from "@nestjs/common";
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { ServeStaticModule } from "@nestjs/serve-static";

import { AdminModule } from "./admin/admin.module";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { EntityExceptionFilter } from "./common/common.filter";
import { ConfigModule } from "./config";
import { Config } from "./config.interface";
import { CourseModule } from "./course/course.module";
import { DatabaseModule } from "./database/database.module";
import { FileModule } from "./file/file.module";
import { LogModule } from "./log/log.module";
import { OpenModule } from "./open/open.module";
import { RuntimeModule } from "./runtime/runtime.module";
import { SubjectModule } from "./subject/subject.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, "../static"),
    }),
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
    FileModule,
    SubjectModule,
    CourseModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: EntityExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
