#!/usr/bin/env node

import moment from "moment-timezone";
import minimist from "minimist";


//node cli.js -n 35.92 -w 79.05 -z America/New_York

const args = minimist(process.argv.slice()); 

var ns = process.argv[2];
var lattitude = process.argv[3];
var ew = process.argv[4];
var longitude = process.argv[5];
var z = process.argv[6];
var where = process.argv[7];
var d = process.argv[8];
var day = process.argv[9];


if (ns == "-h") {
    console.log("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE");
    console.log("   -h            Show this help message and exit.");
    console.log("   -n, -s        Latitude: N positive; S negative.");
    console.log("   -e, -w        Longitude: E positive; W negative.");
    console.log("   -z            Time zone: uses tz.guess() from moment-timezone by default.");
    console.log("   -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.");
    console.log("   -j            Echo pretty JSON from open-meteo API and exit.");
    process.exit(0);
    ;
}

//extract system timezone
const timezone = moment.tz.guess();

const url = "https://api.open-meteo.com/v1/forecast?latitude=" + lattitude + "&longitude=" + longitude + "&timezone=" + where + "&current_weather=true&daily=precipitation_hours";


// Make a request
const response = await fetch(url);
const data = await response.json();
console.log(data);


//data.daily.precipitation_hours[0] would refer to TODAY. data.daily.precipitation_hours[1] would refer to TOMORROW, and so on.

const days = args.d 

if (days == 0) {
  console.log("today.")
} else if (days > 1) {
  console.log("in " + days + " days.")
} else {
  console.log("tomorrow.")
}




