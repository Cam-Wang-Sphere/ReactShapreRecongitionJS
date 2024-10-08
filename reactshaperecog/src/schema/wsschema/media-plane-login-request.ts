// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import * as flatbuffers from 'flatbuffers';

export class MediaPlaneLoginRequest {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):MediaPlaneLoginRequest {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsMediaPlaneLoginRequest(bb:flatbuffers.ByteBuffer, obj?:MediaPlaneLoginRequest):MediaPlaneLoginRequest {
  return (obj || new MediaPlaneLoginRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsMediaPlaneLoginRequest(bb:flatbuffers.ByteBuffer, obj?:MediaPlaneLoginRequest):MediaPlaneLoginRequest {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new MediaPlaneLoginRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

sessionId():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

static startMediaPlaneLoginRequest(builder:flatbuffers.Builder) {
  builder.startObject(1);
}

static addSessionId(builder:flatbuffers.Builder, sessionId:number) {
  builder.addFieldInt32(0, sessionId, 0);
}

static endMediaPlaneLoginRequest(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createMediaPlaneLoginRequest(builder:flatbuffers.Builder, sessionId:number):flatbuffers.Offset {
  MediaPlaneLoginRequest.startMediaPlaneLoginRequest(builder);
  MediaPlaneLoginRequest.addSessionId(builder, sessionId);
  return MediaPlaneLoginRequest.endMediaPlaneLoginRequest(builder);
}
}
