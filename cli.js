#!/usr/bin/env node

import moment from "moment-timezone";
import minimist from "minimist";
import fetch from "node-fetch";


//node cli.js -n 35.92 -w 79.05 -z America/New_York

const args = minimist(process.argv.slice()); 

let latitude = undefined;
let longitude = undefined;



if ("n" in args) {
    latitude = args["n"];
} else if ("s" in args) {
    latitude = args["s"] * -1;
}

if ("e" in args) {
    longitude = args["e"];
} else if ("w" in args) {
    longitude = args["w"] * -1;
}

if ((latitude === undefined) || (-90 > latitude || 90 < latitude)) {
    console.log("out of range");
    process.exit(0);
}
if ((longitude === undefined) || (-180 > longitude || 180 < longitude)) {
    console.log("out of range");
    process.exit(0);
}


let timezone = moment.tz.guess();


if ("h" in args) {
    console.log("Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE");
    console.log("   -h            Show this help message and exit.");
    console.log("   -n, -s        Latitude: N positive; S negative.");
    console.log("   -e, -w        Longitude: E positive; W negative.");
    console.log("   -z            Time zone: uses tz.guess() from moment-timezone by default.");
    console.log("   -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.");
    console.log("   -j            Echo pretty JSON from open-meteo API and exit.");
    process.exit(0);
}


const url = "https://api.open-meteo.com/v1/forecast?latitude=" + latitude + "&longitude=" + longitude + "&timezone=" + timezone + "&current_weather=true&daily=precipitation_hours";

// Make a request
const response = await fetch(url);
const data = await response.json();

if("j" in args) {
    console.log(data);
    process.exit(0);
}

//data.daily.precipitation_hours[0] would refer to TODAY. data.daily.precipitation_hours[1] would refer to TOMORROW, and so on.

let days;
if ("d" in args) {
    days = args.d 
} else {
    days = 1;
}

if (days == 0) {
    if (data.daily.precipitation_hours[days] > 0) {
        console.log("you should probably wear galoshes today.");
    } else {
        console.log("you don't have to wear galoshes today.");
   }
   process.exit(0);
} else if (days > 1) {
   if (data.daily.precipitation_hours[days] > 0) {
        console.log("you should probably wear galoshes in" + days + "days.");
    } else {
       console.log("you don't have to wear galoshes in" + days + "days.");
   }
    process.exit(0);
} else {
   if (data.daily.precipitation_hours[1] > 0) {
        console.log("you should probably wear galoshes tomorrow.");
   } else {
       console.log("you don't have to wear galoshes tomorrow.");
        }
    process.exit(0);
}





