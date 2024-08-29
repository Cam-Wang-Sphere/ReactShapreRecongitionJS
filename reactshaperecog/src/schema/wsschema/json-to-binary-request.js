"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonToBinaryRequest = void 0;
var flatbuffers = require("flatbuffers");
var JsonToBinaryRequest = /** @class */ (function () {
    function JsonToBinaryRequest() {
        this.bb = null;
        this.bb_pos = 0;
    }
    JsonToBinaryRequest.prototype.__init = function (i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    };
    JsonToBinaryRequest.getRootAsJsonToBinaryRequest = function (bb, obj) {
        return (obj || new JsonToBinaryRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    JsonToBinaryRequest.getSizePrefixedRootAsJsonToBinaryRequest = function (bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new JsonToBinaryRequest()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    JsonToBinaryRequest.prototype.sessionId = function () {
        var offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
    };
    JsonToBinaryRequest.prototype.json = function (index) {
        var offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.readUint8(this.bb.__vector(this.bb_pos + offset) + index) : 0;
    };
    JsonToBinaryRequest.prototype.jsonLength = function () {
        var offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    };
    JsonToBinaryRequest.prototype.jsonArray = function () {
        var offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
    };
    JsonToBinaryRequest.startJsonToBinaryRequest = function (builder) {
        builder.startObject(2);
    };
    JsonToBinaryRequest.addSessionId = function (builder, sessionId) {
        builder.addFieldInt32(0, sessionId, 0);
    };
    JsonToBinaryRequest.addJson = function (builder, jsonOffset) {
        builder.addFieldOffset(1, jsonOffset, 0);
    };
    JsonToBinaryRequest.createJsonVector = function (builder, data) {
        builder.startVector(1, data.length, 1);
        for (var i = data.length - 1; i >= 0; i--) {
            builder.addInt8(data[i]);
        }
        return builder.endVector();
    };
    JsonToBinaryRequest.startJsonVector = function (builder, numElems) {
        builder.startVector(1, numElems, 1);
    };
    JsonToBinaryRequest.endJsonToBinaryRequest = function (builder) {
        var offset = builder.endObject();
        return offset;
    };
    JsonToBinaryRequest.createJsonToBinaryRequest = function (builder, sessionId, jsonOffset) {
        JsonToBinaryRequest.startJsonToBinaryRequest(builder);
        JsonToBinaryRequest.addSessionId(builder, sessionId);
        JsonToBinaryRequest.addJson(builder, jsonOffset);
        return JsonToBinaryRequest.endJsonToBinaryRequest(builder);
    };
    return JsonToBinaryRequest;
}());
exports.JsonToBinaryRequest = JsonToBinaryRequest;
//# sourceMappingURL=json-to-binary-request.js.map