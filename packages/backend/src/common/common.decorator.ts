import { Controller as _Controller } from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiHideProperty,
  ApiNotFoundResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Exclude } from "class-transformer";

import Rule from "../auth/auth.decorator";
import { PublicRule, TagRule } from "../auth/auth.rules";

export const HideProperty = () => (target: any, propertyKey: string) => {
  Exclude()(target, propertyKey);
  ApiHideProperty()(target, propertyKey);
};

export const Controller =
  (name: string, isAdmin?: boolean): ClassDecorator =>
  (target: any) => {
    if (isAdmin) {
      _Controller(`admin/${name}`)(target);
      ApiTags(`admin/${name}`)(target);
      Rule(new TagRule("admin"))(target);
      JWT()(target);
    } else {
      _Controller(name)(target);
      ApiTags(name)(target);
    }
  };
export const C = Controller;
export const T = ApiTags;
export const JWT = () => ApiBearerAuth("jwt");
export const NotFound = () => ApiNotFoundResponse({ description: "Not found" });
export const Public = () => Rule(new PublicRule());
export const IsAdmin =
  (): MethodDecorator =>
  (
    target: any,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) => {
    Rule(new TagRule("admin"))(target, propertyKey, descriptor);
    ApiTags("admin")(target, propertyKey, descriptor);
    JWT()(target, propertyKey, descriptor);
  };
