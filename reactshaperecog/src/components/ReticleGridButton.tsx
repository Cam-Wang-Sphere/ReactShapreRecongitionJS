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

const Icons = [
  <SvgSquareReticle />,
  <SvgTriangleReticle />,
  <SvgCircleReticle />,
  <SvgDiamondReticle />,
];

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
    await delay(200);
    setFeedbackIndex(-1);
  }

  const handleButtonClick = (index: number) => {
    setSelectedIndex(index);
    console.log("selected index = ", index);

    const correspondingButton: EButtonTypeEnum = index + 1;
    inNetworkingManager?.sendButtonTypeRequest(correspondingButton);

    DelayAction();
  };

  // react method for sending index...
  useEffect(() => {
    const handleScoreEvent = (inScore: number) => {
      setisScoreChanged(true);
      getScoreDirection(inScore);
      // console.log(isIncreasing);
      DelayAction();
    };

    inNetworkingManager?.on(
      Message.PlayerScoreResponse.toString(),
      handleScoreEvent
    );

    return () => {
      inNetworkingManager?.sendButtonTypeRequest(selectedIndex);
      inNetworkingManager?.off(
        Message.PlayerScoreResponse.toString(),
        handleScoreEvent
      );
    };
  }, []);

  return (
    <SimpleGrid columns={2} spacing={8} mt="30%">
      {Icons.map((Icon, index) => (
        <Box
          key={index}
          // bg={selectedIndex === index ? "teal" : "#494949"}
          // bg="#494949"
          bg={
            selectedIndex === index
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
          // boxShadow="inner"
          as={motion.div}
          whileTap={{ scale: 0.9 }}
          // transition="0.5s linear"
          animate={{
            scale: selectedIndex === index ? 0.9 : 1.0,
            opacity: selectedIndex === index ? 0 : 1,
          }}
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
