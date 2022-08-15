import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

const stack = pulumi.getStack();
const project = pulumi.getProject();

const name = (name: string) => {
  return [stack, project, name].join("-");
};

const bucket = new aws.s3.Bucket(name("images"), {
  corsRules: [
    {
      allowedMethods: ["PUT", "GET", "HEAD", "POST"],
      allowedOrigins: ["*"],
      allowedHeaders: ["*"],
    },
  ],
});

export const S3_BUCKET = bucket.id;
