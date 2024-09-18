import React, { useState } from "react";
import { NetworkingManager } from "../networking/NetworkingManager.ts";
import { Box, SimpleGrid, keyframes } from "@chakra-ui/react";
import { motion } from "framer-motion";
import SvgSquareReticle from "../assets/Icons/SqaureReticle.tsx";
import SvgTriangleReticle from "../assets/Icons/TriangleReticle.tsx";
import SvgCircleReticle from "../assets/Icons/CircleReticle.tsx";
import SvgDiamondReticle from "../assets/Icons/DiamondReticle.tsx";
import { useEffect, useRef } from "react";

const Icons = [
  <SvgSquareReticle />,
  <SvgTriangleReticle />,
  <SvgCircleReticle />,
  <SvgDiamondReticle />,
];

interface CardinalButtonsProps {
  inNetworkingManager: NetworkingManager | null;
}

const CardinalButtons = ({ inNetworkingManager }: CardinalButtonsProps) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  async function DelayAction() {
    await delay(200);
    setSelectedIndex(-1);
  }

  // const spin = keyframes`
  //   from {transform:  scale(1.1) rotate(45deg); }
  //   to {transform:  scale(1.1) rotate(45deg); }
  // `;
  // const spinAnimation = `${spin} infinite 1s linear`;

  const handleButtonClick = (index: number) => {
    setSelectedIndex(index);
    inNetworkingManager?.sendShapeRequest(index);
    console.log("selected index = ", index);
    DelayAction();
  };

  // react method for sending index...
  useEffect(() => {
    return () => {
      inNetworkingManager?.sendShapeRequest(selectedIndex);
    };
  }, []);

  return (
    <SimpleGrid
      as={motion.div}
      columns={2}
      spacing={5}
      // animation={spinAnimation}
      animate={{ rotate: 45, scale: 1.1 }}
      m="50px"
      mt="50%"
    >
      {Icons.map((Icon, index) => (
        <Box
          key={index}
          // bg={selectedIndex === index ? "teal" : "white"}
          bgGradient="linear(to-l, #7928CA, #FF0080)"
          height="120px"
          width="120px"
          as={motion.div}
          initial={false}
          animate={{
            rotate: -45,
            scale: selectedIndex === index ? 0.9 : 1.0,
            opacity: selectedIndex === index ? 0.2 : 1,
          }}
          borderRadius="120px"
          onClick={() => handleButtonClick(index)}
        >
          {Icon}
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default CardinalButtons;
