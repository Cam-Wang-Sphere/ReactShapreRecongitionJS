"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaPlaneToMobileLoginResponse = void 0;
var flatbuffers = require("flatbuffers");
var MediaPlaneToMobileLoginResponse = /** @class */ (function () {
    function MediaPlaneToMobileLoginResponse() {
        this.bb = null;
        this.bb_pos = 0;
    }
    MediaPlaneToMobileLoginResponse.prototype.__init = function (i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    };
    MediaPlaneToMobileLoginResponse.getRootAsMediaPlaneToMobileLoginResponse = function (bb, obj) {
        return (obj || new MediaPlaneToMobileLoginResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    MediaPlaneToMobileLoginResponse.getSizePrefixedRootAsMediaPlaneToMobileLoginResponse = function (bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new MediaPlaneToMobileLoginResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    MediaPlaneToMobileLoginResponse.prototype.sessionId = function () {
        var offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
    };
    MediaPlaneToMobileLoginResponse.prototype.teamId = function () {
        var offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
    };
    MediaPlaneToMobileLoginResponse.startMediaPlaneToMobileLoginResponse = function (builder) {
        builder.startObject(2);
    };
    MediaPlaneToMobileLoginResponse.addSessionId = function (builder, sessionId) {
        builder.addFieldInt32(0, sessionId, 0);
    };
    MediaPlaneToMobileLoginResponse.addTeamId = function (builder, teamId) {
        builder.addFieldInt32(1, teamId, 0);
    };
    MediaPlaneToMobileLoginResponse.endMediaPlaneToMobileLoginResponse = function (builder) {
        var offset = builder.endObject();
        return offset;
    };
    MediaPlaneToMobileLoginResponse.createMediaPlaneToMobileLoginResponse = function (builder, sessionId, teamId) {
        MediaPlaneToMobileLoginResponse.startMediaPlaneToMobileLoginResponse(builder);
        MediaPlaneToMobileLoginResponse.addSessionId(builder, sessionId);
        MediaPlaneToMobileLoginResponse.addTeamId(builder, teamId);
        return MediaPlaneToMobileLoginResponse.endMediaPlaneToMobileLoginResponse(builder);
    };
    return MediaPlaneToMobileLoginResponse;
}());
exports.MediaPlaneToMobileLoginResponse = MediaPlaneToMobileLoginResponse;
//# sourceMappingURL=media-plane-to-mobile-login-response.js.map