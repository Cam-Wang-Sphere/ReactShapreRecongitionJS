import React, { useState } from "react";
import { NetworkingManager } from "../networking/NetworkingManager.ts";
import { Box, SimpleGrid } from "@chakra-ui/react";

import SvgSquareReticle from "../assets/Icons/SqaureReticle.tsx";
import SvgTriangleReticle from "../assets/Icons/TriangleReticle.tsx";
import SvgCircleReticle from "../assets/Icons/CircleReticle.tsx";
import SvgDiamondReticle from "../assets/Icons/DiamondReticle.tsx";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const Icons = [
  <SvgSquareReticle />,
  <SvgTriangleReticle />,
  <SvgCircleReticle />,
  <SvgDiamondReticle />,
];

const colors = [];

interface ReticleGridButtonProps {
  inNetworkingManager: NetworkingManager | null;
}

const ReticleGridButton = ({ inNetworkingManager }: ReticleGridButtonProps) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  async function DelayAction() {
    await delay(200);
    setSelectedIndex(-1);
  }

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
    <SimpleGrid columns={2} spacing={8} mt="50%">
      {Icons.map((Icon, index) => (
        <Box
          key={index}
          bg={selectedIndex === index ? "teal" : "white"}
          height="150px"
          borderRadius="md"
          as={motion.div}
          whileTap={{ scale: 0.9 }}
          // transition="0.5s linear"
          transition={{ transition: "0.5", ease: "linear" }}
          onClick={() => handleButtonClick(index)}
        >
          {Icon}
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default ReticleGridButton;
