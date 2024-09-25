import React, { useState, useEffect } from "react";
import { NetworkingManager } from "./../networking/NetworkingManager";
import { FTIMMappedArea } from "../TIM/TIMMappedArea";
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

let Framecolor = { r: 173, g: 179, b: 175 }; // color for the frame

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
    <TNS inNetworkingManager={inNetworkingManager} frameColor={Framecolor} />,
    <DrawingWidget
      inNetworkingManager={inNetworkingManager}
      inRecognizer={inSSDollarRecognizer}
    />,
    <ReticleGridButton inNetworkingManager={inNetworkingManager} />,
    <CardinalButtons inNetworkingManager={inNetworkingManager} />,
    <RadarView
      inNetworkingManager={inNetworkingManager}
      frameColor={Framecolor}
    />,
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

    //assign color of the frame
    const handleTIMMappedAreaAdd = (inTIMMappedArea: FTIMMappedArea): void => {
      Framecolor.r = inTIMMappedArea.color.r() * 255;
      Framecolor.g = inTIMMappedArea.color.g() * 255;
      Framecolor.b = inTIMMappedArea.color.b() * 255;
    };

    inNetworkingManager?.on(
      Message.TIMMappedAreaAdd.toString(),
      handleTIMMappedAreaAdd
    );

    // @TODO NATHAN: fix to resolve screen switch order dependencies
    // if (inPlayerData)
    // {
    //   handleGlobalInputResponse(inPlayerData.getCurrentInput());
    // }

    // cleaning up
    return () => {
      inNetworkingManager?.off(
        Message.GlobalInputResponse.toString(),
        handleGlobalInputResponse
      );

      inNetworkingManager?.off(
        Message.TIMMappedAreaAdd.toString(),
        handleTIMMappedAreaAdd
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
        {inSelectedIndex != 2 &&
          inSelectedIndex != 1 &&
          inSelectedIndex != 6 && (
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
