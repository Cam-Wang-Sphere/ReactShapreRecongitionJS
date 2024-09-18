"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointTapResetRequest = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */
var flatbuffers = require("flatbuffers");
var PointTapResetRequest = /** @class */ (function () {
    function PointTapResetRequest() {
        this.bb = null;
        this.bb_pos = 0;
    }
    PointTapResetRequest.prototype.__init = function (i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    };
    PointTapResetRequest.getRootAsPointTapResetRequest = function (bb, obj) {
        return (obj || new PointTapResetRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    PointTapResetRequest.getSizePrefixedRootAsPointTapResetRequest = function (bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new PointTapResetRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    PointTapResetRequest.prototype.sessionId = function () {
        var offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
    };
    PointTapResetRequest.startPointTapResetRequest = function (builder) {
        builder.startObject(1);
    };
    PointTapResetRequest.addSessionId = function (builder, sessionId) {
        builder.addFieldInt32(0, sessionId, 0);
    };
    PointTapResetRequest.endPointTapResetRequest = function (builder) {
        var offset = builder.endObject();
        return offset;
    };
    PointTapResetRequest.createPointTapResetRequest = function (builder, sessionId) {
        PointTapResetRequest.startPointTapResetRequest(builder);
        PointTapResetRequest.addSessionId(builder, sessionId);
        return PointTapResetRequest.endPointTapResetRequest(builder);
    };
    return PointTapResetRequest;
}());
exports.PointTapResetRequest = PointTapResetRequest;
//# sourceMappingURL=point-tap-reset-request.js.map