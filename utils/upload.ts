import { Aspect } from "@prisma/client";
import ExifReader from "exifreader";
import {
  resolveImageDimensions,
  resolveImageOrientation,
  Dimensions,
} from "@jonbilous/utils/images";

const aspectRatios: Aspect[] = [
  "RATIO_4x5",
  "RATIO_2x3",
  "RATIO_1x1",
  "RATIO_3x4",
  "RATIO_5x7",
  "RATIO_11x14",
];

export const aspectAsNumber = (aspect: Aspect) => {
  const [x, y] = aspect
    .replace("RATIO_", "")
    .split("x")
    .map((str) => parseInt(str, 10));

  return x / y;
};

export const resolveImageAspect = ({ width, height }: Dimensions) => {
  const imageRatio = width > height ? height / width : width / height;

  return aspectRatios.find((aspect) => {
    const asNumber = aspectAsNumber(aspect);
    return Math.abs(asNumber - imageRatio) < 0.02;
  });
};

const resolveSubjects = (
  keywords: undefined | { description: string } | { description: string }[]
) => {
  if (!keywords) {
    return [];
  }

  if (Array.isArray(keywords)) {
    return keywords.map((keyword) => keyword.description);
  }

  return [keywords.description];
};

export const extractMetadata = async (file: File) => {
  const exif = await ExifReader.load(file).catch((err) => null);

  const title = exif?.["title"]?.description ?? file.name;

  const description = exif?.["Caption/Abstract"]?.description;

  const subjects = resolveSubjects(exif?.["Keywords"]);

  const dateTimeCaptured = exif?.DateCreated?.value
    ? new Date(exif.DateCreated.value)
    : undefined;

  const dimensions = await resolveImageDimensions(file);

  const orientation = resolveImageOrientation(dimensions);
  const aspect = resolveImageAspect(dimensions);

  return {
    exif,
    ...dimensions,
    orientation,
    aspect,
    description,
    title,
    subjects,
    dateTimeCaptured,
  };
};
