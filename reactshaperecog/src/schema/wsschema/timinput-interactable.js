"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIMInputInteractable = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */
var flatbuffers = require("flatbuffers");
var TIMInputInteractable = /** @class */ (function () {
    function TIMInputInteractable() {
        this.bb = null;
        this.bb_pos = 0;
    }
    TIMInputInteractable.prototype.__init = function (i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    };
    TIMInputInteractable.getRootAsTIMInputInteractable = function (bb, obj) {
        return (obj || new TIMInputInteractable()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    TIMInputInteractable.getSizePrefixedRootAsTIMInputInteractable = function (bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new TIMInputInteractable()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    TIMInputInteractable.prototype.netHandle = function () {
        var offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
    };
    TIMInputInteractable.startTIMInputInteractable = function (builder) {
        builder.startObject(1);
    };
    TIMInputInteractable.addNetHandle = function (builder, netHandle) {
        builder.addFieldInt32(0, netHandle, 0);
    };
    TIMInputInteractable.endTIMInputInteractable = function (builder) {
        var offset = builder.endObject();
        return offset;
    };
    TIMInputInteractable.createTIMInputInteractable = function (builder, netHandle) {
        TIMInputInteractable.startTIMInputInteractable(builder);
        TIMInputInteractable.addNetHandle(builder, netHandle);
        return TIMInputInteractable.endTIMInputInteractable(builder);
    };
    return TIMInputInteractable;
}());
exports.TIMInputInteractable = TIMInputInteractable;
//# sourceMappingURL=timinput-interactable.js.map