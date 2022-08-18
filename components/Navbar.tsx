import { ArrowBackIcon } from "@chakra-ui/icons";
import { Flex, Heading, IconButton } from "@chakra-ui/react";
import Link from "next/link";
import { ReactNode } from "react";
import UserMenu from "./UserMenu";

const Navbar: React.FC<{ children?: ReactNode; title?: string }> = ({
  children,
  title,
}) => {
  return (
    <Flex
      py={2}
      px={4}
      borderBottom={"1px"}
      borderBottomColor="gray.200"
      shadow={"sm"}
      direction={"row"}
      alignItems="center"
    >
      {title && (
        <Link passHref href="/">
          <IconButton
            as="a"
            mr={4}
            aria-label="Back"
            icon={<ArrowBackIcon />}
          />
        </Link>
      )}

      {title ? (
        <Heading mr="auto">{title}</Heading>
      ) : (
        <Link passHref href={"/"}>
          <Heading as="a" mr="auto">
            {title ?? "NYC Photo Stroll"}
          </Heading>
        </Link>
      )}

      {children && <Flex mr={2}>{children}</Flex>}

      <UserMenu />
    </Flex>
  );
};

export default Navbar;
