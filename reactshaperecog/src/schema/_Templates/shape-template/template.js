"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.Template = void 0;
var flatbuffers = require("flatbuffers");
var vec2_js_1 = require("../shape-template/vec2.js");
var Template = /** @class */ (function () {
    function Template() {
        this.bb = null;
        this.bb_pos = 0;
    }
    Template.prototype.__init = function (i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    };
    Template.getRootAsTemplate = function (bb, obj) {
        return (obj || new Template()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    Template.getSizePrefixedRootAsTemplate = function (bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new Template()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    Template.prototype.name = function (optionalEncoding) {
        var offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.__string(this.bb_pos + offset, optionalEncoding) : null;
    };
    Template.prototype.points = function (index, obj) {
        var offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? (obj || new vec2_js_1.Vec2()).__init(this.bb.__vector(this.bb_pos + offset) + index * 8, this.bb) : null;
    };
    Template.prototype.pointsLength = function () {
        var offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.__vector_len(this.bb_pos + offset) : 0;
    };
    Template.startTemplate = function (builder) {
        builder.startObject(2);
    };
    Template.addName = function (builder, nameOffset) {
        builder.addFieldOffset(0, nameOffset, 0);
    };
    Template.addPoints = function (builder, pointsOffset) {
        builder.addFieldOffset(1, pointsOffset, 0);
    };
    Template.startPointsVector = function (builder, numElems) {
        builder.startVector(8, numElems, 4);
    };
    Template.endTemplate = function (builder) {
        var offset = builder.endObject();
        return offset;
    };
    Template.finishTemplateBuffer = function (builder, offset) {
        builder.finish(offset);
    };
    Template.finishSizePrefixedTemplateBuffer = function (builder, offset) {
        builder.finish(offset, undefined, true);
    };
    Template.createTemplate = function (builder, nameOffset, pointsOffset) {
        Template.startTemplate(builder);
        Template.addName(builder, nameOffset);
        Template.addPoints(builder, pointsOffset);
        return Template.endTemplate(builder);
    };
    return Template;
}());
exports.Template = Template;
//# sourceMappingURL=template.js.map