export class BasePlayerData 
{
    public getSessionId(): number
    {
        return this.sessionId;
    }

    public getName(): string
    {
        return this.name;
    }

    public setSessionId(inSessionId: number): void
    {
        this.sessionId = inSessionId;
    }

    public setName(inName: string): void
    {
        this.name = inName;
    }

    protected sessionId: number = BasePlayerData.noSessionId;
    protected name: string = BasePlayerData.defaultName;

    public static readonly defaultName: string = "DrDrakeRamoreyFromDaysOfOurLives";
    public static readonly noSessionId: number = -1;
}