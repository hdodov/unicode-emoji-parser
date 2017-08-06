var fs = require("fs");
var path = require("path");
var parse = require("./emoji-parser");

function getKey(name) {
    var key = name.replace(/[^a-zA-Z0-9\-]/g, "-"); // Convert strange characters to dashes.
    key = key.replace(/\-{2,}/g, "-"); // Remove more than two occurences of a dash.
    key = key.replace(/^\-|\-$/g, ""); // Remove starting and ending dashes.
    return key.toLowerCase();
}

var output = {};

parse({
    host: "unicode.org",
    port: 80,
    path: "/Public/emoji/5.0/emoji-test.txt"
}, function (emoji) {
    var key = getKey(emoji.name);
    output[key] = emoji.icon;
    console.log("Parsed:", key);
}, function () {
    fs.writeFile(path.join(__dirname, "output/emoji.json"), JSON.stringify(output, undefined, 2));
    fs.writeFile(path.join(__dirname, "output/emoji.min.json"), JSON.stringify(output));
});