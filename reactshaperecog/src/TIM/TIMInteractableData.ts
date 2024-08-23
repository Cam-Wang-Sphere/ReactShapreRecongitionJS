import { Vector2 } from "./Vector2";

export class FTIMInteractableData
{
    public handle: number; // lazy for now...
    public location: Vector2;
    public distance: number;
    public rotation: number;
    public scale: number;
    public tags: string[] = [];
}