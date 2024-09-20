import React, { useState, useEffect } from "react";
import { NetworkingManager } from "./../networking/NetworkingManager";
import { Message } from "../schema/wsschema/message";

import SuccessSound from "../assets/sounds/SuccessSound.wav";
import FailSound from "../assets/sounds/IncorrectSound.wav";
import { WSPlayerData } from "../player/WSPlayerData";
import { isIOS } from 'react-device-detect'

interface SuccessOverlayProps {
  inPlayerData: WSPlayerData | null;
}

const SuccessOverlay = ({ inPlayerData }: SuccessOverlayProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [oldScore, setOldScore] = useState(0);

  // @TODO NATHAN: cvar?
  const flashBangTime = 200; // in milliseconds
  const hapticTime = 100; // in milliseconds
  const shouldPlaySounds = true;

  useEffect(() => {
    const handleEvent = (newScore: number) => 
    {
      // note the react state set schedules a variable update so newScore would be stale until next render..
      setOldScore(newScore);

      // playing fail sound if you didn't get a score
      if (newScore < oldScore) 
      {
        if (!isIOS && shouldPlaySounds) 
        {
          const failAudio = new Audio(FailSound);
          failAudio.play();
        }
        return;
      }

      // don't play anything if no change happened
      if (newScore == oldScore) return;

      // playing haptics if possible
      if (!isIOS && navigator.vibrate) 
      {
        navigator.vibrate(hapticTime);
      }

      // play sounds if possible
      if (!isIOS && shouldPlaySounds) {
        const successAudio = new Audio(SuccessSound);
        successAudio.play();
      }

      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
      }, flashBangTime);
    };

    console.log('in success use effect');

    if (inPlayerData)
    {
      handleEvent(inPlayerData.getScore());
    }


  }, [inPlayerData ? inPlayerData.getScore() : 0.0]);

  const greenScreenStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    border: "1.5rem solid",
    borderColor: "green",
    backgroundColor: "rgba(0, 128, 0, 0)", // last parameter is translucency
    display: isVisible ? "block" : "none",
    zIndex: 9999,
    pointerEvents: "none",
  } as const;

  return <div data-testid="success-overlay" style={greenScreenStyle}></div>;
};

export default SuccessOverlay;
