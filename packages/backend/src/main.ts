import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";
import { WinstonLogger, WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";

import { AppModule } from "./app.module";
import { APIConfig } from "./config.interface";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = app.get<WinstonLogger>(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);
  const API = app.get(APIConfig);
  logger.setContext("main");
  logger.log(`Listening on ${API.HOST}:${API.PORT}`);
  await app.listen(API.PORT, API.HOST);
}
bootstrap();
