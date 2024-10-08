"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIMInteractableData = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */
var flatbuffers = require("flatbuffers");
var TIMInteractableData = /** @class */ (function () {
    function TIMInteractableData() {
        this.bb = null;
        this.bb_pos = 0;
    }
    TIMInteractableData.prototype.__init = function (i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    };
    TIMInteractableData.getRootAsTIMInteractableData = function (bb, obj) {
        return (obj || new TIMInteractableData()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    TIMInteractableData.getSizePrefixedRootAsTIMInteractableData = function (bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new TIMInteractableData()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    TIMInteractableData.prototype.sessionId = function () {
        var offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
    };
    TIMInteractableData.prototype.netHandle = function () {
        var offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
    };
    TIMInteractableData.prototype.tags = function (index, optionalEncoding) {
        var offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? this.bb.__string(this.bb.__vector(this.bb_pos + offset) + index * 4, optionalEncoding) : null;
    };
    TIMInteractableData.prototype.tagsLength = function () {
        var offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    };
    TIMInteractableData.prototype.scale = function () {
        var offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
    };
    TIMInteractableData.startTIMInteractableData = function (builder) {
        builder.startObject(4);
    };
    TIMInteractableData.addSessionId = function (builder, sessionId) {
        builder.addFieldInt32(0, sessionId, 0);
    };
    TIMInteractableData.addNetHandle = function (builder, netHandle) {
        builder.addFieldInt32(1, netHandle, 0);
    };
    TIMInteractableData.addTags = function (builder, tagsOffset) {
        builder.addFieldOffset(2, tagsOffset, 0);
    };
    TIMInteractableData.createTagsVector = function (builder, data) {
        builder.startVector(4, data.length, 4);
        for (var i = data.length - 1; i >= 0; i--) {
            builder.addOffset(data[i]);
        }
        return builder.endVector();
    };
    TIMInteractableData.startTagsVector = function (builder, numElems) {
        builder.startVector(4, numElems, 4);
    };
    TIMInteractableData.addScale = function (builder, scale) {
        builder.addFieldFloat32(3, scale, 0.0);
    };
    TIMInteractableData.endTIMInteractableData = function (builder) {
        var offset = builder.endObject();
        return offset;
    };
    TIMInteractableData.createTIMInteractableData = function (builder, sessionId, netHandle, tagsOffset, scale) {
        TIMInteractableData.startTIMInteractableData(builder);
        TIMInteractableData.addSessionId(builder, sessionId);
        TIMInteractableData.addNetHandle(builder, netHandle);
        TIMInteractableData.addTags(builder, tagsOffset);
        TIMInteractableData.addScale(builder, scale);
        return TIMInteractableData.endTIMInteractableData(builder);
    };
    return TIMInteractableData;
}());
exports.TIMInteractableData = TIMInteractableData;
//# sourceMappingURL=timinteractable-data.js.map