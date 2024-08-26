import { Vector2 } from "./Vector2";

export class FTIMInteractableData
{
    public handle: number = -1; // lazy for now...
    public location: Vector2 = new Vector2(-1,-1);
    public distance: number = -1;
    public rotation: number = -1;
    public scale: number = -1;
    public tags: string[] = [];
}