import { Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { InferResponse } from "@jonbilous/next-js-rpc";
import ImageUploader from "components/ImageUploader";
import Layout from "components/Layout";
import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import React from "react";
import listEvents, { ListEvents } from "./api/events/list";

interface ServerProps {
  events: InferResponse<ListEvents>;
}

export const getServerSideProps: GetServerSideProps<ServerProps> = async (
  ctx
) => {
  const events = await listEvents.ssr(null, ctx);

  return { props: { events } };
};

const Home: NextPage<ServerProps> = ({ events }) => {
  return (
    <Layout>
      <Flex direction={"row"}>
        <Link passHref href={"/"}>
          <Heading as="a" mr="auto">
            NYC Photo Stroll
          </Heading>
        </Link>
      </Flex>

      <VStack mt={4} alignItems={"start"}>
        {events.map((event) => (
          <Link passHref key={event.id} href={`/event/${event.uid}`}>
            <VStack as={"a"} spacing={0} alignItems={"start"}>
              <Text fontSize="2xl" fontWeight={"bold"}>
                {event.location}
              </Text>
              <Text fontSize={"sm"}>{event.date.toLocaleString()}</Text>
            </VStack>
          </Link>
        ))}
      </VStack>
    </Layout>
  );
};

export default Home;
