var http = require("http");

function getEmoji(options, callback) {
    http.get(options, function (res) {
        console.log(res.req.method, res.req.path);
        var body = "", chunks = 0;

        res.setEncoding("utf8");
        res.on("data", function (chunk) {
            console.log("Chunk", (++chunks), "received...");
            body += chunk;
        });

        res.on("end", function () {
            console.log("Request ended.");
            callback(body);
        });
    }).on("error", function (e) {
        console.log(e);
    });
}

function getValue(arr, i) {
    return (typeof arr[i] === "string") ? arr[i].trim() : null;
}

function getMatchData(match) {
    return {
        code:   getValue(match, 1),
        status: getValue(match, 2),
        icon:   getValue(match, 3),
        name:   getValue(match, 4)
    };
}

/**
 * Make an http request to unicode.org, and perform an action on each emoji.
 * @param  {object}   options The HTTP request options.
 * @param  {function} onMatch Invoked on each matched emoji with its data as the
 *                            first argument.
 * @param  {function} onEnd   Invoked when the parsing has finished.
 */
module.exports = function (options, onMatch, onEnd) {
    getEmoji(options, function (data) {
        var regex = new RegExp(/([0-9A-F ]+)\;([ a-z\-]+)\#([^\w]+)(.+)/g);

        while (true) {
            var match = regex.exec(data);
            if (match !== null) {
                onMatch(getMatchData(match));
            } else {
                break;
            }
        }

        if (typeof onEnd === "function") {
            onEnd(); 
        }
    });
};