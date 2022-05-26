import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

import { LockService } from "../runtime/lock.service";

@Injectable()
export class InstallGuard implements CanActivate {
  constructor(private readonly lockService: LockService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    context.getClass();
    return await this.lockService.acquireFileLock("install");
  }
}
