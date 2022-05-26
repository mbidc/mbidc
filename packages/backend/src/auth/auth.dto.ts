export class LoginDto {
  username: string;
  password: string;
}

export class LoginResponseDto {
  token: string;
  constructor(token: string) {
    this.token = token;
  }
}
