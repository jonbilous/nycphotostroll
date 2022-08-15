import { getSession } from "@auth0/nextjs-auth0";
import { Request, Response } from "@jonbilous/next-js-rpc";
import { User } from "@prisma/client";
import db from "./db";

export type AuthRole = User["role"];

export const getUserProfile = async (req: Request, res: Response) => {
  const session = getSession(req, res);

  if (!session) {
    return session;
  }

  let profile = await db.user.findFirst({
    where: { auth0id: session.user.sub },
  });

  if (!profile) {
    profile = await db.user.create({
      data: {
        auth0id: session.user.sub,
        role: "normal",
      },
    });
  }

  return { ...session.user, role: profile.role, id: profile.id };
};
