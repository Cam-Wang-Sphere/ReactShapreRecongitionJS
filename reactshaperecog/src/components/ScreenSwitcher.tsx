import React, { useState, useEffect } from 'react';
import { NetworkingManager } from "./../networking/NetworkingManager";
import { Message } from '../schema/wsschema/message';
import { GlobalInputEnums } from '../schema/WSSchema';
import ConnectionScreen from './ConnectionScreen';
import DrawingWidget from './DrawingWidget';
import TilesInput from './TilesInput';
import TapnSlashInput from './TapnSlashInput';
import RadarView from "./RadarViewInput";
import { DollarRecognizer } from '../Template/Recognizer';

interface ScreenSwitcherProps
{
    inNetworkingManager: NetworkingManager | null;
    inSelectHandle: (index: number) => void;
    inConnectFunction: (address: string) => void;  // @TODO NATHAN: Rework...
    inSSSetDrawResult: (inResult: string) => void;  // @TODO NATHAN: Rework
    inSSDollarRecognizer: DollarRecognizer;
    inSelectedIndex: number;
}

const ScreenSwitcher = ({ inNetworkingManager, inSSSetDrawResult, inSelectHandle, inSelectedIndex, inConnectFunction, inSSDollarRecognizer }: ScreenSwitcherProps) =>
{
    // @TODO NATHAN: MAP PLEASE !
    const inputTypes = [
        <div></div>,
        <ConnectionScreen
          connectFunction={inConnectFunction}
          inConnectNetworkingManager={inNetworkingManager}
        />,
        <TapnSlashInput inNetworkingManager={inNetworkingManager} />,
        <DrawingWidget
          inNetworkingManager={inNetworkingManager}
          inRecognizer={inSSDollarRecognizer}
          inSetDrawResult={inSSSetDrawResult}
        />,
        <TilesInput inNetworkingManager={inNetworkingManager} />,  
        <RadarView inNetworkingManager={inNetworkingManager} />,
      ];

    useEffect(() =>
    {
        const handleGlobalInputResponse = (inGlobalInput: GlobalInputEnums) =>
        {
            inSelectHandle(inGlobalInput);
        };

        inNetworkingManager?.on(Message.GlobalInputResponse.toString(), handleGlobalInputResponse);



        // cleaning up
        return () =>
        {
            inNetworkingManager?.off(Message.GlobalInputResponse.toString(), handleGlobalInputResponse);
        };

    }, [inNetworkingManager]);

    return <div>{inputTypes[inSelectedIndex]}</div>;
}

export default ScreenSwitcher;
