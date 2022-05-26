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
export class DatabaseConfig {
  @IsString()
  @Expose()
  URL: string;
}

@Injectable()
export class RuntimeConfig {
  @IsString()
  @Expose()
  DIR: string;
  @IsString()
  @Expose()
  REDIS: string;
  @IsString()
  @Expose()
  JWT_SECRET: string;
  @IsNumber()
  @Expose()
  JWT_EXPIRE: number;
}

@Injectable()
export class Config {
  @IsConfig(APIConfig)
  API: APIConfig = new APIConfig();
  @IsConfig(DatabaseConfig)
  DATABASE: DatabaseConfig = new DatabaseConfig();
  @IsConfig(RuntimeConfig)
  RUNTIME: RuntimeConfig = new RuntimeConfig();
}
