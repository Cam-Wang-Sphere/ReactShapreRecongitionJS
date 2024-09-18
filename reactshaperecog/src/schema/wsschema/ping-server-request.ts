// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import * as flatbuffers from 'flatbuffers';

export class PingServerRequest {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):PingServerRequest {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsPingServerRequest(bb:flatbuffers.ByteBuffer, obj?:PingServerRequest):PingServerRequest {
  return (obj || new PingServerRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsPingServerRequest(bb:flatbuffers.ByteBuffer, obj?:PingServerRequest):PingServerRequest {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new PingServerRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

sessionId():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

sent(index: number):number|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.readUint8(this.bb!.__vector(this.bb_pos + offset) + index) : 0;
}

sentLength():number {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.__vector_len(this.bb_pos + offset) : 0;
}

sentArray():Uint8Array|null {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? new Uint8Array(this.bb!.bytes().buffer, this.bb!.bytes().byteOffset + this.bb!.__vector(this.bb_pos + offset), this.bb!.__vector_len(this.bb_pos + offset)) : null;
}

static startPingServerRequest(builder:flatbuffers.Builder) {
  builder.startObject(2);
}

static addSessionId(builder:flatbuffers.Builder, sessionId:number) {
  builder.addFieldInt32(0, sessionId, 0);
}

static addSent(builder:flatbuffers.Builder, sentOffset:flatbuffers.Offset) {
  builder.addFieldOffset(1, sentOffset, 0);
}

static createSentVector(builder:flatbuffers.Builder, data:number[]|Uint8Array):flatbuffers.Offset {
  builder.startVector(1, data.length, 1);
  for (let i = data.length - 1; i >= 0; i--) {
    builder.addInt8(data[i]!);
  }
  return builder.endVector();
}

static startSentVector(builder:flatbuffers.Builder, numElems:number) {
  builder.startVector(1, numElems, 1);
}

static endPingServerRequest(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createPingServerRequest(builder:flatbuffers.Builder, sessionId:number, sentOffset:flatbuffers.Offset):flatbuffers.Offset {
  PingServerRequest.startPingServerRequest(builder);
  PingServerRequest.addSessionId(builder, sessionId);
  PingServerRequest.addSent(builder, sentOffset);
  return PingServerRequest.endPingServerRequest(builder);
}
}
