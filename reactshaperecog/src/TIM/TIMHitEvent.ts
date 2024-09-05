export class FTIMHitEvent
{
	public netHandle: number; // hit object net handle
	public scoreDelta: number; // score change

    constructor(netHandle : number, scoreDelta: number)
    {
        this.netHandle = netHandle;
        this.scoreDelta = scoreDelta;
    }
}