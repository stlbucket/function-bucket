#!/usr/bin/env node
const yargs = require('yargs');

export async function run() {
  try {
    yargs
    .help()
    .argv;
  } catch (e) {
    process.exit()
  }
}
