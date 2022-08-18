import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

const seed = async () => {
  await db.event.createMany({
    data: [
      {
        location: "Lower East Side",
        date: new Date("July 17, 2022"),
        uid: "lower-east-side",
        type: "photowalk",
      },
      {
        location: "Prospect Park",
        date: new Date("July 31, 2022"),
        uid: "prospect-park",
        type: "photowalk",
      },
      {
        location: "Coney Island",
        date: new Date("August 14, 2022"),
        uid: "coney-island",
        type: "photowalk",
      },
    ],
    skipDuplicates: true,
  });
};

seed();
