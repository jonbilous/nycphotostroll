export const resolveImageUrl = (image: { uid: string }) => {
  return `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${image.uid}.jpg`;
};
