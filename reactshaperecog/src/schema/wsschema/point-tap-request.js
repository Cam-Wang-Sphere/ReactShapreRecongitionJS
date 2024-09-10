"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointTapRequest = void 0;
var flatbuffers = require("flatbuffers");
var PointTapRequest = /** @class */ (function () {
    function PointTapRequest() {
        this.bb = null;
        this.bb_pos = 0;
    }
    PointTapRequest.prototype.__init = function (i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    };
    PointTapRequest.getRootAsPointTapRequest = function (bb, obj) {
        return (obj || new PointTapRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    PointTapRequest.getSizePrefixedRootAsPointTapRequest = function (bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new PointTapRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    PointTapRequest.prototype.sessionId = function () {
        var offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
    };
    PointTapRequest.prototype.pitch = function () {
        var offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
    };
    PointTapRequest.prototype.roll = function () {
        var offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
    };
    PointTapRequest.startPointTapRequest = function (builder) {
        builder.startObject(3);
    };
    PointTapRequest.addSessionId = function (builder, sessionId) {
        builder.addFieldInt32(0, sessionId, 0);
    };
    PointTapRequest.addPitch = function (builder, pitch) {
        builder.addFieldFloat32(1, pitch, 0.0);
    };
    PointTapRequest.addRoll = function (builder, roll) {
        builder.addFieldFloat32(2, roll, 0.0);
    };
    PointTapRequest.endPointTapRequest = function (builder) {
        var offset = builder.endObject();
        return offset;
    };
    PointTapRequest.createPointTapRequest = function (builder, sessionId, pitch, roll) {
        PointTapRequest.startPointTapRequest(builder);
        PointTapRequest.addSessionId(builder, sessionId);
        PointTapRequest.addPitch(builder, pitch);
        PointTapRequest.addRoll(builder, roll);
        return PointTapRequest.endPointTapRequest(builder);
    };
    return PointTapRequest;
}());
exports.PointTapRequest = PointTapRequest;
//# sourceMappingURL=point-tap-request.js.map