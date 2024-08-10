import React, { useState, useEffect } from 'react';
import { NetworkingManager } from "./../networking/NetworkingManager";
import { Message } from '../schema/dot-dschema/message';

interface SuccessOverlayProps
{
    inNetworkingManager: NetworkingManager;
}

const SuccessOverlay = ({ inNetworkingManager }) =>
{
    const [isVisible, setIsVisible] = useState(false);

    // @TODO NATHAN: cvar?
    const flashBangTime = 200; // in milliseconds

    useEffect(() =>
    {
        const handleEvent = (inScore: number) =>
        {
            if (inScore < 0)
            {
                return;
            }

            setIsVisible(true);
            setTimeout(() =>
            {
                setIsVisible(false);
            }, flashBangTime);
        };

        inNetworkingManager?.on(Message.ScoreUpdateResponse.toString(), handleEvent)

        // cleaning up
        return () =>
        {
            inNetworkingManager?.off(Message.ScoreUpdateResponse.toString(), handleEvent);
        };
    }, [inNetworkingManager]);


    const greenScreenStyle = 
    {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 128, 0, 0.6)',  // last parameter is translucency
        display: isVisible ? 'block' : 'none',
        zIndex: 9999,
    } as const;

    return <div style={greenScreenStyle}></div>;
}

export default SuccessOverlay;
