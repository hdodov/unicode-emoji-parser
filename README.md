# unicode-emoji-parser
Get the latest up-to-date emoji by parsing them directly from Unicode.

# Usage
You can either use the provided extractor to get the emoji or create your own one, in case you want a different format.

## Making your own extractor

Start by requiring the parser:

```js
var parse = require("./emoji-parser");
```

Then, invoke it:

```js
/**
 * Make an http request to unicode.org, and perform an action on each emoji.
 * @param  {object}   options The HTTP request options.
 * @param  {function} onMatch Invoked on each matched emoji with its data as the
 *                            first argument.
 * @param  {function} onEnd   Invoked when the parsing has finished.
 */
parse({
    host: "unicode.org",
    port: 80,
    path: "/Public/emoji/5.0/emoji-test.txt"
}, function (emoji) {
    // Save the current emoji somewhere.
    emoji.code      // Code point(s)
    emoji.status    // Status (fully-qualified or non-fully-qualified)
    emoji.icon      // The emoji itself
    emoji.name      // The emoji name
}, function () {
    // Executed when everything is parsed.
});
```

## Using the provided extractor

Open a terminal, navigate to the unicode-emoji-parser package and run:

```
node getemoji
```

If everything was successfull, two files will be created in the `output` directory. One will be human-readable and the other will be minified and smaller in file size.

# Changelog

1.0.0 - Initial release.