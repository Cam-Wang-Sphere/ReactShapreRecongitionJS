import React, { useState } from "react";
import { NetworkingManager } from "../networking/NetworkingManager.ts";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Message } from "../schema/wsschema/message";
import { WSPlayerData } from "../player/WSPlayerData";
import SvgSquareReticle from "../assets/Icons/SqaureReticle.tsx";
import SvgTriangleReticle from "../assets/Icons/TriangleReticle.tsx";
import SvgCircleReticle from "../assets/Icons/CircleReticle.tsx";
import SvgDiamondReticle from "../assets/Icons/DiamondReticle.tsx";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { EButtonTypeEnum } from "../schema/ebutton-type-enum.ts";

const colors = ["#FEE202", "#B5D034", "#0684EC", "#D6048C"];

interface ReticleGridButtonProps {
  inNetworkingManager: NetworkingManager | null;
  // inPlayerData: WSPlayerData | null;
}

const ReticleGridButton = ({ inNetworkingManager }: ReticleGridButtonProps) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [FeedbackIndex, setFeedbackIndex] = useState(-1);

  const [isIncreasing, setisIncreasing] = useState(false);
  const [isScoreChanged, setisScoreChanged] = useState(false);

  let prevScore = 0;
  let ScoreColor: string = "white";
  let getScoreDirection = (score: number) => {
    score > prevScore ? setisIncreasing(true) : setisIncreasing(false);
    prevScore = score;
  };
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  async function DelayAction() {
    await delay(200);
    setSelectedIndex(-1);
    await delay(800);
    setFeedbackIndex(-1);
  }

  const handleButtonClick = (index: number) => {
    setSelectedIndex(index);
    setFeedbackIndex(index);
    console.log("selected index = ", index);

    const correspondingButton: EButtonTypeEnum = index + 1;
    inNetworkingManager?.sendButtonTypeRequest(correspondingButton);

    DelayAction();
  };

  const Icons = [
    <SvgSquareReticle />,
    <SvgTriangleReticle />,
    <SvgCircleReticle />,
    <SvgDiamondReticle />,
  ];

  return (
    <Box mt="30%" h="36vh" w="80vw">
      <SimpleGrid
        columns={2}
        spacing={8}
        h="100%"
        w="100%"
        style={{
          position: "relative",
        }}
      >
        {Icons.map((Icon, index) => (
          <Box
            key={index}
            bg={
              FeedbackIndex === index
                ? isScoreChanged
                  ? isIncreasing
                    ? "green"
                    : "red"
                  : "#494949"
                : "#494949"
            }
            height="150px"
            borderWidth="2px"
            borderColor="#080808"
            borderRadius="md"
            as={motion.div}
            animate={{
              scale:
                selectedIndex === index ? (isScoreChanged ? 20 : 0.9) : 0.9,
              opacity: selectedIndex === index ? 1 : 0.5,
            }}
            transition="0.5s ease-out"
          ></Box>
        ))}
      </SimpleGrid>

      <SimpleGrid
        columns={2}
        spacing={8}
        h="100%"
        w="100%"
        mt="-100%"
        style={{
          position: "relative",
        }}
      >
        {Icons.map((Icon, index) => (
          <Box
            key={index}
            // bg={selectedIndex === index ? "teal" : "#494949"}
            // bg="#494949"
            bg={
              FeedbackIndex === index
                ? isScoreChanged
                  ? isIncreasing
                    ? "green"
                    : "red"
                  : "#494949"
                : "#494949"
            }
            height="150px"
            borderWidth="2px"
            borderColor="#080808"
            borderRadius="md"
            as={motion.div}
            whileTap={{ scale: 0.9 }}
            // transition="0.5s linear"
            animate={{
              scale: selectedIndex === index ? 0.9 : 1.0,
              // opacity: selectedIndex === index ? 0.7 : 1,
            }}
            // transition={{ transition: "0.5", ease: "linear" }}
            onClick={() => handleButtonClick(index)}
          >
            {Icon}
            {/* <Box
            as={motion.div}
            bg="pink"
            animate={{
              scale: FeedbackIndex === index ? 5 : 1.0,
              opacity: FeedbackIndex === index ? 0.8 : 0,
            }}
            transition="1s linear"
            h="100%"
            w="100%"
            mt="-100%"
            style={{
              position: "relative",
            }}
          ></Box> */}
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ReticleGridButton;
