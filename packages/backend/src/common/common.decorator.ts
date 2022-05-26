import { ApiHideProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

export const HideProperty = () => (target: any, propertyKey: string) => {
  Exclude()(target, propertyKey);
  ApiHideProperty()(target, propertyKey);
};
