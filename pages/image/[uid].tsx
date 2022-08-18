import { Flex } from "@chakra-ui/react";
import { InferResponse } from "@jonbilous/next-js-rpc";
import Layout from "components/Layout";
import Navbar from "components/Navbar";
import type { GetStaticPaths, GetStaticProps, NextPage } from "next";
import NextImage from "next/image";
import { GetImage } from "pages/api/images/get";
import React from "react";
import db from "utils/db";
import { imageLoader, resolveImageUrl } from "utils/images";

interface ServerProps {
  image: InferResponse<GetImage>;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const images = await db.image.findMany({
    select: { uid: true },
  });

  const urls = images.map((img) => {
    return {
      params: {
        uid: img.uid,
      },
    };
  });

  return {
    fallback: "blocking",
    paths: urls,
  };
};

export const getStaticProps: GetStaticProps<ServerProps> = async (ctx) => {
  const uid = ctx.params?.uid;

  if (!uid || typeof uid !== "string") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const image = await db.image.findFirst({
    where: { uid },
    include: { event: true },
  });

  if (!image) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { image: { ...image, url: resolveImageUrl(image) } },
    revalidate: 259200,
  };
};

const Image: NextPage<ServerProps> = ({ image }) => {
  return (
    <Layout navbar={<Navbar title={image.event.location} />}>
      <Flex flex={1} position={"relative"} mt={4}>
        <NextImage
          objectFit="contain"
          layout="fill"
          loader={imageLoader}
          alt="image"
          src={image.url}
        />
      </Flex>
    </Layout>
  );
};

export default Image;
