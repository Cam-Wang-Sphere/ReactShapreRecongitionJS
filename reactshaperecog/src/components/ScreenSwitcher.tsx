import React, { useState, useEffect } from "react";
import { NetworkingManager } from "./../networking/NetworkingManager";
import { Message } from "../schema/wsschema/message";
import { GlobalInputEnums } from "../schema/WSSchema";
import ConnectionScreen from "./ConnectionScreen";
import DrawingWidget from "./DrawingWidget";
import TilesInput from "./TilesInput";
import TapnSlashInput from "./TapnSlashInput";
import TNS from "./TNSUpdated";
import RadarView from "./RadarViewInput";
import { DollarRecognizer } from "../Template/Recognizer";
import SuccessOverlay from "./../components/SuccessOverlay";
import ScoreWidget from "./../components/ScoreWidget";
import RandomPlayerDataWidget from "./../components/RandomPlayerDataWidget";
import { HStack } from "@chakra-ui/react";
import { WSPlayerData } from "../player/WSPlayerData";
import PointTapInput from "./PointTapInput";

interface ScreenSwitcherProps {
  inNetworkingManager: NetworkingManager | null;
  inSelectHandle: (index: number) => void;
  inConnectFunction: (address: string) => void; // @TODO NATHAN: Rework...
  inSSDollarRecognizer: DollarRecognizer;
  inSelectedIndex: number;
  inPlayerData: WSPlayerData | null;
}

const ScreenSwitcher = ({
  inNetworkingManager,
  inSelectHandle,
  inSelectedIndex,
  inConnectFunction,
  inSSDollarRecognizer,
  inPlayerData,
}: ScreenSwitcherProps) => {
  // @TODO NATHAN: MAP PLEASE !
  const inputTypes = [
    <div></div>,
    <ConnectionScreen
      connectFunction={inConnectFunction}
      inConnectNetworkingManager={inNetworkingManager}
    />,
    <TNS inNetworkingManager={inNetworkingManager} />,
    <DrawingWidget
      inNetworkingManager={inNetworkingManager}
      inRecognizer={inSSDollarRecognizer}
    />,
    <TilesInput inNetworkingManager={inNetworkingManager} />,
    <RadarView inNetworkingManager={inNetworkingManager} />,
    <PointTapInput inNetworkingManager={inNetworkingManager} />,
  ];

  useEffect(() => {
    const handleGlobalInputResponse = (inGlobalInput: GlobalInputEnums) => {
      inSelectHandle(inGlobalInput);
    };

    inNetworkingManager?.on(
      Message.GlobalInputResponse.toString(),
      handleGlobalInputResponse
    );

    // cleaning up
    return () => {
      inNetworkingManager?.off(
        Message.GlobalInputResponse.toString(),
        handleGlobalInputResponse
      );
    };
  }, [inNetworkingManager]);

  return (
    <div>
      <HStack justifyContent="space-evenly">
        <ScoreWidget
          inNetworkingManager={inNetworkingManager}
          inPlayerData={inPlayerData}
        />
      </HStack>
      {inputTypes[inSelectedIndex]}
    </div>
  );
};

export default ScreenSwitcher;
