// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import * as flatbuffers from 'flatbuffers';

import { EWSGlobalInputTypes } from '../ewsglobal-input-types.js';


export class AdminSetInputType {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):AdminSetInputType {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

static getRootAsAdminSetInputType(bb:flatbuffers.ByteBuffer, obj?:AdminSetInputType):AdminSetInputType {
  return (obj || new AdminSetInputType()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

static getSizePrefixedRootAsAdminSetInputType(bb:flatbuffers.ByteBuffer, obj?:AdminSetInputType):AdminSetInputType {
  bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
  return (obj || new AdminSetInputType()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
}

sessionId():number {
  const offset = this.bb!.__offset(this.bb_pos, 4);
  return offset ? this.bb!.readInt32(this.bb_pos + offset) : 0;
}

inputType():EWSGlobalInputTypes {
  const offset = this.bb!.__offset(this.bb_pos, 6);
  return offset ? this.bb!.readUint8(this.bb_pos + offset) : EWSGlobalInputTypes.Min;
}

static startAdminSetInputType(builder:flatbuffers.Builder) {
  builder.startObject(2);
}

static addSessionId(builder:flatbuffers.Builder, sessionId:number) {
  builder.addFieldInt32(0, sessionId, 0);
}

static addInputType(builder:flatbuffers.Builder, inputType:EWSGlobalInputTypes) {
  builder.addFieldInt8(1, inputType, EWSGlobalInputTypes.Min);
}

static endAdminSetInputType(builder:flatbuffers.Builder):flatbuffers.Offset {
  const offset = builder.endObject();
  return offset;
}

static createAdminSetInputType(builder:flatbuffers.Builder, sessionId:number, inputType:EWSGlobalInputTypes):flatbuffers.Offset {
  AdminSetInputType.startAdminSetInputType(builder);
  AdminSetInputType.addSessionId(builder, sessionId);
  AdminSetInputType.addInputType(builder, inputType);
  return AdminSetInputType.endAdminSetInputType(builder);
}
}
