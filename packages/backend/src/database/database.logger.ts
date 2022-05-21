/* eslint-disable @typescript-eslint/no-unused-vars */
import { Logger as TypeORMLogger, QueryRunner } from "typeorm";
import { PlatformTools } from "typeorm/platform/PlatformTools";
import { Logger } from "winston";

export class WinstonLogger implements TypeORMLogger {
  constructor(private readonly logger: Logger) {
    this.logger = this.logger.child({
      context: "SQL",
    });
  }
  logQuery(query: string, parameters?: any[], queryRunner?: QueryRunner) {
    const sql =
      query +
      (parameters && parameters.length
        ? " -- PARAMETERS: " + this.stringifyParams(parameters)
        : "");
    this.logger.debug("query: " + PlatformTools.highlightSql(sql));
  }

  /**
   * Logs query that is failed.
   */
  logQueryError(
    error: string,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner
  ) {
    const sql =
      query +
      (parameters && parameters.length
        ? " -- PARAMETERS: " + this.stringifyParams(parameters)
        : "");
    this.logger.error("query failed:", PlatformTools.highlightSql(sql));
    this.logger.error("error:", error);
  }

  /**
   * Logs query that is slow.
   */
  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[],
    queryRunner?: QueryRunner
  ) {
    const sql =
      query +
      (parameters && parameters.length
        ? " -- PARAMETERS: " + this.stringifyParams(parameters)
        : "");
    this.logger.warn("query is slow:", PlatformTools.highlightSql(sql));
    this.logger.warn("execution time:", time);
  }

  /**
   * Logs events from the schema build process.
   */
  logSchemaBuild(message: string, queryRunner?: QueryRunner) {
    this.logger.debug(message);
  }

  /**
   * Logs events from the migration run process.
   */
  logMigration(message: string, queryRunner?: QueryRunner) {
    this.logger.debug(message);
  }

  /**
   * Perform logging using given logger, or by default to the console.
   * Log has its own level and message.
   */
  log(level: "log" | "info" | "warn", message: any, queryRunner?: QueryRunner) {
    switch (level) {
      case "log":
        this.logger.debug(message);
        break;
      case "info":
        this.logger.info(message);
        break;
      case "warn":
        this.logger.warn(message);
        break;
    }
  }

  // -------------------------------------------------------------------------
  // Protected Methods
  // -------------------------------------------------------------------------

  /**
   * Converts parameters to a string.
   * Sometimes parameters can have circular objects and therefore we are handle this case too.
   */
  protected stringifyParams(parameters: any[]) {
    try {
      return JSON.stringify(parameters);
    } catch (error) {
      // most probably circular objects in parameters
      return parameters;
    }
  }
}
