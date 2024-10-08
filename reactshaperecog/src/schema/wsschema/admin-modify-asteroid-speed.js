"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModifyAsteroidSpeed = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */
var flatbuffers = require("flatbuffers");
var AdminModifyAsteroidSpeed = /** @class */ (function () {
    function AdminModifyAsteroidSpeed() {
        this.bb = null;
        this.bb_pos = 0;
    }
    AdminModifyAsteroidSpeed.prototype.__init = function (i, bb) {
        this.bb_pos = i;
        this.bb = bb;
        return this;
    };
    AdminModifyAsteroidSpeed.getRootAsAdminModifyAsteroidSpeed = function (bb, obj) {
        return (obj || new AdminModifyAsteroidSpeed()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    AdminModifyAsteroidSpeed.getSizePrefixedRootAsAdminModifyAsteroidSpeed = function (bb, obj) {
        bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
        return (obj || new AdminModifyAsteroidSpeed()).__init(bb.readInt32(bb.position()) + bb.position(), bb);
    };
    AdminModifyAsteroidSpeed.prototype.sessionId = function () {
        var offset = this.bb.__offset(this.bb_pos, 4);
        return offset ? this.bb.readInt32(this.bb_pos + offset) : 0;
    };
    AdminModifyAsteroidSpeed.prototype.speedMod = function () {
        var offset = this.bb.__offset(this.bb_pos, 6);
        return offset ? this.bb.readFloat32(this.bb_pos + offset) : 0.0;
    };
    AdminModifyAsteroidSpeed.startAdminModifyAsteroidSpeed = function (builder) {
        builder.startObject(2);
    };
    AdminModifyAsteroidSpeed.addSessionId = function (builder, sessionId) {
        builder.addFieldInt32(0, sessionId, 0);
    };
    AdminModifyAsteroidSpeed.addSpeedMod = function (builder, speedMod) {
        builder.addFieldFloat32(1, speedMod, 0.0);
    };
    AdminModifyAsteroidSpeed.endAdminModifyAsteroidSpeed = function (builder) {
        var offset = builder.endObject();
        return offset;
    };
    AdminModifyAsteroidSpeed.createAdminModifyAsteroidSpeed = function (builder, sessionId, speedMod) {
        AdminModifyAsteroidSpeed.startAdminModifyAsteroidSpeed(builder);
        AdminModifyAsteroidSpeed.addSessionId(builder, sessionId);
        AdminModifyAsteroidSpeed.addSpeedMod(builder, speedMod);
        return AdminModifyAsteroidSpeed.endAdminModifyAsteroidSpeed(builder);
    };
    return AdminModifyAsteroidSpeed;
}());
exports.AdminModifyAsteroidSpeed = AdminModifyAsteroidSpeed;
//# sourceMappingURL=admin-modify-asteroid-speed.js.map