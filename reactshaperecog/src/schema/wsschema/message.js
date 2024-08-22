"use strict";
// automatically generated by the FlatBuffers compiler, do not modify
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
exports.unionToMessage = unionToMessage;
exports.unionListToMessage = unionListToMessage;
var client_login_response_js_1 = require("../wsschema/client-login-response.js");
var generic_batch_request_js_1 = require("../wsschema/generic-batch-request.js");
var generic_batch_response_js_1 = require("../wsschema/generic-batch-response.js");
var json_to_binary_request_js_1 = require("../wsschema/json-to-binary-request.js");
var json_to_binary_response_js_1 = require("../wsschema/json-to-binary-response.js");
var media_plane_login_request_js_1 = require("../wsschema/media-plane-login-request.js");
var mobile_to_media_plane_login_request_js_1 = require("../wsschema/mobile-to-media-plane-login-request.js");
var mobile_to_media_plane_logout_request_js_1 = require("../wsschema/mobile-to-media-plane-logout-request.js");
var phase_response_js_1 = require("../wsschema/phase-response.js");
var ping_media_plane_request_js_1 = require("../wsschema/ping-media-plane-request.js");
var ping_media_plane_response_js_1 = require("../wsschema/ping-media-plane-response.js");
var ping_media_plane_unreliable_request_js_1 = require("../wsschema/ping-media-plane-unreliable-request.js");
var ping_media_plane_unreliable_response_js_1 = require("../wsschema/ping-media-plane-unreliable-response.js");
var ping_server_request_js_1 = require("../wsschema/ping-server-request.js");
var ping_server_response_js_1 = require("../wsschema/ping-server-response.js");
var ping_server_unreliable_request_js_1 = require("../wsschema/ping-server-unreliable-request.js");
var ping_server_unreliable_response_js_1 = require("../wsschema/ping-server-unreliable-response.js");
var player_name_request_js_1 = require("../wsschema/player-name-request.js");
var player_name_response_js_1 = require("../wsschema/player-name-response.js");
var repeater_binary_response_js_1 = require("../wsschema/repeater-binary-response.js");
var repeater_broadcast_binary_response_js_1 = require("../wsschema/repeater-broadcast-binary-response.js");
var repeater_login_request_js_1 = require("../wsschema/repeater-login-request.js");
var shape_request_js_1 = require("../wsschema/shape-request.js");
var shape_response_js_1 = require("../wsschema/shape-response.js");
var timinteractable_data_js_1 = require("../wsschema/timinteractable-data.js");
var timinteractable_update_js_1 = require("../wsschema/timinteractable-update.js");
var timmapped_area_add_js_1 = require("../wsschema/timmapped-area-add.js");
var timmapped_area_removed_js_1 = require("../wsschema/timmapped-area-removed.js");
var timmapped_area_update_js_1 = require("../wsschema/timmapped-area-update.js");
var timplayer_input_js_1 = require("../wsschema/timplayer-input.js");
var web_client_login_request_js_1 = require("../wsschema/web-client-login-request.js");
var web_client_login_response_js_1 = require("../wsschema/web-client-login-response.js");
var web_client_logout_request_js_1 = require("../wsschema/web-client-logout-request.js");
var Message;
(function (Message) {
    Message[Message["NONE"] = 0] = "NONE";
    Message[Message["PingServerRequest"] = 1] = "PingServerRequest";
    Message[Message["PingServerResponse"] = 2] = "PingServerResponse";
    Message[Message["PingServerUnreliableRequest"] = 3] = "PingServerUnreliableRequest";
    Message[Message["PingServerUnreliableResponse"] = 4] = "PingServerUnreliableResponse";
    Message[Message["PingMediaPlaneRequest"] = 5] = "PingMediaPlaneRequest";
    Message[Message["PingMediaPlaneResponse"] = 6] = "PingMediaPlaneResponse";
    Message[Message["PingMediaPlaneUnreliableRequest"] = 7] = "PingMediaPlaneUnreliableRequest";
    Message[Message["PingMediaPlaneUnreliableResponse"] = 8] = "PingMediaPlaneUnreliableResponse";
    Message[Message["ClientLoginResponse"] = 9] = "ClientLoginResponse";
    Message[Message["MediaPlaneLoginRequest"] = 10] = "MediaPlaneLoginRequest";
    Message[Message["MobileToMediaPlaneLoginRequest"] = 11] = "MobileToMediaPlaneLoginRequest";
    Message[Message["MobileToMediaPlaneLogoutRequest"] = 12] = "MobileToMediaPlaneLogoutRequest";
    Message[Message["JsonToBinaryRequest"] = 13] = "JsonToBinaryRequest";
    Message[Message["JsonToBinaryResponse"] = 14] = "JsonToBinaryResponse";
    Message[Message["RepeaterLoginRequest"] = 15] = "RepeaterLoginRequest";
    Message[Message["WebClientLoginRequest"] = 16] = "WebClientLoginRequest";
    Message[Message["WebClientLoginResponse"] = 17] = "WebClientLoginResponse";
    Message[Message["WebClientLogoutRequest"] = 18] = "WebClientLogoutRequest";
    Message[Message["RepeaterBinaryResponse"] = 19] = "RepeaterBinaryResponse";
    Message[Message["RepeaterBroadcastBinaryResponse"] = 20] = "RepeaterBroadcastBinaryResponse";
    Message[Message["GenericBatchRequest"] = 21] = "GenericBatchRequest";
    Message[Message["GenericBatchResponse"] = 22] = "GenericBatchResponse";
    Message[Message["ShapeRequest"] = 23] = "ShapeRequest";
    Message[Message["ShapeResponse"] = 24] = "ShapeResponse";
    Message[Message["PlayerNameRequest"] = 25] = "PlayerNameRequest";
    Message[Message["PlayerNameResponse"] = 26] = "PlayerNameResponse";
    Message[Message["PhaseResponse"] = 27] = "PhaseResponse";
    Message[Message["TIMPlayerInput"] = 28] = "TIMPlayerInput";
    Message[Message["TIMMappedAreaAdd"] = 29] = "TIMMappedAreaAdd";
    Message[Message["TIMMappedAreaUpdate"] = 30] = "TIMMappedAreaUpdate";
    Message[Message["TIMMappedAreaRemoved"] = 31] = "TIMMappedAreaRemoved";
    Message[Message["TIMInteractableData"] = 32] = "TIMInteractableData";
    Message[Message["TIMInteractableUpdate"] = 33] = "TIMInteractableUpdate";
})(Message || (exports.Message = Message = {}));
function unionToMessage(type, accessor) {
    switch (Message[type]) {
        case 'NONE': return null;
        case 'PingServerRequest': return accessor(new ping_server_request_js_1.PingServerRequest());
        case 'PingServerResponse': return accessor(new ping_server_response_js_1.PingServerResponse());
        case 'PingServerUnreliableRequest': return accessor(new ping_server_unreliable_request_js_1.PingServerUnreliableRequest());
        case 'PingServerUnreliableResponse': return accessor(new ping_server_unreliable_response_js_1.PingServerUnreliableResponse());
        case 'PingMediaPlaneRequest': return accessor(new ping_media_plane_request_js_1.PingMediaPlaneRequest());
        case 'PingMediaPlaneResponse': return accessor(new ping_media_plane_response_js_1.PingMediaPlaneResponse());
        case 'PingMediaPlaneUnreliableRequest': return accessor(new ping_media_plane_unreliable_request_js_1.PingMediaPlaneUnreliableRequest());
        case 'PingMediaPlaneUnreliableResponse': return accessor(new ping_media_plane_unreliable_response_js_1.PingMediaPlaneUnreliableResponse());
        case 'ClientLoginResponse': return accessor(new client_login_response_js_1.ClientLoginResponse());
        case 'MediaPlaneLoginRequest': return accessor(new media_plane_login_request_js_1.MediaPlaneLoginRequest());
        case 'MobileToMediaPlaneLoginRequest': return accessor(new mobile_to_media_plane_login_request_js_1.MobileToMediaPlaneLoginRequest());
        case 'MobileToMediaPlaneLogoutRequest': return accessor(new mobile_to_media_plane_logout_request_js_1.MobileToMediaPlaneLogoutRequest());
        case 'JsonToBinaryRequest': return accessor(new json_to_binary_request_js_1.JsonToBinaryRequest());
        case 'JsonToBinaryResponse': return accessor(new json_to_binary_response_js_1.JsonToBinaryResponse());
        case 'RepeaterLoginRequest': return accessor(new repeater_login_request_js_1.RepeaterLoginRequest());
        case 'WebClientLoginRequest': return accessor(new web_client_login_request_js_1.WebClientLoginRequest());
        case 'WebClientLoginResponse': return accessor(new web_client_login_response_js_1.WebClientLoginResponse());
        case 'WebClientLogoutRequest': return accessor(new web_client_logout_request_js_1.WebClientLogoutRequest());
        case 'RepeaterBinaryResponse': return accessor(new repeater_binary_response_js_1.RepeaterBinaryResponse());
        case 'RepeaterBroadcastBinaryResponse': return accessor(new repeater_broadcast_binary_response_js_1.RepeaterBroadcastBinaryResponse());
        case 'GenericBatchRequest': return accessor(new generic_batch_request_js_1.GenericBatchRequest());
        case 'GenericBatchResponse': return accessor(new generic_batch_response_js_1.GenericBatchResponse());
        case 'ShapeRequest': return accessor(new shape_request_js_1.ShapeRequest());
        case 'ShapeResponse': return accessor(new shape_response_js_1.ShapeResponse());
        case 'PlayerNameRequest': return accessor(new player_name_request_js_1.PlayerNameRequest());
        case 'PlayerNameResponse': return accessor(new player_name_response_js_1.PlayerNameResponse());
        case 'PhaseResponse': return accessor(new phase_response_js_1.PhaseResponse());
        case 'TIMPlayerInput': return accessor(new timplayer_input_js_1.TIMPlayerInput());
        case 'TIMMappedAreaAdd': return accessor(new timmapped_area_add_js_1.TIMMappedAreaAdd());
        case 'TIMMappedAreaUpdate': return accessor(new timmapped_area_update_js_1.TIMMappedAreaUpdate());
        case 'TIMMappedAreaRemoved': return accessor(new timmapped_area_removed_js_1.TIMMappedAreaRemoved());
        case 'TIMInteractableData': return accessor(new timinteractable_data_js_1.TIMInteractableData());
        case 'TIMInteractableUpdate': return accessor(new timinteractable_update_js_1.TIMInteractableUpdate());
        default: return null;
    }
}
function unionListToMessage(type, accessor, index) {
    switch (Message[type]) {
        case 'NONE': return null;
        case 'PingServerRequest': return accessor(index, new ping_server_request_js_1.PingServerRequest());
        case 'PingServerResponse': return accessor(index, new ping_server_response_js_1.PingServerResponse());
        case 'PingServerUnreliableRequest': return accessor(index, new ping_server_unreliable_request_js_1.PingServerUnreliableRequest());
        case 'PingServerUnreliableResponse': return accessor(index, new ping_server_unreliable_response_js_1.PingServerUnreliableResponse());
        case 'PingMediaPlaneRequest': return accessor(index, new ping_media_plane_request_js_1.PingMediaPlaneRequest());
        case 'PingMediaPlaneResponse': return accessor(index, new ping_media_plane_response_js_1.PingMediaPlaneResponse());
        case 'PingMediaPlaneUnreliableRequest': return accessor(index, new ping_media_plane_unreliable_request_js_1.PingMediaPlaneUnreliableRequest());
        case 'PingMediaPlaneUnreliableResponse': return accessor(index, new ping_media_plane_unreliable_response_js_1.PingMediaPlaneUnreliableResponse());
        case 'ClientLoginResponse': return accessor(index, new client_login_response_js_1.ClientLoginResponse());
        case 'MediaPlaneLoginRequest': return accessor(index, new media_plane_login_request_js_1.MediaPlaneLoginRequest());
        case 'MobileToMediaPlaneLoginRequest': return accessor(index, new mobile_to_media_plane_login_request_js_1.MobileToMediaPlaneLoginRequest());
        case 'MobileToMediaPlaneLogoutRequest': return accessor(index, new mobile_to_media_plane_logout_request_js_1.MobileToMediaPlaneLogoutRequest());
        case 'JsonToBinaryRequest': return accessor(index, new json_to_binary_request_js_1.JsonToBinaryRequest());
        case 'JsonToBinaryResponse': return accessor(index, new json_to_binary_response_js_1.JsonToBinaryResponse());
        case 'RepeaterLoginRequest': return accessor(index, new repeater_login_request_js_1.RepeaterLoginRequest());
        case 'WebClientLoginRequest': return accessor(index, new web_client_login_request_js_1.WebClientLoginRequest());
        case 'WebClientLoginResponse': return accessor(index, new web_client_login_response_js_1.WebClientLoginResponse());
        case 'WebClientLogoutRequest': return accessor(index, new web_client_logout_request_js_1.WebClientLogoutRequest());
        case 'RepeaterBinaryResponse': return accessor(index, new repeater_binary_response_js_1.RepeaterBinaryResponse());
        case 'RepeaterBroadcastBinaryResponse': return accessor(index, new repeater_broadcast_binary_response_js_1.RepeaterBroadcastBinaryResponse());
        case 'GenericBatchRequest': return accessor(index, new generic_batch_request_js_1.GenericBatchRequest());
        case 'GenericBatchResponse': return accessor(index, new generic_batch_response_js_1.GenericBatchResponse());
        case 'ShapeRequest': return accessor(index, new shape_request_js_1.ShapeRequest());
        case 'ShapeResponse': return accessor(index, new shape_response_js_1.ShapeResponse());
        case 'PlayerNameRequest': return accessor(index, new player_name_request_js_1.PlayerNameRequest());
        case 'PlayerNameResponse': return accessor(index, new player_name_response_js_1.PlayerNameResponse());
        case 'PhaseResponse': return accessor(index, new phase_response_js_1.PhaseResponse());
        case 'TIMPlayerInput': return accessor(index, new timplayer_input_js_1.TIMPlayerInput());
        case 'TIMMappedAreaAdd': return accessor(index, new timmapped_area_add_js_1.TIMMappedAreaAdd());
        case 'TIMMappedAreaUpdate': return accessor(index, new timmapped_area_update_js_1.TIMMappedAreaUpdate());
        case 'TIMMappedAreaRemoved': return accessor(index, new timmapped_area_removed_js_1.TIMMappedAreaRemoved());
        case 'TIMInteractableData': return accessor(index, new timinteractable_data_js_1.TIMInteractableData());
        case 'TIMInteractableUpdate': return accessor(index, new timinteractable_update_js_1.TIMInteractableUpdate());
        default: return null;
    }
}
//# sourceMappingURL=message.js.map