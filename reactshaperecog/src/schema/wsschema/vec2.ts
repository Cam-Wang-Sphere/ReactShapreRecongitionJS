// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import * as flatbuffers from 'flatbuffers';

export class Vec2 {
  bb: flatbuffers.ByteBuffer|null = null;
  bb_pos = 0;
  __init(i:number, bb:flatbuffers.ByteBuffer):Vec2 {
  this.bb_pos = i;
  this.bb = bb;
  return this;
}

x():number {
  return this.bb!.readFloat32(this.bb_pos);
}

y():number {
  return this.bb!.readFloat32(this.bb_pos + 4);
}

static sizeOf():number {
  return 8;
}

static createVec2(builder:flatbuffers.Builder, x: number, y: number):flatbuffers.Offset {
  builder.prep(4, 8);
  builder.writeFloat32(y);
  builder.writeFloat32(x);
  return builder.offset();
}

}
