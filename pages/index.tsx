import { Flex, GridItem, Heading, SimpleGrid } from "@chakra-ui/react";
import { InferResponse } from "@jonbilous/next-js-rpc";
import ImageUploader from "components/ImageUploader";
import type { GetServerSideProps, NextPage } from "next";
import React from "react";
import getImages, { GetImages } from "./api/images/get";

interface ServerProps {
  images: InferResponse<GetImages>;
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async (
  ctx
) => {
  const images = await getImages.ssr(null, ctx);

  return { props: { images } };
};

const Home: NextPage<ServerProps> = ({ images }) => {
  return (
    <Flex p={4} direction={"column"}>
      <Flex direction={"row"}>
        <Heading mr="auto">NYC Photo Stroll</Heading>
        <ImageUploader />
      </Flex>
      <SimpleGrid columns={2} spacing={4} py={4}>
        {images.map((img) => (
          <img key={img.uid} alt="image" src={img.url} />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default Home;
