import { HandlerContext } from "@jonbilous/next-js-rpc";
import { HTTPError } from "@jonbilous/next-js-rpc/server";
import { AuthRole, getUserProfile } from "./auth";

export const getUser = (ctx: HandlerContext) => {
  return getUserProfile(ctx.req, ctx.res);
};

export const requireAuth = (...roles: AuthRole[]) => {
  return async (ctx: HandlerContext) => {
    const session = await getUser(ctx);

    if (!session) {
      throw new HTTPError("unauthenticated", 401);
    }

    if (roles.length && !roles.includes(session.role)) {
      throw new HTTPError("incorrect role", 401);
    }

    return session;
  };
};
