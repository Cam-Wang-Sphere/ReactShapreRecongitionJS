import { BasePlayerData } from "./BasePlayerData";
import { PhaseEnums } from '../schema/wsschema/phase-enums'

export class WSPlayerData extends BasePlayerData
{
    public getTeamId(): number
    {
        return this.teamId;
    }

    // probs shouldn't be in a player state but for the sake of demonstration
    public getCurrentPhase(): PhaseEnums
    {
        return this.curreentPhase;
    }

    public setTeamId(inTeamId: number): void
    {
        this.teamId = inTeamId;
    }

    public setCurrentPhase(inCurrentPhase: PhaseEnums): void
    {
        this.curreentPhase = inCurrentPhase;
    }

    protected teamId: number = WSPlayerData.noTeamId;
    protected curreentPhase: PhaseEnums = WSPlayerData.defaultPhase;

    public static readonly noTeamId: number = -1;
    public static readonly defaultPhase: PhaseEnums.None;
}