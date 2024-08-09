"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlatBufferType = void 0;
var flatbuffers = require("flatbuffers");
var message_js_1 = require("../dot-dschema/message.js");
var FlatBufferType = /** @class */ (function () {
    function FlatBufferType() {
        this.bb = null;
        this.bb_pos = 0;
    }
    FlatBufferType.prototype.__init = function (i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    };
    FlatBufferType.getRootAsFlatBufferType = function (bb, obj) {
        return (obj || new FlatBufferType()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    FlatBufferType.getSizePrefixedRootAsFlatBufferType = function (bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new FlatBufferType()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    FlatBufferType.prototype.messageType = function () {
        var offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readUint8(this.bb_pos + offset) : message_js_1.Message.NONE;
    };
    FlatBufferType.prototype.message = function (obj) {
        var offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.__union(obj, this.bb_pos + offset) : null;
    };
    FlatBufferType.startFlatBufferType = function (builder) {
        builder.startObject(2);
    };
    FlatBufferType.addMessageType = function (builder, messageType) {
        builder.addFieldInt8(0, messageType, message_js_1.Message.NONE);
    };
    FlatBufferType.addMessage = function (builder, messageOffset) {
        builder.addFieldOffset(1, messageOffset, 0);
    };
    FlatBufferType.endFlatBufferType = function (builder) {
        var offset = builder.endObject();
        return offset;
    };
    FlatBufferType.finishFlatBufferTypeBuffer = function (builder, offset) {
        builder.finish(offset);
    };
    FlatBufferType.finishSizePrefixedFlatBufferTypeBuffer = function (builder, offset) {
        builder.finish(offset, undefined, true);
    };
    FlatBufferType.createFlatBufferType = function (builder, messageType, messageOffset) {
        FlatBufferType.startFlatBufferType(builder);
        FlatBufferType.addMessageType(builder, messageType);
        FlatBufferType.addMessage(builder, messageOffset);
        return FlatBufferType.endFlatBufferType(builder);
    };
    return FlatBufferType;
}());
exports.FlatBufferType = FlatBufferType;
//# sourceMappingURL=flat-buffer-type.js.map