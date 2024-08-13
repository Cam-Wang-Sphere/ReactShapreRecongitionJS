import React from "react";
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

const TilesInput = () => {
  return (
    <>
      <SimpleGrid columns={2} spacing={10} marginTop="10%">
        <Box as="button" bg="tomato" height="150px" borderRadius="md">
          <ArrowUpIcon boxSize={9} />
        </Box>
        <Box as="button" bg="tomato" height="150px" borderRadius="md">
          <ArrowBackIcon boxSize={9} />
        </Box>
        <Box as="button" bg="tomato" height="150px" borderRadius="md">
          <CloseIcon boxSize={6} />
        </Box>
        <Box as="button" bg="tomato" height="150px" borderRadius="md">
          <AddIcon boxSize={6} />
        </Box>
        <Box as="button" bg="tomato" height="150px" borderRadius="md">
          <CheckIcon boxSize={7} />
        </Box>
        <Box as="button" bg="tomato" height="150px" borderRadius="md">
          <MinusIcon boxSize={8} />
        </Box>
      </SimpleGrid>
    </>
  );
};

export default TilesInput;
