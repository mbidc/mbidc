import { mkdirSync } from "fs";
import fs from "fs/promises";
import path from "path";

import { Injectable } from "@nestjs/common";

import { RuntimeConfig } from "../config.interface";

@Injectable()
export class LockService {
  private readonly lockDir: string;
  constructor(private readonly runtimeConfig: RuntimeConfig) {
    this.lockDir = path.join(this.runtimeConfig.DIR, "lock");
    mkdirSync(this.lockDir, { recursive: true });
  }

  public async acquireFileLock(key: string): Promise<boolean> {
    const file = path.join(this.lockDir, key);
    try {
      await fs.stat(file);
      return false;
    } catch (error: any) {
      if (error?.code === "ENOENT") {
        await fs.writeFile(file, "", { flag: "wx" });
        return true;
      }
      return false;
    }
  }

  public async releaseFileLock(key: string): Promise<boolean> {
    const file = path.join(this.lockDir, key);
    try {
      await fs.unlink(file);
      return true;
    } catch (error) {
      return false;
    }
  }
}
