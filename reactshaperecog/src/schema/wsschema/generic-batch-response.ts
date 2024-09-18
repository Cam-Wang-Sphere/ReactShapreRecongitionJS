// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import * as flatbuffers from 'flatbuffers';

import { GenericBinaryWrapper } from '../wsschema/generic-binary-wrapper.js';


export class GenericBatchResponse {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):GenericBatchResponse {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsGenericBatchResponse(bb:flatbuffers.ByteBuffer, obj?:GenericBatchResponse):GenericBatchResponse {
  return (obj || new GenericBatchResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsGenericBatchResponse(bb:flatbuffers.ByteBuffer, obj?:GenericBatchResponse):GenericBatchResponse {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new GenericBatchResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

sessionId():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

messages(index: number, obj?:GenericBinaryWrapper):GenericBinaryWrapper|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? (obj || new GenericBinaryWrapper()).__init(this.bb!.__indirect(this.bb!.__vector(this.bb_pos + offset) + index * 4), this.bb!) : null;
}

messagesLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

static startGenericBatchResponse(builder:flatbuffers.Builder) {
  builder.startObject(2);
}

static addSessionId(builder:flatbuffers.Builder, sessionId:number) {
  builder.addFieldInt32(0, sessionId, 0);
}

static addMessages(builder:flatbuffers.Builder, messagesOffset:flatbuffers.Offset) {
  builder.addFieldOffset(1, messagesOffset, 0);
}

static createMessagesVector(builder:flatbuffers.Builder, data:flatbuffers.Offset[]):flatbuffers.Offset {
  builder.startVector(4, data.length, 4);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addOffset(data[i]!);
  }
  return builder.endVector();
}

static startMessagesVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(4, numElems, 4);
}

static endGenericBatchResponse(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createGenericBatchResponse(builder:flatbuffers.Builder, sessionId:number, messagesOffset:flatbuffers.Offset):flatbuffers.Offset {
  GenericBatchResponse.startGenericBatchResponse(builder);
  GenericBatchResponse.addSessionId(builder, sessionId);
  GenericBatchResponse.addMessages(builder, messagesOffset);
  return GenericBatchResponse.endGenericBatchResponse(builder);
}
}
