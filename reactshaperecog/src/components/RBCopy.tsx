import React, { useState } from "react";
import { NetworkingManager } from "../networking/NetworkingManager.ts";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { Message } from "../schema/wsschema/message.ts";
import { WSPlayerData } from "../player/WSPlayerData.ts";
import SvgSquareReticle from "../assets/Icons/SqaureReticle.tsx";
import SvgTriangleReticle from "../assets/Icons/TriangleReticle.tsx";
import SvgCircleReticle from "../assets/Icons/CircleReticle.tsx";
import SvgDiamondReticle from "../assets/Icons/DiamondReticle.tsx";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

import { EButtonTypeEnum } from "../schema/ebutton-type-enum.ts";

const colors = ["#FEE202", "#B5D034", "#0684EC", "#D6048C"];
const Icons = [
  <SvgSquareReticle />,
  <SvgTriangleReticle />,
  <SvgCircleReticle />,
  <SvgDiamondReticle />,
];

interface ReticleGridButtonProps {
  inNetworkingManager: NetworkingManager | null;
}
let prevScore = 0;
let tileScale = 0.8;
let ScoreColor: string = "#494949";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const ReticleGridButton = ({ inNetworkingManager }: ReticleGridButtonProps) => {
  const [selectedIndex, setSelectedIndex] = useState(-1);
  // const [FeedbackIndex, setFeedbackIndex] = useState(-1);

  const [isSuccessful, setisSuccessful] = useState(false);
  // const [isScoreChanged, setisScoreChanged] = useState(false);
  const [cooldownExpired, setcooldownExpired] = useState(true);

  let getScoreColor = (condition: boolean) => {
    condition ? (ScoreColor = "green") : (ScoreColor = "red");
  };

  //reset delay for successful condition
  async function expandTilewithDelay(ms: number) {
    await delay(ms);
    tileScale = 20;
  }

  //reset delay for successful condition
  async function successResetDelay(ms: number) {
    await delay(ms);
    setSelectedIndex(-1);
    console.log("success delay");
  }

  //reset delay for successful condition
  async function failResetDelay(ms: number) {
    await delay(ms);
    setSelectedIndex(-1);
    console.log("fail delay");
  }

  //delay for cooldown time
  async function startCooldown(ms: number) {
    await delay(ms);
    console.log("cooldown timer");
  }

  const handleButtonClick = (index: number) => {
    if (cooldownExpired) {
      setSelectedIndex(index);
      console.log("selected index = ", index);

      const correspondingButton: EButtonTypeEnum = index + 1;
      inNetworkingManager?.sendButtonTypeRequest(correspondingButton);
      successResetDelay(500);
    }
  };

  // react method for sending index...
  useEffect(() => {
    let getScoreDirection = (score: number) => {
      // score > prevScore ? setisSuccessful(true) : setisSuccessful(false);
      score > prevScore ? (ScoreColor = "green") : (ScoreColor = "red");
      prevScore = score;
    };
    const handleScoreEvent = (inScore: number) => {
      getScoreDirection(inScore);
      // console.log("score dir is:" + isSuccessful);
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
            bg={ScoreColor}
            // bg={
            //   FeedbackIndex === index
            //     ? isScoreChanged
            //       ? isSuccessful
            //         ? "green"
            //         : "red"
            //       : "#494949"
            //     : "#494949"
            // }
            height="150px"
            borderWidth="2px"
            borderColor="#080808"
            borderRadius="md"
            as={motion.div}
            animate={{
              scale: selectedIndex === index ? 20 : 0.8,
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
            bg="#494949"
            // bg={
            //   FeedbackIndex === index
            //     ? isScoreChanged
            //       ? isSuccessful
            //         ? "green"
            //         : "red"
            //       : "#494949"
            //     : "#494949"
            // }
            height="150px"
            borderWidth="2px"
            borderColor="#080808"
            borderRadius="md"
            as={motion.div}
            animate={{
              scale: selectedIndex === index ? 0.9 : 1.0,
            }}
            onClick={() => handleButtonClick(index)}
          >
            {Icon}
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ReticleGridButton;
