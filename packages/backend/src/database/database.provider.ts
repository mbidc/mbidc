import { FactoryProvider } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { DataSource } from "typeorm";
import { Logger } from "winston";

import { DatabaseConfig } from "../config.interface";
import * as Entity from "../entity";

import { WinstonLogger } from "./database.logger";

export const databaseProviders: FactoryProvider = {
  provide: DataSource,
  useFactory: async (config: DatabaseConfig, logger: Logger) =>
    await new DataSource({
      type: "postgres",
      url: config.URL,
      synchronize: true,
      logging: true,
      logger: new WinstonLogger(logger),
      entities: Entity,
      subscribers: [],
      migrations: [],
    }).initialize(),
  inject: [DatabaseConfig, WINSTON_MODULE_PROVIDER],
};

export const repositoryProviders: FactoryProvider[] = Object.values(Entity).map(
  (entity) => ({
    provide: entity,
    useFactory: async (connection: DataSource) =>
      connection.getRepository(entity),
    inject: [DataSource],
  })
);
