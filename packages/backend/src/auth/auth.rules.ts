import { AppRequest } from "../common/common.interface";

export abstract class AuthRule {
  public abstract access(req: AppRequest);
  //
}

export class PublicRule extends AuthRule {
  public access() {
    return true;
  }
}

export class TagRule extends AuthRule {
  public access(req: AppRequest) {
    return req.user.tags.split(",").includes(this.tag);
  }

  constructor(public tag: string) {
    super();
  }
}
