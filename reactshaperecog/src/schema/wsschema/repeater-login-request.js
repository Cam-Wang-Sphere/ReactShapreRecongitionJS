"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepeaterLoginRequest = void 0;
var flatbuffers = require("flatbuffers");
var RepeaterLoginRequest = /** @class */ (function () {
    function RepeaterLoginRequest() {
        this.bb = null;
        this.bb_pos = 0;
    }
    RepeaterLoginRequest.prototype.__init = function (i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    };
    RepeaterLoginRequest.getRootAsRepeaterLoginRequest = function (bb, obj) {
        return (obj || new RepeaterLoginRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    RepeaterLoginRequest.getSizePrefixedRootAsRepeaterLoginRequest = function (bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new RepeaterLoginRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    RepeaterLoginRequest.prototype.sessionId = function () {
        var offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
    };
    RepeaterLoginRequest.startRepeaterLoginRequest = function (builder) {
        builder.startObject(1);
    };
    RepeaterLoginRequest.addSessionId = function (builder, sessionId) {
        builder.addFieldInt32(0, sessionId, 0);
    };
    RepeaterLoginRequest.endRepeaterLoginRequest = function (builder) {
        var offset = builder.endObject();
        return offset;
    };
    RepeaterLoginRequest.createRepeaterLoginRequest = function (builder, sessionId) {
        RepeaterLoginRequest.startRepeaterLoginRequest(builder);
        RepeaterLoginRequest.addSessionId(builder, sessionId);
        return RepeaterLoginRequest.endRepeaterLoginRequest(builder);
    };
    return RepeaterLoginRequest;
}());
exports.RepeaterLoginRequest = RepeaterLoginRequest;
//# sourceMappingURL=repeater-login-request.js.map