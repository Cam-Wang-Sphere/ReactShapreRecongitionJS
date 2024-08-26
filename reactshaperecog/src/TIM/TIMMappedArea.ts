import { ETIMInteractAreaOrientation } from "../schema/wsschema/etiminteract-area-orientation";
import { ETIMInteractAreaShapeType } from "../schema/wsschema/etiminteract-area-shape-type";
import { LinearColor } from "../schema/wsschema/linear-color";
import { FTIMMappedAreaHandle } from "./TIMMappedAreaHandle";
import { Vector2 } from "./Vector2";

export class FTIMMappedArea
{
    public handle: FTIMMappedAreaHandle = new FTIMMappedAreaHandle();
    public pitch: number = -1;
    public yaw: number = -1;
	public color: LinearColor = new LinearColor();
	public orientation: ETIMInteractAreaOrientation = 0;
	public shape: ETIMInteractAreaShapeType = 0;
	public dimensions: Vector2 = new Vector2(-1,-1);
	public distance: number = -1;
}