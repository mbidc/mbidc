import { readFileSync } from "fs";

import { DynamicModule } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { validateSync } from "class-validator";
import * as dotenv from "dotenv";
import * as dotenvExpand from "dotenv-expand";
import { sync } from "find-up";
import * as yaml from "js-yaml";
import merge from "lodash.merge";
import set from "lodash.set";

export interface ConfigModuleOptions {
  configFileName?: string;
  ignoreEnv?: boolean;
  noParseEnv?: boolean;
}

export class ConfigModule {
  static forRoot<T extends object>(
    configInterface: { new (): T },
    options?: ConfigModuleOptions
  ): DynamicModule {
    let _config: any = {};
    if (!options?.ignoreEnv) {
      Object.entries(
        merge(dotenvExpand.expand(dotenv.config({})).parsed ?? {}, process.env)
      ).forEach(([key, value]) => {
        _config[key] = value;
        if (!options?.noParseEnv) {
          set(_config, key.replace(/_/g, "."), value);
        }
      });
    }
    const yamlFile = options?.configFileName ?? _config.CONFIG ?? "config.yml";
    const file = sync(yamlFile);
    if (file) {
      _config = merge(_config, yaml.load(readFileSync(file, "utf8")));
    }
    const config = plainToInstance(configInterface, _config, {
      excludeExtraneousValues: true,
      exposeDefaultValues: true,
    });
    const errors = validateSync(config);
    if (errors.length) {
      throw errors[0];
    }
    const providers = [
      {
        provide: configInterface,
        useValue: config,
      },
      ...Object.values(config).map((value) => ({
        provide: value.constructor,
        useValue: value,
      })),
    ];
    return {
      module: ConfigModule,
      providers,
      exports: providers,
      global: true,
    };
  }
}
