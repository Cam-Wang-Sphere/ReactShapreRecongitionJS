// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import * as flatbuffers from 'flatbuffers';

export class WebClientLoginResponse {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):WebClientLoginResponse {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsWebClientLoginResponse(bb:flatbuffers.ByteBuffer, obj?:WebClientLoginResponse):WebClientLoginResponse {
  return (obj || new WebClientLoginResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsWebClientLoginResponse(bb:flatbuffers.ByteBuffer, obj?:WebClientLoginResponse):WebClientLoginResponse {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new WebClientLoginResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

repeaterSessionId():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

pendingId():number {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

sessionId():number {
  const offset = this.bb!.__offset(this.bb_pos, 8);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

static startWebClientLoginResponse(builder:flatbuffers.Builder) {
  builder.startObject(3);
}

static addRepeaterSessionId(builder:flatbuffers.Builder, repeaterSessionId:number) {
  builder.addFieldInt32(0, repeaterSessionId, 0);
}

static addPendingId(builder:flatbuffers.Builder, pendingId:number) {
  builder.addFieldInt32(1, pendingId, 0);
}

static addSessionId(builder:flatbuffers.Builder, sessionId:number) {
  builder.addFieldInt32(2, sessionId, 0);
}

static endWebClientLoginResponse(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createWebClientLoginResponse(builder:flatbuffers.Builder, repeaterSessionId:number, pendingId:number, sessionId:number):flatbuffers.Offset {
  WebClientLoginResponse.startWebClientLoginResponse(builder);
  WebClientLoginResponse.addRepeaterSessionId(builder, repeaterSessionId);
  WebClientLoginResponse.addPendingId(builder, pendingId);
  WebClientLoginResponse.addSessionId(builder, sessionId);
  return WebClientLoginResponse.endWebClientLoginResponse(builder);
}
}
