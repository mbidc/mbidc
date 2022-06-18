import { Injectable } from "@nestjs/common";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

import "reflect-metadata";
import { IsConfig } from "./config/config.interface";

@Injectable()
export class APIConfig {
  @IsString()
  @IsOptional()
  HOST = "localhost";
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  PORT = 8080;
}

@Injectable()
export class DatabaseConfig {
  @IsString()
  URL!: string;
}

@Injectable()
export class RuntimeConfig {
  @IsString()
  DIR!: string;
  @IsString()
  JWT_SECRET!: string;
  @IsNumber()
  JWT_EXPIRE!: number;
}

@Injectable()
export class OSSConfig {
  @IsString()
  ACCESS_KEY_ID!: string;
  @IsString()
  ACCESS_KEY_SECRET!: string;
  @IsString()
  ENDPOINT!: string;
  @IsString()
  BUCKET!: string;
  @IsString()
  REGION!: string;
}

@Injectable()
export class Config {
  @IsConfig(APIConfig)
  API: APIConfig = new APIConfig();
  @IsConfig(DatabaseConfig)
  DATABASE: DatabaseConfig = new DatabaseConfig();
  @IsConfig(RuntimeConfig)
  RUNTIME: RuntimeConfig = new RuntimeConfig();
  @IsConfig(OSSConfig)
  OSS: OSSConfig = new OSSConfig();
}
