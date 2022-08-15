import { PrismaClient, Image, Location } from "@prisma/client";

export type ImageWithLocation = Image & {
  location: Location | null;
};

const db = new PrismaClient();

export default db;
