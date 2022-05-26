import FastifyCors from "@fastify/cors";
import { NestFactory } from "@nestjs/core";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { WinstonLogger, WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";

import { AppModule } from "./app.module";
import { APIConfig } from "./config.interface";

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );
  const config = new DocumentBuilder()
    .addSecurity("jwt", {
      type: "http",
      scheme: "bearer",
    })
    .setTitle("MBDIC")
    .setDescription("The MBDIC API description")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  app.register(FastifyCors, {
    origin: "*",
  });

  const logger = app.get<WinstonLogger>(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);
  const API = app.get(APIConfig);
  logger.setContext("main");
  logger.log(`Listening on ${API.HOST}:${API.PORT}`);
  await app.listen(API.PORT, API.HOST);
}
bootstrap();
