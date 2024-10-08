// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import * as flatbuffers from 'flatbuffers';

export class AdminSkipPhase {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):AdminSkipPhase {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsAdminSkipPhase(bb:flatbuffers.ByteBuffer, obj?:AdminSkipPhase):AdminSkipPhase {
  return (obj || new AdminSkipPhase()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsAdminSkipPhase(bb:flatbuffers.ByteBuffer, obj?:AdminSkipPhase):AdminSkipPhase {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new AdminSkipPhase()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

sessionId():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

static startAdminSkipPhase(builder:flatbuffers.Builder) {
  builder.startObject(1);
}

static addSessionId(builder:flatbuffers.Builder, sessionId:number) {
  builder.addFieldInt32(0, sessionId, 0);
}

static endAdminSkipPhase(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createAdminSkipPhase(builder:flatbuffers.Builder, sessionId:number):flatbuffers.Offset {
  AdminSkipPhase.startAdminSkipPhase(builder);
  AdminSkipPhase.addSessionId(builder, sessionId);
  return AdminSkipPhase.endAdminSkipPhase(builder);
}
}
