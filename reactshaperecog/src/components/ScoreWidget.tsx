import React, { useState, useEffect } from 'react';
import { NetworkingManager } from "./../networking/NetworkingManager";
import { Message } from '../schema/wsschema/message';
import { WSPlayerData } from '../player/WSPlayerData';
import SuccessOverlay from './SuccessOverlay';

interface ScoreWidgetProps
{
    inNetworkingManager: NetworkingManager | null;
    inPlayerData: WSPlayerData | null;
}

const ScoreWidget = ({ inNetworkingManager, inPlayerData }: ScoreWidgetProps) =>
{
    const [score, setScore] = useState(0);

    useEffect(() =>
    {
        console.log('in score widget use effect');
        const handleScoreEvent = (inScore: number) =>
        {
            console.log('setting score here...');
            setScore(inScore);
            inPlayerData?.setScore(inScore);
        };

        inNetworkingManager?.on(Message.PlayerScoreResponse.toString(), handleScoreEvent);

        // cleaning up
        return () =>
        {
            inNetworkingManager?.off(Message.PlayerScoreResponse.toString(), handleScoreEvent);
        };
    }, [inNetworkingManager]);

    return (
        <div>
            <SuccessOverlay inPlayerData={inPlayerData} />
            <span className="resultText">Score = {score}</span>
        </div>
    );
}

export default ScoreWidget;
