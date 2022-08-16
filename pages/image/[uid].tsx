import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Flex,
  GridItem,
  Heading,
  IconButton,
  SimpleGrid,
} from "@chakra-ui/react";
import { InferResponse } from "@jonbilous/next-js-rpc";
import ImageUploader from "components/ImageUploader";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import getEvent, { GetEvent } from "pages/api/events/get";
import getImage, { GetImage } from "pages/api/images/get";
import React from "react";

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
    <Flex p={4} direction={"column"}>
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

      <Flex mt={4}>
        <img src={image.url} />
      </Flex>
    </Flex>
  );
};

export default Image;
