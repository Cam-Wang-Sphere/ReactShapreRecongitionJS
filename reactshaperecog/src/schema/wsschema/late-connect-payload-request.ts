// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import * as flatbuffers from 'flatbuffers';

export class LateConnectPayloadRequest {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):LateConnectPayloadRequest {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsLateConnectPayloadRequest(bb:flatbuffers.ByteBuffer, obj?:LateConnectPayloadRequest):LateConnectPayloadRequest {
  return (obj || new LateConnectPayloadRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsLateConnectPayloadRequest(bb:flatbuffers.ByteBuffer, obj?:LateConnectPayloadRequest):LateConnectPayloadRequest {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new LateConnectPayloadRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

sessionId():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

messages(index: number):number|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.readUint8(this.bb!.__vector(this.bb_pos + offset) + index) : 0;
}

messagesLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

messagesArray():Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? new Uint8Array(this.bb!.bytes().buffer, this.bb!.bytes().byteOffset + this.bb!.__vector(this.bb_pos + offset), this.bb!.__vector_len(this.bb_pos + offset)) : null;
}

static startLateConnectPayloadRequest(builder:flatbuffers.Builder) {
  builder.startObject(2);
}

static addSessionId(builder:flatbuffers.Builder, sessionId:number) {
  builder.addFieldInt32(0, sessionId, 0);
}

static addMessages(builder:flatbuffers.Builder, messagesOffset:flatbuffers.Offset) {
  builder.addFieldOffset(1, messagesOffset, 0);
}

static createMessagesVector(builder:flatbuffers.Builder, data:number[]|Uint8Array):flatbuffers.Offset {
  builder.startVector(1, data.length, 1);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addInt8(data[i]!);
  }
  return builder.endVector();
}

static startMessagesVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(1, numElems, 1);
}

static endLateConnectPayloadRequest(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createLateConnectPayloadRequest(builder:flatbuffers.Builder, sessionId:number, messagesOffset:flatbuffers.Offset):flatbuffers.Offset {
  LateConnectPayloadRequest.startLateConnectPayloadRequest(builder);
  LateConnectPayloadRequest.addSessionId(builder, sessionId);
  LateConnectPayloadRequest.addMessages(builder, messagesOffset);
  return LateConnectPayloadRequest.endLateConnectPayloadRequest(builder);
}
}
