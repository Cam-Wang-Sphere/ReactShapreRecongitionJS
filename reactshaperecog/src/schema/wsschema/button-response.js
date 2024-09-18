"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.ButtonResponse = void 0;
var flatbuffers = require("flatbuffers");
var ButtonResponse = /** @class */ (function () {
    function ButtonResponse() {
        this.bb = null;
        this.bb_pos = 0;
    }
    ButtonResponse.prototype.__init = function (i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    };
    ButtonResponse.getRootAsButtonResponse = function (bb, obj) {
        return (obj || new ButtonResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    ButtonResponse.getSizePrefixedRootAsButtonResponse = function (bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new ButtonResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    ButtonResponse.prototype.sessionId = function () {
        var offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
    };
    ButtonResponse.prototype.playerScore = function () {
        var offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
    };
    ButtonResponse.startButtonResponse = function (builder) {
        builder.startObject(2);
    };
    ButtonResponse.addSessionId = function (builder, sessionId) {
        builder.addFieldInt32(0, sessionId, 0);
    };
    ButtonResponse.addPlayerScore = function (builder, playerScore) {
        builder.addFieldInt32(1, playerScore, 0);
    };
    ButtonResponse.endButtonResponse = function (builder) {
        var offset = builder.endObject();
        return offset;
    };
    ButtonResponse.createButtonResponse = function (builder, sessionId, playerScore) {
        ButtonResponse.startButtonResponse(builder);
        ButtonResponse.addSessionId(builder, sessionId);
        ButtonResponse.addPlayerScore(builder, playerScore);
        return ButtonResponse.endButtonResponse(builder);
    };
    return ButtonResponse;
}());
exports.ButtonResponse = ButtonResponse;
//# sourceMappingURL=button-response.js.map