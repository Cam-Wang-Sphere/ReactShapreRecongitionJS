// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import * as flatbuffers from 'flatbuffers';

export class PointTapRequest {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):PointTapRequest {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsPointTapRequest(bb:flatbuffers.ByteBuffer, obj?:PointTapRequest):PointTapRequest {
  return (obj || new PointTapRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsPointTapRequest(bb:flatbuffers.ByteBuffer, obj?:PointTapRequest):PointTapRequest {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new PointTapRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

sessionId():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

pitch():number {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.readFloat32(this.bb_pos + offset) : 0.0;
}

yaw():number {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? this.bb!.readFloat32(this.bb_pos + offset) : 0.0;
}

roll():number {
  const offset = this.bb!.__offset(this.bb_pos, 10);
  return offset ? this.bb!.readFloat32(this.bb_pos + offset) : 0.0;
}

static startPointTapRequest(builder:flatbuffers.Builder) {
  builder.startObject(4);
}

static addSessionId(builder:flatbuffers.Builder, sessionId:number) {
  builder.addFieldInt32(0, sessionId, 0);
}

static addPitch(builder:flatbuffers.Builder, pitch:number) {
  builder.addFieldFloat32(1, pitch, 0.0);
}

static addYaw(builder:flatbuffers.Builder, yaw:number) {
  builder.addFieldFloat32(2, yaw, 0.0);
}

static addRoll(builder:flatbuffers.Builder, roll:number) {
  builder.addFieldFloat32(3, roll, 0.0);
}

static endPointTapRequest(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createPointTapRequest(builder:flatbuffers.Builder, sessionId:number, pitch:number, yaw:number, roll:number):flatbuffers.Offset {
  PointTapRequest.startPointTapRequest(builder);
  PointTapRequest.addSessionId(builder, sessionId);
  PointTapRequest.addPitch(builder, pitch);
  PointTapRequest.addYaw(builder, yaw);
  PointTapRequest.addRoll(builder, roll);
  return PointTapRequest.endPointTapRequest(builder);
}
}
