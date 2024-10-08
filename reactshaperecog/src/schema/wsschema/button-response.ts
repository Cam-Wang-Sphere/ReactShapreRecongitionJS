// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import * as flatbuffers from 'flatbuffers';

export class ButtonResponse {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):ButtonResponse {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsButtonResponse(bb:flatbuffers.ByteBuffer, obj?:ButtonResponse):ButtonResponse {
  return (obj || new ButtonResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsButtonResponse(bb:flatbuffers.ByteBuffer, obj?:ButtonResponse):ButtonResponse {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new ButtonResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

sessionId():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

playerScore():number {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

static startButtonResponse(builder:flatbuffers.Builder) {
  builder.startObject(2);
}

static addSessionId(builder:flatbuffers.Builder, sessionId:number) {
  builder.addFieldInt32(0, sessionId, 0);
}

static addPlayerScore(builder:flatbuffers.Builder, playerScore:number) {
  builder.addFieldInt32(1, playerScore, 0);
}

static endButtonResponse(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createButtonResponse(builder:flatbuffers.Builder, sessionId:number, playerScore:number):flatbuffers.Offset {
  ButtonResponse.startButtonResponse(builder);
  ButtonResponse.addSessionId(builder, sessionId);
  ButtonResponse.addPlayerScore(builder, playerScore);
  return ButtonResponse.endButtonResponse(builder);
}
}
