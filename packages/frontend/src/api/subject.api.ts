import { plainToInstance } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";
import { useState } from "react";

export default class Subject {
  @IsNumber()
  id!: number;
  @IsString()
  name!: string;
  @IsString()
  @IsOptional()
  img?: string;
  @IsString()
  description!: string;
  @IsString()
  document!: string;
  static getById(_id: number): { data?: Subject; error?: any } {
    const [sub, setSub] = useState<Subject>();
    setTimeout(() => {
      setSub(
        plainToInstance(Subject, {
          id: _id,
          name: "test",
          img: require("../static/bg.jpg"),
          description: "这是一个测试课程。".repeat(10),
          document: "",
        }),
      );
    }, 1000);
    return {
      data: sub,
    };
  }
}
