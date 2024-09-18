"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericBatchResponse = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */
var flatbuffers = require("flatbuffers");
var generic_binary_wrapper_js_1 = require("../wsschema/generic-binary-wrapper.js");
var GenericBatchResponse = /** @class */ (function () {
    function GenericBatchResponse() {
        this.bb = null;
        this.bb_pos = 0;
    }
    GenericBatchResponse.prototype.__init = function (i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    };
    GenericBatchResponse.getRootAsGenericBatchResponse = function (bb, obj) {
        return (obj || new GenericBatchResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    GenericBatchResponse.getSizePrefixedRootAsGenericBatchResponse = function (bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new GenericBatchResponse()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    GenericBatchResponse.prototype.sessionId = function () {
        var offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
    };
    GenericBatchResponse.prototype.messages = function (index, obj) {
        var offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? (obj || new generic_binary_wrapper_js_1.GenericBinaryWrapper()).__init(this.bb.__indirect(this.bb.__vector(this.bb_pos + offset) + index * 4), this.bb) : null;
    };
    GenericBatchResponse.prototype.messagesLength = function () {
        var offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    };
    GenericBatchResponse.startGenericBatchResponse = function (builder) {
        builder.startObject(2);
    };
    GenericBatchResponse.addSessionId = function (builder, sessionId) {
        builder.addFieldInt32(0, sessionId, 0);
    };
    GenericBatchResponse.addMessages = function (builder, messagesOffset) {
        builder.addFieldOffset(1, messagesOffset, 0);
    };
    GenericBatchResponse.createMessagesVector = function (builder, data) {
        builder.startVector(4, data.length, 4);
        for (var i = data.length - 1; i >= 0; i--) {
            builder.addOffset(data[i]);
        }
        return builder.endVector();
    };
    GenericBatchResponse.startMessagesVector = function (builder, numElems) {
        builder.startVector(4, numElems, 4);
    };
    GenericBatchResponse.endGenericBatchResponse = function (builder) {
        var offset = builder.endObject();
        return offset;
    };
    GenericBatchResponse.createGenericBatchResponse = function (builder, sessionId, messagesOffset) {
        GenericBatchResponse.startGenericBatchResponse(builder);
        GenericBatchResponse.addSessionId(builder, sessionId);
        GenericBatchResponse.addMessages(builder, messagesOffset);
        return GenericBatchResponse.endGenericBatchResponse(builder);
    };
    return GenericBatchResponse;
}());
exports.GenericBatchResponse = GenericBatchResponse;
//# sourceMappingURL=generic-batch-response.js.map