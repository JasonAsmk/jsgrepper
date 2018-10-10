const { EOL } = require('os');

/**
 * Returns the first match of regex in the given text file.
 * Return: { matching: string, line: number }
 */
function match(text, regex) {
  var regex = new RegExp(regex);
  var matching = text.match(regex);

  if (!matching) return null;
  // find relevant line
  var matchingIndex = matching.index;

  var index = -1;
  var lines = 0;
  while (index <= matchingIndex) {
    index++;
    index = text.indexOf(EOL, index);
    if (index != -1) {
      lines++;
    } else
      break;
  }
  return {
    matching: text.match(regex)[0],
    line: lines
  }
}

module.exports = {
  match
}
