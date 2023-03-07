#!/usr/bin/env node

import moment from "moment-timezone";

// const [,, ...arguments] = process.argv;

//node cli.js -n 35.92 -w 79.05 -z America/New_York

var ns = process.argv[2];
var lattitude = process.argv[3];
var ew = process.argv[4];
var longitude = process.argv[5];
var z = process.argv[6];
var where = process.argv[7];

main();

function main () {

if (ns == "-h") {
    console.log("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE");
    console.log("   -h            Show this help message and exit.");
    console.log("   -n, -s        Latitude: N positive; S negative.");
    console.log("   -e, -w        Longitude: E positive; W negative.");
    console.log("   -z            Time zone: uses tz.guess() from moment-timezone by default.");
    console.log("   -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.");
    console.log("   -j            Echo pretty JSON from open-meteo API and exit.");
    return;
    ;
}

//extract system timezone
const timezone = moment.tz.guess();

const url = "https://api.open-meteo.com/v1/forecast?latitude=" + lattitude + "&longitude=" + longitude + "&timezone=" + where + "&current_weather=true&daily=precipitation_hours";

fetch(url)
  .then((response) => response.json())
  .then((data) => console.log(data));
}




