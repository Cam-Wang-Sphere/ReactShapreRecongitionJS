// automatically generated by the FlatBuffers compiler, do not modify

import * as flatbuffers from 'flatbuffers';

import { ETIMInteractAreaOrientation } from '../wsschema/etiminteract-area-orientation.js';
import { ETIMInteractAreaShapeType } from '../wsschema/etiminteract-area-shape-type.js';
import { LinearColor } from '../wsschema/linear-color.js';
import { Vec2 } from '../wsschema/vec2.js';


export class TIMMappedAreaUpdate {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):TIMMappedAreaUpdate {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsTIMMappedAreaUpdate(bb:flatbuffers.ByteBuffer, obj?:TIMMappedAreaUpdate):TIMMappedAreaUpdate {
  return (obj || new TIMMappedAreaUpdate()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsTIMMappedAreaUpdate(bb:flatbuffers.ByteBuffer, obj?:TIMMappedAreaUpdate):TIMMappedAreaUpdate {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new TIMMappedAreaUpdate()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

sessionId():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

handle():number {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

rotation(obj?:Vec2):Vec2|null {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? (obj || new Vec2()).__init(this.bb_pos + offset, this.bb!) : null;
}

color(obj?:LinearColor):LinearColor|null {
  const offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? (obj || new LinearColor()).__init(this.bb_pos + offset, this.bb!) : null;
}

orientation():ETIMInteractAreaOrientation {
  const offset = this.bb!.__offset(this.bb_pos, 12);
  return offset ? this.bb!.readUint8(this.bb_pos + offset) : ETIMInteractAreaOrientation.Horizontal;
}

shape():ETIMInteractAreaShapeType {
  const offset = this.bb!.__offset(this.bb_pos, 14);
  return offset ? this.bb!.readUint8(this.bb_pos + offset) : ETIMInteractAreaShapeType.Rectangle;
}

dimensions(obj?:Vec2):Vec2|null {
  const offset = this.bb!.__offset(this.bb_pos, 16);
  return offset ? (obj || new Vec2()).__init(this.bb_pos + offset, this.bb!) : null;
}

distance():number {
  const offset = this.bb!.__offset(this.bb_pos, 18);
  return offset ? this.bb!.readFloat32(this.bb_pos + offset) : 0.0;
}

static startTIMMappedAreaUpdate(builder:flatbuffers.Builder) {
  builder.startObject(8);
}

static addSessionId(builder:flatbuffers.Builder, sessionId:number) {
  builder.addFieldInt32(0, sessionId, 0);
}

static addHandle(builder:flatbuffers.Builder, handle:number) {
  builder.addFieldInt32(1, handle, 0);
}

static addRotation(builder:flatbuffers.Builder, rotationOffset:flatbuffers.Offset) {
  builder.addFieldStruct(2, rotationOffset, 0);
}

static addColor(builder:flatbuffers.Builder, colorOffset:flatbuffers.Offset) {
  builder.addFieldStruct(3, colorOffset, 0);
}

static addOrientation(builder:flatbuffers.Builder, orientation:ETIMInteractAreaOrientation) {
  builder.addFieldInt8(4, orientation, ETIMInteractAreaOrientation.Horizontal);
}

static addShape(builder:flatbuffers.Builder, shape:ETIMInteractAreaShapeType) {
  builder.addFieldInt8(5, shape, ETIMInteractAreaShapeType.Rectangle);
}

static addDimensions(builder:flatbuffers.Builder, dimensionsOffset:flatbuffers.Offset) {
  builder.addFieldStruct(6, dimensionsOffset, 0);
}

static addDistance(builder:flatbuffers.Builder, distance:number) {
  builder.addFieldFloat32(7, distance, 0.0);
}

static endTIMMappedAreaUpdate(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

}
