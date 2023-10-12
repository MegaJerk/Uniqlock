import { seasonalData, videosBySeason, musicBySeason, colorBySeason } from "./defaultData.js";

// when initialized will hold references to the various seasons
// that are available to select videos / music from
var availableSeasons = getAvailableSeasons([1,2,3,4,5,6]);

// holds the user's custom configurations of how they want the app to behave
// initializes to a default custom config
var customSeasonalData = createCustomSeasonData();

// contains references to any overrides that the user has made to how the app
// will make available the music tracks
// initializes to a default custom config
var musicOverrides = createMusicOverrides();

// contains a reference to all of the available video filenames, per season,
// per time of day.
var availableVideoSeconds = getAvailableVideoSeconds(availableSeasons.selected, videosBySeason);

// contains a reference to all of the available hour video filenames,
// and a few properties based on seasonalData[season]
var availableVideoHours = getAvailableVideoHours(availableSeasons.hours, videosBySeason, seasonalData);

// contains a reference to all of the available music filenames, per season,
// per time of day.
var availableMusicMinutes = getAvailableMusicMinutes(availableSeasons, musicBySeason);

// contains a reference to all of the available hour music filenames,
// per season, per time of day
var availableMusicHours = getAvailableMusicHours(availableSeasons.hours, seasonalData, musicOverrides);


// Available Resources Functions
function getAvailableSeasons(selectedSeasons) {
  var availableSeasonsObject = {};

  availableSeasonsObject["selected"] = selectedSeasons;

  availableSeasonsObject["highest"] = Math.max(...selectedSeasons);

  availableSeasonsObject["nights"] = selectedSeasons.filter(function(season){
    return seasonalData[season]["hasNight"]; 
  });

  availableSeasonsObject["midnights"] = selectedSeasons.filter(function(season){
    return seasonalData[season]["hasMidnight"]; 
  });

  availableSeasonsObject["hours"] = selectedSeasons.filter(function(season){
    return seasonalData[season]["hasHours"]; 
  });

  return availableSeasonsObject;
}

function createCustomSeasonData(userCustomSeasonalData) {
  // thanks Angus Croll, wherever you are
  if (({}).toString.call(userCustomSeasonalData).match(/\s([a-zA-Z]+)/)[1].toLowerCase() !== "object") {
    userCustomSeasonalData = {
      hasDay: true, 
      hasNight: true,
      hasMidnight: true,
      nightStartHour: 21,
      midnightStartHour: 0,
      midnightEndHour: 3,
      nightEndHour: 6,
      hasHours: true,
			lockedStartHour: 21,
			lockedEndHour: 6,
			glowStartHour: 21,
			glowEndHour: 6
    };
  }

  return userCustomSeasonalData;
}

function createMusicOverrides(userMusicOverrides) {

  if (({}).toString.call(userMusicOverrides).match(/\s([a-zA-Z]+)/)[1].toLowerCase() !== "object") {
      userMusicOverrides = {
      hourRules: {
        night: ["Special - Hour - Season 2.ogg"],
        midnight: ["Special - Hour - Season 2.ogg"]
      }
    };
  }

  return userMusicOverrides;
}

function getAvailableVideoSeconds(selectedSeasons, videosBySeason) {

  var videoSecondsObject = {};
  var day = [];
  var night = [];
  var midnight = [];

  selectedSeasons.forEach(function(season){
    day = day.concat(videosBySeason[season]["seconds"]["day"]);
    night = night.concat(videosBySeason[season]["seconds"]["night"]);
    midnight = midnight.concat(videosBySeason[season]["seconds"]["midnight"]);
  });

  videoSecondsObject["day"] = day;
  videoSecondsObject["night"] = night;
  videoSecondsObject["midnight"] = midnight;

  return videoSecondsObject;
}

function getAvailableVideoHours(selectedHours, videosBySeason, seasonalData) {

  var hourVideosObject = {};
  selectedHours.forEach(function(season){
    hourVideosObject[season] = {};
    hourVideosObject[season]["hoursFollowTime"] = seasonalData[season]["hoursFollowTime"];
    hourVideosObject[season]["hours"] = videosBySeason[season]["hours"];

  });

  return hourVideosObject;
}

function getAvailableMusicMinutes(availableSeasons, musicBySeason) {
  var musicMinutesObject = {};
  var day = [].concat(musicBySeason[availableSeasons["highest"]]["minutes"]["day"]);
  var night = [];
  var midnight = [];
  availableSeasons.selected.forEach(function(season){   
    night = [...new Set([...night, ...musicBySeason[season]["minutes"]["night"]])];
    midnight = [...new Set([...midnight, ...musicBySeason[season]["minutes"]["midnight"]])];
  });

  musicMinutesObject["day"] = day;
  musicMinutesObject["night"] = night;
  musicMinutesObject["midnight"] = midnight;

  return musicMinutesObject;
}

function getAvailableMusicHours(hourSeasons, seasonalData, musicOverrides) {

  var musicHoursObject = {};

  hourSeasons.forEach(function(season){

    var defaultKeys = ["day", "night", "midnight"];
    var currentSeasonHourlyMusicObject = {};
    var seasonHourMusicOverride = musicOverrides?.["hourRules"]?.[season] !== undefined;
    var universalHourMusicOverride =  Boolean(musicOverrides?.["hourRules"]?.["day"] ||
                                      musicOverrides?.["hourRules"]?.["night"] ||  
                                      musicOverrides?.["hourRules"]?.["midnight"]);

    if (seasonHourMusicOverride) {

      Object.keys(musicOverrides["hourRules"][season]).forEach(function(key){
        currentSeasonHourlyMusicObject[key] = musicOverrides["hourRules"][season][key];

        if (defaultKeys.indexOf(key) > -1) {
          // remove the keys we need to check to add default tracks
          defaultKeys.splice(defaultKeys.indexOf(key), 1);
        }
      });
    }

    if (seasonalData[season]["hasHourMusic"] && defaultKeys.length > 0) {
      // now we set the default values

      defaultKeys.forEach(function(key){
        // if there is actually something to add from the default repo...
        if (musicBySeason[season]["hours"][key].length > 0) {
          currentSeasonHourlyMusicObject[key] = musicBySeason[season]["hours"][key];
        }   
      });
    }

    if (Object.keys(currentSeasonHourlyMusicObject).length > 0) {

      if (universalHourMusicOverride) {
        // now we override anything that needs to be overriden by universal rules:
        ["day", "night", "midnight"].forEach(function(key){
          if (musicOverrides?.["hourRules"][key] !== undefined) {
            currentSeasonHourlyMusicObject[key] = musicOverrides["hourRules"][key];
          }
        });
      }   

      // now we just set the value of the season on availableMusicHours
      // to that of our currentSeasonHourlyMusicObject value.
      musicHoursObject[season] = currentSeasonHourlyMusicObject;
    }
  });

  return musicHoursObject;
}

export {availableSeasons, customSeasonalData, musicOverrides, availableVideoSeconds, availableVideoHours, availableMusicMinutes, availableMusicHours};