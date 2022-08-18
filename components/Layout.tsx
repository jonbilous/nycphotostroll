import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

const Layout: React.FC<{ children: ReactNode; navbar: ReactNode }> = ({
  children,
  navbar,
}) => {
  return (
    <Flex overflowY="hidden" h="100vh" flex={1} direction={"column"}>
      {navbar}
      <Flex overflowY="auto" flex={1} p={4} direction={"column"}>
        {children}
      </Flex>
    </Flex>
  );
};

export default Layout;
