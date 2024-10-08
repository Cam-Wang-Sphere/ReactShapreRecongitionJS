"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIMHitEvent = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */
var flatbuffers = require("flatbuffers");
var TIMHitEvent = /** @class */ (function () {
    function TIMHitEvent() {
        this.bb = null;
        this.bb_pos = 0;
    }
    TIMHitEvent.prototype.__init = function (i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    };
    TIMHitEvent.getRootAsTIMHitEvent = function (bb, obj) {
        return (obj || new TIMHitEvent()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    TIMHitEvent.getSizePrefixedRootAsTIMHitEvent = function (bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new TIMHitEvent()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    TIMHitEvent.prototype.sessionId = function () {
        var offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
    };
    TIMHitEvent.prototype.netHandle = function () {
        var offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.readUint32(this.bb_pos + offset) : 0;
    };
    TIMHitEvent.prototype.value = function () {
        var offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
    };
    TIMHitEvent.startTIMHitEvent = function (builder) {
        builder.startObject(3);
    };
    TIMHitEvent.addSessionId = function (builder, sessionId) {
        builder.addFieldInt32(0, sessionId, 0);
    };
    TIMHitEvent.addNetHandle = function (builder, netHandle) {
        builder.addFieldInt32(1, netHandle, 0);
    };
    TIMHitEvent.addValue = function (builder, value) {
        builder.addFieldInt32(2, value, 0);
    };
    TIMHitEvent.endTIMHitEvent = function (builder) {
        var offset = builder.endObject();
        return offset;
    };
    TIMHitEvent.createTIMHitEvent = function (builder, sessionId, netHandle, value) {
        TIMHitEvent.startTIMHitEvent(builder);
        TIMHitEvent.addSessionId(builder, sessionId);
        TIMHitEvent.addNetHandle(builder, netHandle);
        TIMHitEvent.addValue(builder, value);
        return TIMHitEvent.endTIMHitEvent(builder);
    };
    return TIMHitEvent;
}());
exports.TIMHitEvent = TIMHitEvent;
//# sourceMappingURL=timhit-event.js.map