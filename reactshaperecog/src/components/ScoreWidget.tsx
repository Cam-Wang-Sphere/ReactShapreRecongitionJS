import React, { useState, useEffect } from 'react';
import { NetworkingManager } from "./../networking/NetworkingManager";
import { Message } from '../schema/wsschema/message';

interface ScoreWidgetProps
{
    inNetworkingManager: NetworkingManager | null;
}

const ScoreWidget = ({ inNetworkingManager }: ScoreWidgetProps) =>
{
    const [score, setScore] = useState(0);

    useEffect(() =>
    {
        const handleScoreEvent = (inScore: number) =>
        {
            setScore(inScore);
        };

        inNetworkingManager?.on(Message.PlayerScoreResponse.toString(), handleScoreEvent);

        // cleaning up
        return () =>
        {
            inNetworkingManager?.off(Message.PlayerScoreResponse.toString(), handleScoreEvent);
        };
    }, [inNetworkingManager]);

    return <span className="resultText">Score = {score}</span>
}

export default ScoreWidget;
