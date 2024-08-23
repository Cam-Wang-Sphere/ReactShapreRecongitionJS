"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TIMMappedAreaUpdate = void 0;
var flatbuffers = __importStar(require("flatbuffers"));
var etiminteract_area_orientation_js_1 = require("../wsschema/etiminteract-area-orientation.js");
var etiminteract_area_shape_type_js_1 = require("../wsschema/etiminteract-area-shape-type.js");
var linear_color_js_1 = require("../wsschema/linear-color.js");
var vec2_js_1 = require("../wsschema/vec2.js");
var TIMMappedAreaUpdate = /** @class */ (function () {
    function TIMMappedAreaUpdate() {
        this.bb = null;
        this.bb_pos = 0;
    }
    TIMMappedAreaUpdate.prototype.__init = function (i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    };
    TIMMappedAreaUpdate.getRootAsTIMMappedAreaUpdate = function (bb, obj) {
        return (obj || new TIMMappedAreaUpdate()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    TIMMappedAreaUpdate.getSizePrefixedRootAsTIMMappedAreaUpdate = function (bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new TIMMappedAreaUpdate()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    TIMMappedAreaUpdate.prototype.sessionId = function () {
        var offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
    };
    TIMMappedAreaUpdate.prototype.handle = function () {
        var offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
    };
    TIMMappedAreaUpdate.prototype.rotation = function (obj) {
        var offset = this.bb.__offset(this.bb_pos, 8);
        return offset ? (obj || new vec2_js_1.Vec2()).__init(this.bb_pos + offset, this.bb) : null;
    };
    TIMMappedAreaUpdate.prototype.color = function (obj) {
        var offset = this.bb.__offset(this.bb_pos, 10);
        return offset ? (obj || new linear_color_js_1.LinearColor()).__init(this.bb_pos + offset, this.bb) : null;
    };
    TIMMappedAreaUpdate.prototype.orientation = function () {
        var offset = this.bb.__offset(this.bb_pos, 12);
        return offset ? this.bb.readUint8(this.bb_pos + offset) : etiminteract_area_orientation_js_1.ETIMInteractAreaOrientation.Horizontal;
    };
    TIMMappedAreaUpdate.prototype.shape = function () {
        var offset = this.bb.__offset(this.bb_pos, 14);
        return offset ? this.bb.readUint8(this.bb_pos + offset) : etiminteract_area_shape_type_js_1.ETIMInteractAreaShapeType.Rectangle;
    };
    TIMMappedAreaUpdate.prototype.dimensions = function (obj) {
        var offset = this.bb.__offset(this.bb_pos, 16);
        return offset ? (obj || new vec2_js_1.Vec2()).__init(this.bb_pos + offset, this.bb) : null;
    };
    TIMMappedAreaUpdate.prototype.distance = function () {
        var offset = this.bb.__offset(this.bb_pos, 18);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
    };
    TIMMappedAreaUpdate.startTIMMappedAreaUpdate = function (builder) {
        builder.startObject(8);
    };
    TIMMappedAreaUpdate.addSessionId = function (builder, sessionId) {
        builder.addFieldInt32(0, sessionId, 0);
    };
    TIMMappedAreaUpdate.addHandle = function (builder, handle) {
        builder.addFieldInt32(1, handle, 0);
    };
    TIMMappedAreaUpdate.addRotation = function (builder, rotationOffset) {
        builder.addFieldStruct(2, rotationOffset, 0);
    };
    TIMMappedAreaUpdate.addColor = function (builder, colorOffset) {
        builder.addFieldStruct(3, colorOffset, 0);
    };
    TIMMappedAreaUpdate.addOrientation = function (builder, orientation) {
        builder.addFieldInt8(4, orientation, etiminteract_area_orientation_js_1.ETIMInteractAreaOrientation.Horizontal);
    };
    TIMMappedAreaUpdate.addShape = function (builder, shape) {
        builder.addFieldInt8(5, shape, etiminteract_area_shape_type_js_1.ETIMInteractAreaShapeType.Rectangle);
    };
    TIMMappedAreaUpdate.addDimensions = function (builder, dimensionsOffset) {
        builder.addFieldStruct(6, dimensionsOffset, 0);
    };
    TIMMappedAreaUpdate.addDistance = function (builder, distance) {
        builder.addFieldFloat32(7, distance, 0.0);
    };
    TIMMappedAreaUpdate.endTIMMappedAreaUpdate = function (builder) {
        var offset = builder.endObject();
        return offset;
    };
    return TIMMappedAreaUpdate;
}());
exports.TIMMappedAreaUpdate = TIMMappedAreaUpdate;
//# sourceMappingURL=timmapped-area-update.js.map