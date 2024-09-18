import { BasePlayerData } from "./BasePlayerData";
import { EWSPhaseEnums } from "../schema/ewsphase-enums";

export class WSPlayerData extends BasePlayerData
{
    public getTeamId(): number
    {
        return this.teamId;
    }

    // probs shouldn't be in a player state but for the sake of demonstration
    public getCurrentPhase(): EWSPhaseEnums
    {
        return this.curreentPhase;
    }

    public getScore(): number
    {
        return this.score;
    }

    public setTeamId(inTeamId: number): void
    {
        this.teamId = inTeamId;
    }

    public setCurrentPhase(inCurrentPhase: EWSPhaseEnums): void
    {
        this.curreentPhase = inCurrentPhase;
    }

    public setScore(inScore: number): void
    {
        this.score = inScore;
    }

    protected teamId: number = WSPlayerData.noTeamId;
    protected curreentPhase: EWSPhaseEnums = WSPlayerData.defaultPhase;
    protected score: number = WSPlayerData.defaultScore;

    public static readonly noTeamId: number = -1;
    public static readonly defaultPhase: EWSPhaseEnums.None;
    public static readonly defaultScore: number = 0;
}