// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import * as flatbuffers from 'flatbuffers';

export class SlashRequest {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):SlashRequest {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsSlashRequest(bb:flatbuffers.ByteBuffer, obj?:SlashRequest):SlashRequest {
  return (obj || new SlashRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsSlashRequest(bb:flatbuffers.ByteBuffer, obj?:SlashRequest):SlashRequest {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new SlashRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

sessionId():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

slashId():number {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

static startSlashRequest(builder:flatbuffers.Builder) {
  builder.startObject(2);
}

static addSessionId(builder:flatbuffers.Builder, sessionId:number) {
  builder.addFieldInt32(0, sessionId, 0);
}

static addSlashId(builder:flatbuffers.Builder, slashId:number) {
  builder.addFieldInt32(1, slashId, 0);
}

static endSlashRequest(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createSlashRequest(builder:flatbuffers.Builder, sessionId:number, slashId:number):flatbuffers.Offset {
  SlashRequest.startSlashRequest(builder);
  SlashRequest.addSessionId(builder, sessionId);
  SlashRequest.addSlashId(builder, slashId);
  return SlashRequest.endSlashRequest(builder);
}
}
