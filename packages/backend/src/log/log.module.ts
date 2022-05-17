import { WinstonModule } from "nest-winston";
import { format, transports } from "winston";

import { nestLikeConsoleFormat } from "./default.log";

export const LogModule = WinstonModule.forRoot({
  transports: [
    new transports.Console({
      format: format.combine(format.timestamp(), nestLikeConsoleFormat("Nest")),
      level: "debug",
    }),
  ],
});
