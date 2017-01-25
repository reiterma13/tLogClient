"use strict";
/**
 * Created by salho on 23.11.16.
 */
var ip = require('ip');
var replace = require('replace');
var address = ip.address();
console.log(address);
var hostRegex = /http:\/\/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/
replace(
{
  regex: hostRegex,
  replacement: "http://"+address,
  paths: ['./src/providers/serverconfig.ts'],
  recursive: false,
  silent: false
});

