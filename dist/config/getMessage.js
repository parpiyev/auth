"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessage = void 0;
var data = require("./messages.json").data;
function getMessage(query, language) {
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var el = data_1[_i];
        var message = el;
        var object = query;
        var result = el;
        var count = 0;
        var counter = 0;
        for (var key in query) {
            if (message[key] == object[key])
                counter++;
            count++;
        }
        if (counter == count)
            return result.text[language];
    }
    return "";
}
exports.getMessage = getMessage;
