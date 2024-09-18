"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingMediaPlaneUnreliableResponse = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */
var flatbuffers = require("flatbuffers");
var PingMediaPlaneUnreliableResponse = /** @class */ (function () {
    function PingMediaPlaneUnreliableResponse() {
        this.bb = null;
        this.bb_pos = 0;
    }
    PingMediaPlaneUnreliableResponse.prototype.__init = function (i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    };
    PingMediaPlaneUnreliableResponse.getRootAsPingMediaPlaneUnreliableResponse = function (bb, obj) {
        return (obj || new PingMediaPlaneUnreliableResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    PingMediaPlaneUnreliableResponse.getSizePrefixedRootAsPingMediaPlaneUnreliableResponse = function (bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new PingMediaPlaneUnreliableResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    PingMediaPlaneUnreliableResponse.prototype.sessionId = function () {
        var offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
    };
    PingMediaPlaneUnreliableResponse.prototype.sent = function (index) {
        var offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.readUint8(this.bb.__vector(this.bb_pos + offset) + index) : 0;
    };
    PingMediaPlaneUnreliableResponse.prototype.sentLength = function () {
        var offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    };
    PingMediaPlaneUnreliableResponse.prototype.sentArray = function () {
        var offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
    };
    PingMediaPlaneUnreliableResponse.startPingMediaPlaneUnreliableResponse = function (builder) {
        builder.startObject(2);
    };
    PingMediaPlaneUnreliableResponse.addSessionId = function (builder, sessionId) {
        builder.addFieldInt32(0, sessionId, 0);
    };
    PingMediaPlaneUnreliableResponse.addSent = function (builder, sentOffset) {
        builder.addFieldOffset(1, sentOffset, 0);
    };
    PingMediaPlaneUnreliableResponse.createSentVector = function (builder, data) {
        builder.startVector(1, data.length, 1);
        for (var i = data.length - 1; i >= 0; i--) {
            builder.addInt8(data[i]);
        }
        return builder.endVector();
    };
    PingMediaPlaneUnreliableResponse.startSentVector = function (builder, numElems) {
        builder.startVector(1, numElems, 1);
    };
    PingMediaPlaneUnreliableResponse.endPingMediaPlaneUnreliableResponse = function (builder) {
        var offset = builder.endObject();
        return offset;
    };
    PingMediaPlaneUnreliableResponse.createPingMediaPlaneUnreliableResponse = function (builder, sessionId, sentOffset) {
        PingMediaPlaneUnreliableResponse.startPingMediaPlaneUnreliableResponse(builder);
        PingMediaPlaneUnreliableResponse.addSessionId(builder, sessionId);
        PingMediaPlaneUnreliableResponse.addSent(builder, sentOffset);
        return PingMediaPlaneUnreliableResponse.endPingMediaPlaneUnreliableResponse(builder);
    };
    return PingMediaPlaneUnreliableResponse;
}());
exports.PingMediaPlaneUnreliableResponse = PingMediaPlaneUnreliableResponse;
//# sourceMappingURL=ping-media-plane-unreliable-response.js.map