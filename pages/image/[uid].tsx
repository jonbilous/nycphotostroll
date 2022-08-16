import { ArrowBackIcon } from "@chakra-ui/icons";
import { Flex, Heading, IconButton } from "@chakra-ui/react";
import { InferResponse } from "@jonbilous/next-js-rpc";
import Layout from "components/Layout";
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
    <Layout>
      <Flex alignItems={"center"} direction={"row"}>
        <Link passHref href={`/event/${image.event.uid}`}>
          <IconButton
            as="a"
            mr={4}
            aria-label="Back"
            icon={<ArrowBackIcon fontSize={"lg"} />}
          />
        </Link>
        <Heading mr="auto">{"A Very Pretty Photo"}</Heading>
      </Flex>
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