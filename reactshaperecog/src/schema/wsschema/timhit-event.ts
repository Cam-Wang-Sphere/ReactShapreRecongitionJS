// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import * as flatbuffers from 'flatbuffers';

export class TIMHitEvent {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):TIMHitEvent {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsTIMHitEvent(bb:flatbuffers.ByteBuffer, obj?:TIMHitEvent):TIMHitEvent {
  return (obj || new TIMHitEvent()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsTIMHitEvent(bb:flatbuffers.ByteBuffer, obj?:TIMHitEvent):TIMHitEvent {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new TIMHitEvent()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

sessionId():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

netHandle():number {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.readUint32(this.bb_pos + offset) : 0;
}

value():number {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

static startTIMHitEvent(builder:flatbuffers.Builder) {
  builder.startObject(3);
}

static addSessionId(builder:flatbuffers.Builder, sessionId:number) {
  builder.addFieldInt32(0, sessionId, 0);
}

static addNetHandle(builder:flatbuffers.Builder, netHandle:number) {
  builder.addFieldInt32(1, netHandle, 0);
}

static addValue(builder:flatbuffers.Builder, value:number) {
  builder.addFieldInt32(2, value, 0);
}

static endTIMHitEvent(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createTIMHitEvent(builder:flatbuffers.Builder, sessionId:number, netHandle:number, value:number):flatbuffers.Offset {
  TIMHitEvent.startTIMHitEvent(builder);
  TIMHitEvent.addSessionId(builder, sessionId);
  TIMHitEvent.addNetHandle(builder, netHandle);
  TIMHitEvent.addValue(builder, value);
  return TIMHitEvent.endTIMHitEvent(builder);
}
}
