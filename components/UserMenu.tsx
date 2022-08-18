import { useUser } from "@auth0/nextjs-auth0";
import {
  Button,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuGroup,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

const UserMenu: React.FC = () => {
  const { user } = useUser();

  if (user) {
    return (
      <Menu>
        <MenuButton as={IconButton} icon={<Icon as={FaUserCircle} />} />
        <MenuList>
          <MenuItem>Settings</MenuItem>
          <MenuDivider />
          <MenuItem as="a" href="/api/auth/logout">
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }

  return (
    <Button
      as="a"
      href="/api/auth/login"
      aria-label="Log in"
      leftIcon={<Icon as={FaUserCircle} />}
    >
      Sign In
    </Button>
  );
};

export default UserMenu;
