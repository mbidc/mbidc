import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

import { AppRequest } from "../common/common.interface";

import Rule from "./auth.decorator";
import { LoginDto, LoginResponseDto } from "./auth.dto";
import { Public } from "./auth.rules";
import AuthService from "./auth.service";
import LocalAuthGuard from "./local-auth.guard";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Rule(new Public())
  @Post("/login")
  login(@Request() req: AppRequest, @Body() login: LoginDto) {
    login;
    return new LoginResponseDto(this.authService.login(req.user as any));
  }
}
