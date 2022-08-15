import Layout from "components/Layout";
import type { GetStaticProps, NextPage } from "next";
import React from "react";

export const getStaticProps: GetStaticProps = async (ctx) => {
  return { props: {} };
};

const Home: NextPage = ({}) => {
  return <Layout title="Home">Hello and Welcome!</Layout>;
};

export default Home;
