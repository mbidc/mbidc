import { HttpModule } from "@nestjs/axios";
import { Global, Module } from "@nestjs/common";

import { FileController } from "./file.controller";
import { FileService } from "./file.service";

@Global()
@Module({
  imports: [HttpModule],
  controllers: [FileController],
  providers: [FileService],
})
export class FileModule {}
