#!/usr/bin/env node

// Get dependencies
const commander = require('commander');
const matcher = require('./matcher/matcher.js')
const fs = require('fs');

// Handle command line arguments
commander
  .version('0.1.0', '-v, --version')
  .usage('<REGEX>')
  .arguments('<REGEX>')
  .parse(process.argv)

if (process.argv.length !== 3) {
  console.error('Expected 1 argument. See --help.');
  process.exit(1);
}

// Grab input from stdin synchronously
// TODO: find a platform agnostic stdin path
const data = fs.readFileSync('/dev/stdin', 'utf-8');
// call the matcher
const result = matcher.match(data, process.argv[2]);
if (result) {
  console.log(`Line ${ result.line }.\n`);
  console.log(result.matching + '\n');
} else
  console.log('No match found.')
