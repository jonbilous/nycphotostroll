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
import React from "react";

interface ServerProps {
  event: InferResponse<GetEvent>;
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async (
  ctx
) => {
  const uid = String(ctx.params?.uid);

  const event = await getEvent.ssr({ uid }, ctx);

  return { props: { event } };
};

const Event: NextPage<ServerProps> = ({ event }) => {
  return (
    <Flex p={4} direction={"column"}>
      <Flex alignItems={"center"} direction={"row"}>
        <Link passHref href="/">
          <IconButton
            as="a"
            mr={4}
            aria-label="Back"
            icon={<ArrowBackIcon fontSize={"lg"} />}
          />
        </Link>
        <Heading mr="auto">{event.location}</Heading>
        <ImageUploader eventUid={event.uid} />
      </Flex>
      <SimpleGrid columns={2} spacing={4} py={4}>
        {event.images.map((img) => (
          <img key={img.uid} alt="image" src={img.url} />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default Event;
