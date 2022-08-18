import { ArrowBackIcon } from "@chakra-ui/icons";
import { Flex, Heading, IconButton } from "@chakra-ui/react";
import { InferResponse } from "@jonbilous/next-js-rpc";
import Layout from "components/Layout";
import Navbar from "components/Navbar";
import type { GetServerSideProps, NextPage } from "next";
import NextImage from "next/image";
import Link from "next/link";
import getImage, { GetImage } from "pages/api/images/get";
import React from "react";
import { imageLoader } from "utils/images";

interface ServerProps {
  image: InferResponse<GetImage>;
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async (
  ctx
) => {
  const uid = String(ctx.params?.uid);

  const image = await getImage.ssr({ uid }, ctx);

  return { props: { image } };
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
