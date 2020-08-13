#!/usr/bin/env node

const path = require('path');
const { execSync } = require('child_process');

const { version: npmVersion } = require(path.resolve(
    __dirname,
    '../package.json'
));

const npmCommand = 'npm view @nathanfriend/website-3.0 version';
const publishedVersion = execSync(npmCommand).toString().trim();

// Logs "true" if the current version is up-to-date.
// "false" = a new deployment needs to be executed.
console.log(npmVersion === publishedVersion);
