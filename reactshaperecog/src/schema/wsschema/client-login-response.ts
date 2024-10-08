// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import * as flatbuffers from 'flatbuffers';

export class ClientLoginResponse {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):ClientLoginResponse {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsClientLoginResponse(bb:flatbuffers.ByteBuffer, obj?:ClientLoginResponse):ClientLoginResponse {
  return (obj || new ClientLoginResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsClientLoginResponse(bb:flatbuffers.ByteBuffer, obj?:ClientLoginResponse):ClientLoginResponse {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new ClientLoginResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

assignedSessionId():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

static startClientLoginResponse(builder:flatbuffers.Builder) {
  builder.startObject(1);
}

static addAssignedSessionId(builder:flatbuffers.Builder, assignedSessionId:number) {
  builder.addFieldInt32(0, assignedSessionId, 0);
}

static endClientLoginResponse(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createClientLoginResponse(builder:flatbuffers.Builder, assignedSessionId:number):flatbuffers.Offset {
  ClientLoginResponse.startClientLoginResponse(builder);
  ClientLoginResponse.addAssignedSessionId(builder, assignedSessionId);
  return ClientLoginResponse.endClientLoginResponse(builder);
}
}
