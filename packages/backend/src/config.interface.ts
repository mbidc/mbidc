import { Injectable } from "@nestjs/common";
import { Expose } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

import "reflect-metadata";
import { IsConfig } from "./config/config.interface";

@Injectable()
export class APIConfig {
  @IsString()
  @IsOptional()
  @Expose()
  HOST = "localhost";
  @IsNumber()
  @IsOptional()
  @Expose()
  PORT = 8080;
}

@Injectable()
export class Config {
  @IsConfig(APIConfig)
  API: APIConfig = new APIConfig();
}
