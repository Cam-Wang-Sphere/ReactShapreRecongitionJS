import React, { useState, useEffect } from "react";
import { NetworkingManager } from "./../networking/NetworkingManager";
import { Message } from "../schema/wsschema/message";
import { EWSGlobalInputTypes } from "../schema/ewsglobal-input-types";
import ConnectionScreen from "./ConnectionScreen";
import DrawingWidget from "./DrawingWidget";
import SlashDrawingWidget from "./SlashDrawingWidget";
import TilesInput from "./TilesInput";
import ReticleGridButton from "./ReticleGridButton";
import CardinalButtons from "./CardinalButtons";
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
import AddTemplateWidget from "./AddTemplate";
import { TemplateManager } from "../Template/TemplateManager";

interface ScreenSwitcherProps {
  inNetworkingManager: NetworkingManager | null;
  inSelectHandle: (index: number) => void;
  inConnectFunction: (address: string) => void; // @TODO NATHAN: Rework...
  inSSDollarRecognizer: DollarRecognizer;
  inTemplateManager: TemplateManager;
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
  inTemplateManager,
}: ScreenSwitcherProps) => {
  const AddTemplate = (TemplateName: string) => {
    inTemplateManager.SaveTemplate(TemplateName);
  };

  // @TODO NATHAN: MAP PLEASE !
  const inputTypes = [
    <AddTemplateWidget AddTemplateFunction={AddTemplate} />,
    <ConnectionScreen
      connectFunction={inConnectFunction}
      inConnectNetworkingManager={inNetworkingManager}
    />,
    <TNS inNetworkingManager={inNetworkingManager} />,
    <DrawingWidget
      inNetworkingManager={inNetworkingManager}
      inRecognizer={inSSDollarRecognizer}
    />,
    <ReticleGridButton inNetworkingManager={inNetworkingManager} />,
    <CardinalButtons inNetworkingManager={inNetworkingManager} />,
    <RadarView inNetworkingManager={inNetworkingManager} />,
    <PointTapInput inNetworkingManager={inNetworkingManager} />,
    <SlashDrawingWidget inNetworkingManager={inNetworkingManager} />,
  ];

  useEffect(() => {
    const handleGlobalInputResponse = (inGlobalInput: EWSGlobalInputTypes) => {
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
      <HStack
        justifyContent="space-evenly"
        alignItems="top"
        h="100px"
        mt="-10%"
      >
        {inSelectedIndex != 2 && (
          <ScoreWidget
            inNetworkingManager={inNetworkingManager}
            inPlayerData={inPlayerData}
          />
        )}
      </HStack>
      {inputTypes[inSelectedIndex]}
    </div>
  );
};

export default ScreenSwitcher;
