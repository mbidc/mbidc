import { SetMetadata } from "@nestjs/common";

import { AuthRule } from "./auth.rules";

export const RULES_KEY = "access_rules";
const Rule = (...rules: AuthRule[]) => SetMetadata(RULES_KEY, rules);

export default Rule;
