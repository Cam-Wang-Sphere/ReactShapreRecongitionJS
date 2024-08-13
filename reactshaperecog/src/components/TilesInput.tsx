import React, { useState } from "react";
import { NetworkingManager } from "./../networking/NetworkingManager";
import {
  Flex,
  Grid,
  GridItem,
  Spacer,
  Box,
  HStack,
  Button,
  ButtonGroup,
  SimpleGrid,
  Center,
} from "@chakra-ui/react";

import {
  ArrowUpIcon,
  ArrowBackIcon,
  CloseIcon,
  AddIcon,
  CheckIcon,
  MinusIcon,
} from "@chakra-ui/icons";

const Icons = [
  <ArrowUpIcon boxSize={9} />,
  <ArrowBackIcon boxSize={9} />,
  <CloseIcon boxSize={6} />,
  <AddIcon boxSize={6} />,
  <CheckIcon boxSize={7} />,
  <MinusIcon boxSize={8} />,
];

interface TilesInputProps
{
    inNetworkingManager: NetworkingManager;
}

const TilesInput = ({ inNetworkingManager }: TilesInputProps) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleButtonClick = (index: number) =>
  {
    setSelectedIndex(index);
    inNetworkingManager?.sendShapeRequest(selectedIndex);
    console.log("selected index = ", index);
  }

  return (
    <>
      <SimpleGrid columns={2} spacing={10} mt="10%" pb="15%">
        {Icons.map((Icon, index) => (
          <Box
            key={index}
            as="button"
            bg={selectedIndex === index ? "red.500" : "white"}
            height="150px"
            borderRadius="md"
            onClick={() => handleButtonClick(index)}
          >
            {Icon}
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};

export default TilesInput;
