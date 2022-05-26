import { Global, Module } from "@nestjs/common";

import { databaseProviders, repositoryProviders } from "./database.provider";

@Global()
@Module({
  providers: [databaseProviders, ...repositoryProviders],
  exports: [databaseProviders, ...repositoryProviders],
})
export class DatabaseModule {}
