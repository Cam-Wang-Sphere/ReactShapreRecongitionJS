import { ETIMInteractAreaOrientation } from "../schema/wsschema/etiminteract-area-orientation";
import { ETIMInteractAreaShapeType } from "../schema/wsschema/etiminteract-area-shape-type";
import { LinearColor } from "../schema/wsschema/linear-color";
import { FTIMMappedAreaHandle } from "./TIMMappedAreaHandle";
import { Vector2 } from "./Vector2";

export class FTIMMappedArea
{
    public handle: FTIMMappedAreaHandle;
    public pitch: number;
    public yaw: number;
	public color: LinearColor;
	public orientation: ETIMInteractAreaOrientation;
	public shape: ETIMInteractAreaShapeType;
	public dimensions: Vector2;
	public distance: number;
}