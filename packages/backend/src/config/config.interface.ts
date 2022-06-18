import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import "reflect-metadata";

export const IsConfig =
  (obj: any): PropertyDecorator =>
  (target, propertyKey) => {
    ValidateNested()(target, propertyKey);
    Type(() => obj)(target, propertyKey);
  };
