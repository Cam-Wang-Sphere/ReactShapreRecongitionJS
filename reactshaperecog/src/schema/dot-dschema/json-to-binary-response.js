"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonToBinaryResponse = void 0;
var flatbuffers = require("flatbuffers");
var JsonToBinaryResponse = /** @class */ (function () {
    function JsonToBinaryResponse() {
        this.bb = null;
        this.bb_pos = 0;
    }
    JsonToBinaryResponse.prototype.__init = function (i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    };
    JsonToBinaryResponse.getRootAsJsonToBinaryResponse = function (bb, obj) {
        return (obj || new JsonToBinaryResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    JsonToBinaryResponse.getSizePrefixedRootAsJsonToBinaryResponse = function (bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new JsonToBinaryResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    JsonToBinaryResponse.prototype.sessionId = function () {
        var offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
    };
    JsonToBinaryResponse.prototype.json = function (index) {
        var offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.readUint8(this.bb.__vector(this.bb_pos + offset) + index) : 0;
    };
    JsonToBinaryResponse.prototype.jsonLength = function () {
        var offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    };
    JsonToBinaryResponse.prototype.jsonArray = function () {
        var offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? new Uint8Array(this.bb.bytes().buffer, this.bb.bytes().byteOffset + this.bb.__vector(this.bb_pos + offset), this.bb.__vector_len(this.bb_pos + offset)) : null;
    };
    JsonToBinaryResponse.startJsonToBinaryResponse = function (builder) {
        builder.startObject(2);
    };
    JsonToBinaryResponse.addSessionId = function (builder, sessionId) {
        builder.addFieldInt32(0, sessionId, 0);
    };
    JsonToBinaryResponse.addJson = function (builder, jsonOffset) {
        builder.addFieldOffset(1, jsonOffset, 0);
    };
    JsonToBinaryResponse.createJsonVector = function (builder, data) {
        builder.startVector(1, data.length, 1);
        for (var i = data.length - 1; i >= 0; i--) {
            builder.addInt8(data[i]);
        }
        return builder.endVector();
    };
    JsonToBinaryResponse.startJsonVector = function (builder, numElems) {
        builder.startVector(1, numElems, 1);
    };
    JsonToBinaryResponse.endJsonToBinaryResponse = function (builder) {
        var offset = builder.endObject();
        return offset;
    };
    JsonToBinaryResponse.createJsonToBinaryResponse = function (builder, sessionId, jsonOffset) {
        JsonToBinaryResponse.startJsonToBinaryResponse(builder);
        JsonToBinaryResponse.addSessionId(builder, sessionId);
        JsonToBinaryResponse.addJson(builder, jsonOffset);
        return JsonToBinaryResponse.endJsonToBinaryResponse(builder);
    };
    return JsonToBinaryResponse;
}());
exports.JsonToBinaryResponse = JsonToBinaryResponse;
//# sourceMappingURL=json-to-binary-response.js.map