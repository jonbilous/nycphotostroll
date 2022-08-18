import { Flex, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { InferResponse } from "@jonbilous/next-js-rpc";
import Layout from "components/Layout";
import Navbar from "components/Navbar";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import React from "react";
import listEvents, { ListEvents } from "./api/events/list";
import Image from "next/image";
import { imageLoader } from "utils/images";
import listImages, { ListImages } from "./api/images/list";
import { FaCamera, FaCameraRetro } from "react-icons/fa";

interface ServerProps {
  events: InferResponse<ListEvents>;
  images: InferResponse<ListImages>;
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async (
  ctx
) => {
  const [images, events] = await Promise.all([
    listImages.ssr(null, ctx),
    listEvents.ssr(null, ctx),
  ]);

  return { props: { events, images } };
};

const Home: NextPage<ServerProps> = ({ events, images }) => {
  return (
    <Layout navbar={<Navbar />}>
      <Heading size="lg">Our Photowalks</Heading>

      <VStack spacing={4} mt={4} alignItems={"start"}>
        {events.map((event) => (
          <Link passHref key={event.id} href={`/event/${event.uid}`}>
            <VStack as={"a"} spacing={0} alignItems={"start"}>
              <Text fontSize="lg" fontWeight={"bold"}>
                {event.location}
              </Text>
              <Text fontSize={"sm"}>{event.date.toLocaleDateString()}</Text>
            </VStack>
          </Link>
        ))}
      </VStack>

      <Heading mt={8} size="lg">
        Community Feed
      </Heading>

      <SimpleGrid columns={2} spacing={4} py={4}>
        {images.map((img) => (
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

export default Home;
