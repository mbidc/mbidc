import { ExceptionFilter, Catch, NotFoundException } from "@nestjs/common";
import { EntityNotFoundError } from "typeorm";

@Catch(EntityNotFoundError)
export class EntityExceptionFilter implements ExceptionFilter {
  catch() {
    throw new NotFoundException();
  }
}
