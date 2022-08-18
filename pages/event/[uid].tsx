import { useUser } from "@auth0/nextjs-auth0";
import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Flex,
  Heading,
  IconButton,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { InferResponse } from "@jonbilous/next-js-rpc";
import ImageUploader from "components/ImageUploader";
import Layout from "components/Layout";
import Navbar from "components/Navbar";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import getEvent, { GetEvent } from "pages/api/events/get";
import React from "react";
import { FaCameraRetro } from "react-icons/fa";
import { imageLoader } from "utils/images";

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
  const { user } = useUser();

  return (
    <Layout
      navbar={
        <Navbar title={event.location}>
          {user && <ImageUploader eventUid={event.uid} />}
        </Navbar>
      }
    >
      <SimpleGrid columns={2} spacing={4}>
        {event.images.map((img) => (
          <Link key={img.uid} href={`/image/${img.uid}`} passHref>
            <VStack spacing={1} as={"a"} alignItems={"stretch"}>
              <Image
                width={1500}
                height={1500}
                objectFit="cover"
                loader={imageLoader}
                alt="image"
                src={img.url}
              />
              <Flex alignItems={"center"} fontSize="xs">
                <FaCameraRetro size={10} />
                <Text ml={1} fontWeight={"light"}>
                  {img.user.name}
                </Text>
              </Flex>
            </VStack>
          </Link>
        ))}
      </SimpleGrid>
    </Layout>
  );
};

export default Event;
