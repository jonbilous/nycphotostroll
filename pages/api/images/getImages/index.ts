import { resolveFilters } from "pages/api/images/getImages/filters";
import api from "utils/api";
import { getUser, requireAuth } from "utils/ctx";
import db from "utils/db";
import { getImagesSchema } from "./schemas";
import { resolveImages } from "utils/images";
import AWS from "aws-sdk";
import sharp from "sharp";
import { Image } from "@prisma/client";
import { splitEvery } from "ramda";

const s3 = new AWS.S3();

const url = "/api/images/getImages/";

const getImages = api.createHandler({
  url,
  ctx: { user: requireAuth("admin", "normal") },
  fn: async ({ page, orderBy, limit, filters }, { user }) => {
    const search = filters.search ? `'${filters.search}'` : null;

    const query = {
      where: {
        userId: user.id,
        location: { ...filters.location },
        orientation: filters.orientation,
        status: (filters.status as any) || "published",
        ...(search
          ? {
              OR: [
                { description: { search } },
                { title: { search } },
                { seoTitle: { search } },
              ],
            }
          : {}),
        ...(filters.subjects
          ? { subjects: { some: { subjectName: filters.subjects } } }
          : {}),
      },
      orderBy: orderBy.lineItemCount
        ? [
            { lineItemCount: "desc" as "desc" },
            { createdAt: "desc" as "desc" },
            { id: "desc" as "desc" },
          ]
        : orderBy,
    };

    const [count, result, locations, subjects] = await Promise.all([
      db.image.count(query),
      db.image.findMany({
        ...query,
        take: limit,
        skip: page * limit - limit,
        select: {
          noirSku: true,
          location: true,
          title: true,
          description: true,
          uid: true,
          sourceAspects: true,
          subjects: true,
          id: true,
          status: true,
          createdAt: true,
        },
      }),

      db.location.findMany({
        where: {
          ...filters.location,
          images: { some: { ...query.where, location: undefined } },
        },
      }),

      db.subject.findMany({
        where: {
          images: {
            some: { image: { ...query.where }, subject: { public: true } },
          },
        },
      }),
    ]);

    const productFilters = resolveFilters({ subjects, locations });

    const pagination = {
      currentPage: page,
      totalPages: Math.ceil(count / limit),
      count,
    };

    return {
      result: await Promise.all(
        result.map(async (img) => ({
          ...img,
          images: await resolveImages({
            ...img,
            includeSources: true,
          }),
        }))
      ),
      pagination,
      productFilters,
    };
  },
  schema: getImagesSchema,
});

export type ImageQuery = typeof getImages;

export default getImages;
