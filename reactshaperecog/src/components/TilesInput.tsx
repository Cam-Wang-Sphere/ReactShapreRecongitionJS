import React, { useState } from "react";
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

import SvgArrow from "../assets/Icons/arrow.tsx";
import SvgStar from "../assets/Icons/star.tsx";
import SvgCircle from "../assets/Icons/circle.tsx";
import SvgLava from "../assets/Icons/lava.tsx";
import SvgVolcano from "../assets/Icons/volcano.tsx";
import SvgBow from "../assets/Icons/bow.tsx";

const Icons = [
  // <ArrowUpIcon boxSize={9} />,
  <SvgArrow />,
  <SvgStar />,
  <SvgCircle />,
  <SvgLava />,
  <SvgVolcano />,
  <SvgBow />,
];

const TilesInput = () => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
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
            onClick={() => setSelectedIndex(index)}
          >
            {Icon}
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
};

export default TilesInput;
