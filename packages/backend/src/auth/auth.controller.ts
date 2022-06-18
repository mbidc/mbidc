import { Body, Post, Request, UseGuards } from "@nestjs/common";

import { Controller, Public } from "../common/common.decorator";
import { AppRequest } from "../common/common.interface";

import { LoginDto, LoginResponseDto } from "./auth.dto";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post("/login")
  login(@Request() req: AppRequest, @Body() login: LoginDto) {
    login;
    return new LoginResponseDto(this.authService.login(req.user as any));
  }
}
