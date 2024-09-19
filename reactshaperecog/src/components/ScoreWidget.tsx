import React, { useState, useEffect } from "react";
import { NetworkingManager } from "./../networking/NetworkingManager";
import { Message } from "../schema/wsschema/message";
import { WSPlayerData } from "../player/WSPlayerData";
import SuccessOverlay from "./SuccessOverlay";
import { FTIMHitEvent } from "../TIM/TIMHitEvent";
import { Text, Box, VStack } from "@chakra-ui/react";

interface ScoreWidgetProps {
  inNetworkingManager: NetworkingManager | null;
  inPlayerData: WSPlayerData | null;
}

const ScoreWidget = ({
  inNetworkingManager,
  inPlayerData,
}: ScoreWidgetProps) => {
  const [score, setScore] = useState(0);
  const [isIncreasing, setisIncreasing] = useState(false);
  const [isScoreChanged, setisScoreChanged] = useState(false);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));
  async function DelayAction() {
    await delay(300);
    setisScoreChanged(false);
  }

  let prevScore = 0;
  let ScoreColor: string = "white";
  let getScoreDirection = (score: number) => {
    score > prevScore ? setisIncreasing(true) : setisIncreasing(false);
    prevScore = score;
  };

  useEffect(() => {
    // console.log("in score widget use effect");
    const handleScoreEvent = (inScore: number) => {
      //   console.log("setting score here...");
      setScore(inScore);
      inPlayerData?.setScore(inScore);
      setisScoreChanged(true);
      getScoreDirection(inScore);
      DelayAction();
    };

    const handleTIMScoreEvent = (inTIMHitEvent: FTIMHitEvent) => {
      const scoreDelta: number = inTIMHitEvent.scoreDelta;
      setScore((prevScore) => prevScore + scoreDelta);
      inPlayerData?.setScore(inPlayerData?.getScore() + scoreDelta);
      setisScoreChanged(true);
      getScoreDirection(prevScore + scoreDelta);
      DelayAction();
    };

    inNetworkingManager?.on(
      Message.PlayerScoreResponse.toString(),
      handleScoreEvent
    );
    inNetworkingManager?.on(
      Message.TIMHitEvent.toString(),
      handleTIMScoreEvent
    );

    // cleaning up
    return () => {
      inNetworkingManager?.off(
        Message.PlayerScoreResponse.toString(),
        handleScoreEvent
      );
      inNetworkingManager?.off(
        Message.TIMHitEvent.toString(),
        handleTIMScoreEvent
      );
    };
  }, [inNetworkingManager]);

  return (
    <div>
      {/* <SuccessOverlay inPlayerData={inPlayerData} /> */}
      <VStack justifyContent="center" gap="-5px">
        <Text fontSize="lg" color="#868686">
          Score:
        </Text>
        <Text
          as="b"
          mt={isScoreChanged ? "-10px" : "0"}
          fontSize={isScoreChanged ? "5xl" : "2xl"}
          color={isScoreChanged ? (isIncreasing ? "green" : "red") : "white"}
        >
          {score}
        </Text>
      </VStack>
      {/* <Text className="resultText">Score = {score}</Text> */}
    </div>
  );
};

export default ScoreWidget;
