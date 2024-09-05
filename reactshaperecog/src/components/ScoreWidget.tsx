import React, { useState, useEffect } from 'react';
import { NetworkingManager } from "./../networking/NetworkingManager";
import { Message } from '../schema/wsschema/message';
import { WSPlayerData } from '../player/WSPlayerData';
import SuccessOverlay from './SuccessOverlay';
import { FTIMHitEvent } from '../TIM/TIMHitEvent';

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

        const handleTIMScoreEvent = (inTIMHitEvent: FTIMHitEvent) =>
        {
            const scoreDelta: number = inTIMHitEvent.scoreDelta;
            setScore(prevScore => prevScore + scoreDelta);
            inPlayerData?.setScore(inPlayerData?.getScore() + scoreDelta);
        }

        inNetworkingManager?.on(Message.PlayerScoreResponse.toString(), handleScoreEvent);
        inNetworkingManager?.on(Message.TIMHitEvent.toString(), handleTIMScoreEvent);

        // cleaning up
        return () =>
        {
            inNetworkingManager?.off(Message.PlayerScoreResponse.toString(), handleScoreEvent);
            inNetworkingManager?.off(Message.TIMHitEvent.toString(), handleTIMScoreEvent);
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
