import React, { useState, useEffect } from 'react';
import { NetworkingManager } from "../networking/NetworkingManager";
import { GridItem } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { Button, HStack, Text } from "@chakra-ui/react";
import { isIOS } from 'react-device-detect'

interface PointTapInputProps
{
    inNetworkingManager: NetworkingManager | null;
}

interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
    requestPermission?: () => Promise<'granted' | 'denied'>;
  }

const PointTapInput = ({ inNetworkingManager }: PointTapInputProps) => {

    const [orientation, setOrientation] = useState({ yaw: 0, pitch: 0, roll: 0});
    const [hasStarted, setHasStarted] = useState(false);

    const handleOrientationEvent = (event: any) => 
    {
        setOrientation({
            yaw: event.alpha ? event.alpha.toFixed(2) : 0,
            pitch: event.beta ? event.beta.toFixed(2) : 0,
            roll: event.gamma ? event.gamma.toFixed(2) : 0,
        });
        inNetworkingManager?.sendPointTapRequest(event.beta, event.gamma);
    };

    const startRecording = () => 
    {
        if (!hasStarted) 
        {
            window.addEventListener('deviceorientation', handleOrientationEvent);
            setHasStarted(true);
        };
    };

    const textColor = {
        color: 'white'
    };

    useEffect(() => {

        if (!isIOS)
        {
            startRecording();
        }

        return () => {
            window.removeEventListener('deviceorientation', handleOrientationEvent);
        };
    }, []);

    return (
        <div>
            <div>
                <Box textAlign="center">
                    <Button colorScheme="teal" w={"200px"} bg={"#24a0ed"} onClick={inNetworkingManager?.sendPointTapResetRequest}>Reset Pointer</Button>
                </Box>
                <Box>
                    <Text textAlign="center" color="white">
                        Pitch: {orientation.pitch} Yaw: {orientation.yaw}  Roll: {orientation.roll} 
                    </Text>
                </Box>
            </div>
        </div>
    )
}

export default PointTapInput;
