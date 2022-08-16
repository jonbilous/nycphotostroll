import { Flex } from "@chakra-ui/react";
import { ReactNode } from "react";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <Flex h="100vh" flex={1} p={4} direction={"column"}>
      {children}
    </Flex>
  );
};

export default Layout;
