import React, { useState, useEffect, useRef } from "react";

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
  MenuButton,
  IconButton,
  HStack,
  ButtonGroup,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { grey } from "@mui/material/colors";

interface Props {
  Names: string[];
  onSelect: (index: number) => void;
}

function NavMenu({ Names, onSelect }: Props) {
  const [selectIndex, setSelectedIndex] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Button
        as={IconButton}
        icon={<HamburgerIcon />}
        variant="outline"
        onClick={onOpen}
        color={"teal"}
        bg={"black"}
        borderColor={"teal"}
        data-testid="hamburger-button"
      ></Button>
      <Drawer placement="left" isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={"#333"} color={"#fff"}>
          <DrawerCloseButton data-testid="drawer-close-button"/>
          <DrawerHeader data-testid="drawer-header">Navigate to</DrawerHeader>

          <DrawerBody>
            <VStack spacing={1.5}>
              {Names.map((Name, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    onSelect(index);
                    setSelectedIndex(index);
                  }}
                  _hover={{ bg: "teal" }}
                  _active={{
                    bg: "teal",
                  }}
                  bg={"#444"}
                  w={"100%"}
                  color="#fff"
                  isActive={selectIndex === index}
                >
                  {Name}
                </Button>
              ))}
            </VStack>
          </DrawerBody>

          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default NavMenu;
