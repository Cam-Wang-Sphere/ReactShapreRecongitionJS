// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import * as flatbuffers from 'flatbuffers';

import { TIMInputInteractable } from '../wsschema/timinput-interactable.js';


export class TIMPlayerInputInteractable {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):TIMPlayerInputInteractable {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsTIMPlayerInputInteractable(bb:flatbuffers.ByteBuffer, obj?:TIMPlayerInputInteractable):TIMPlayerInputInteractable {
  return (obj || new TIMPlayerInputInteractable()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsTIMPlayerInputInteractable(bb:flatbuffers.ByteBuffer, obj?:TIMPlayerInputInteractable):TIMPlayerInputInteractable {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new TIMPlayerInputInteractable()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

sessionId():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

inputEvents(index: number, obj?:TIMInputInteractable):TIMInputInteractable|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? (obj || new TIMInputInteractable()).__init(this.bb!.__indirect(this.bb!.__vector(this.bb_pos + offset) + index * 4), this.bb!) : null;
}

inputEventsLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

static startTIMPlayerInputInteractable(builder:flatbuffers.Builder) {
  builder.startObject(2);
}

static addSessionId(builder:flatbuffers.Builder, sessionId:number) {
  builder.addFieldInt32(0, sessionId, 0);
}

static addInputEvents(builder:flatbuffers.Builder, inputEventsOffset:flatbuffers.Offset) {
  builder.addFieldOffset(1, inputEventsOffset, 0);
}

static createInputEventsVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]!);
  }
  return builder.endVector();
}

static startInputEventsVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static endTIMPlayerInputInteractable(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createTIMPlayerInputInteractable(builder:flatbuffers.Builder, sessionId:number, inputEventsOffset:flatbuffers.Offset):flatbuffers.Offset {
  TIMPlayerInputInteractable.startTIMPlayerInputInteractable(builder);
  TIMPlayerInputInteractable.addSessionId(builder, sessionId);
  TIMPlayerInputInteractable.addInputEvents(builder, inputEventsOffset);
  return TIMPlayerInputInteractable.endTIMPlayerInputInteractable(builder);
}
}
