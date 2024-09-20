import React, { useState, useEffect } from "react";
import { WSPlayerData } from "../player/WSPlayerData";
import { NetworkingManager } from "../networking/NetworkingManager";
import { Message } from "../schema/WSSchema";
import { EWSPhaseEnums } from "../schema/ewsphase-enums";
import { EWSGlobalInputTypes } from "../schema/ewsglobal-input-types";

interface GameStateProps {
  inPlayerData: WSPlayerData | null;
  inNetworkingManager: NetworkingManager | null;
}

// alternatively this could be a clas that extends react component but this just looks nicer IMO...
const GameState = ({ inPlayerData, inNetworkingManager }: GameStateProps) => 
{
  useEffect(() =>
    {
        // handlers
        const handleLoginResponse = (inSessionId: number) =>  // note this one will probably fail, but thats expected.
        {
          inPlayerData?.setSessionId(inSessionId);
          console.log('set the players sessionId to = ', inSessionId, ' in the gamestate handler');
        }
        const handlePhaseResponse = (inPhase: EWSPhaseEnums) =>
        {
          inPlayerData?.setCurrentPhase(inPhase);
          console.log('set the players current phase to = ', inPhase, ' in the gamestate handler');
        }
        const handleGlobalInputResponse = (inGlobalInput: EWSGlobalInputTypes) =>
        {
          inPlayerData?.setCurrentInput(inGlobalInput);
          console.log('set the players current input to = ', inGlobalInput, ' in the gamestate handler');
        }

        // bindings
        inNetworkingManager?.on(Message.ClientLoginResponse.toString(), handleLoginResponse);
        inNetworkingManager?.on(Message.PhaseResponse.toString(), handlePhaseResponse);
        // inNetworkingManager?.on(Message.GlobalInputResponse.toString(), handleGlobalInputResponse);
        // inNetworkingManager?.on(...) continue here...

        // cleaning up
        return () =>
        {
            inNetworkingManager?.off(Message.ClientLoginResponse.toString(), handleLoginResponse);
            inNetworkingManager?.off(Message.PhaseResponse.toString(), handlePhaseResponse);
            // inNetworkingManager?.off(Message.GlobalInputResponse.toString(), handleGlobalInputResponse);
            // inNetworkingManager?.off(...) continue here...
        };
    }, [inNetworkingManager]);

  return <div></div>;
};

export default GameState;
