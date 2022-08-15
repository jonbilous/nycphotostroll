import { uniqBy } from "ramda";
import { ImageWithLocation } from "./db";

type Segment = string | number | null | undefined;

const cleanWord = (word: string) => {
  const cleaned = word ? word.replace(/[^A-Za-z0-9]/g, "").trim() : null;
  return cleaned ? cleaned : [];
};

const cleanSegment = (segment: Segment) => {
  return String(segment)
    .trim()
    .toLowerCase()
    .split(" ")
    .flatMap(cleanWord)
    .join("-");
};

const generateUid = (...segments: Segment[]) => {
  const cleaned = segments.flatMap((segment) =>
    segment ? cleanSegment(segment) : []
  );

  return uniqBy((item) => {
    return item;
  }, cleaned).join("-");
};

export const generateProductUid = (
  image: ImageWithLocation,
  suffix: string | number | null
) => {
  return generateUid(
    image.title,
    image.location?.city,
    image.location?.state,
    image.location?.country,
    suffix
  );
};

export const generateLocationUid = ({
  country,
  state,
  city,
  name,
  googlePlaceId,
}: {
  city?: string | null;
  state?: string | null;
  country?: string | null;
  name?: string | null;
  googlePlaceId?: string | null;
}) => {
  const uid = generateUid(country, state, city, name, googlePlaceId);

  return uid;
};
