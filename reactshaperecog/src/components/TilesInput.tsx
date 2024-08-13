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

import SvgArrow from "../assets/Icons/arrow.tsx";
import SvgStar from "../assets/Icons/star.tsx";
import SvgCircle from "../assets/Icons/circle.tsx";
import SvgLava from "../assets/Icons/lava.tsx";
import SvgVolcano from "../assets/Icons/volcano.tsx";
import SvgBow from "../assets/Icons/bow.tsx";
import { useSpring, animated } from "react-spring";
import { Opacity } from "@mui/icons-material";
import { Fade } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

const Icons = [
  // <ArrowUpIcon boxSize={9} />,
  <SvgArrow />,
  <SvgStar />,
  <SvgCircle />,
  <SvgLava />,
  <SvgVolcano />,
  <SvgBow />,
];

interface TilesInputProps {
  inNetworkingManager: NetworkingManager;
}

const TilesInput = ({ inNetworkingManager }: TilesInputProps) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  async function DelayAction() {
    await delay(200);
    setSelectedIndex(-1);
  }

  const handleButtonClick = (index: number) => {
    setSelectedIndex(index);
    inNetworkingManager?.sendShapeRequest(selectedIndex);
    console.log("selected index = ", index);
    DelayAction();
  };

  const animate = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    // reset: false,
    // reverse: false,
    delay: 200,
    // config: { duration: 3000 },
  });

  return (
    <>
      <animated.div style={animate}>
        <SimpleGrid columns={2} spacing={10} mt="2%" pb="15%">
          {Icons.map((Icon, index) => (
            // <animated.div>

            <Box
              key={index}
              bg={selectedIndex === index ? "teal" : "white"}
              height="150px"
              borderRadius="md"
              onClick={() => handleButtonClick(index)}
            >
              {Icon}
            </Box>

            // </animated.div>
          ))}
        </SimpleGrid>
      </animated.div>
    </>
  );
};

export default TilesInput;
