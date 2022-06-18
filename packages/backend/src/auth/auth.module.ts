import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { RuntimeConfig } from "../config.interface";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { LocalStrategy } from "./local.strategy";

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory(runtimeConfig: RuntimeConfig) {
        return {
          secret: runtimeConfig.JWT_SECRET,
          signOptions: { expiresIn: runtimeConfig.JWT_EXPIRE },
        };
      },
      inject: [RuntimeConfig],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
