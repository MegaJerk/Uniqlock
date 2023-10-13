/*jslint browser, long, indent2, white*/
/*global
  AudioContext, getComputedStyle, console
*/

import {availableSeasons, customSeasonalData, availableMusicMinutes, availableMusicHours} from "./modules/customizedData.js";
import {seasonalData, videosBySeason, colorBySeason} from "./modules/defaultData.js";

/////////////////////////////////////////////////////////////////
// AUDIO VARIABLES
/////////////////////////////////////////////////////////////////
var audioAssetsPath = "../assets/music/";
var audioTrack = {};
var audioBuffer = undefined;
var audioContext = new AudioContext();
var audioGain = audioContext.createGain();

/////////////////////////////////////////////////////////////////
// VIDEO VARIABLES
/////////////////////////////////////////////////////////////////
var videoAssetsPath = "../assets/videos/";
var videoTrack = {};
var videoHourTrack = {};
var videoObjectURL = undefined;
var videoHourObjectURL = undefined;

/////////////////////////////////////////////////////////////////
// DOM ELEMENTS
/////////////////////////////////////////////////////////////////
var viewContainer = document.getElementById("viewContainer");

var time1Container = document.querySelector("#time1");
var time2Container = document.querySelector("#time2");
var time1 = document.querySelector("#time1 .time");
var time2 = document.querySelector("#time2 .time");

var videoPlayer = document.querySelector("#videoPlayer");
var video = document.querySelector("#videoPlayer video");
var source = document.querySelector("#videoPlayer video source");

var hourPlayer = document.querySelector("#hourPlayer"); // CHANGE THIS NAME!
var hourVideo = document.querySelector("#hourPlayer video");
var hourSource = document.querySelector("#hourPlayer video source");

var muteControl = document.querySelector("[data-action='mute']");
var volumeControl = document.querySelector("[data-action='volume']");

var cssGetComputedStyle = getComputedStyle(document.documentElement);
var cssStyle = document.documentElement.style;

/////////////////////////////////////////////////////////////////
// STATE VARIABLES
/////////////////////////////////////////////////////////////////
var count = 0;
var started = false;
var timeOfDay = "day";
var nextTimeOfDay = "day";
var showVideo = false;
var showHour = false;
var cleanupVideo = false;
var cleanupHour = false;

/////////////////////////////////////////////////////////////////
// WEB WORKER VARIABLES
/////////////////////////////////////////////////////////////////
var clickWorker;
var fetchWorker;

/////////////////////////////////////////////////////////////////
// FUNCTIONS
/////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////
// MUSIC TRACK & AUDIO FUNCTIONS
/////////////////////////////////////////////////////////////////
function getRandomIndex(maxValue, retryValue) {
  var randomIndex = Math.floor(Math.random() * maxValue);

  if (maxValue > 1 && randomIndex === retryValue) {
    randomIndex = getRandomIndex(maxValue, retryValue);
  }

  return randomIndex;
}

function getMinuteMusicTrack(minutes) {
  var actualTimeOfDay = ((minutes === 59) ? nextTimeOfDay : timeOfDay);
  var trackIndex = 0;
  var maxValue = availableMusicMinutes[actualTimeOfDay].length;
  trackIndex = getRandomIndex(maxValue, audioTrack.index);
  return {
    filename: availableMusicMinutes[actualTimeOfDay][trackIndex],
    index: trackIndex,
    startTime: Math.floor(audioTrack.endTime || 0),
    type: "minute"
  };
}

function getHourMusicTrack(season) {
  var hourTracks;
  var max;
  var trackIndex = 0;

  if (availableMusicHours[season]) {

    hourTracks = availableMusicHours[season][nextTimeOfDay];
    max = hourTracks.length;
    trackIndex = Math.floor(Math.random() * max);
    return {
      endTime: ((hourVideo.duration < 18) ? 15.056 : 30.056),
      filename: hourTracks[trackIndex],
      index: trackIndex,
      startTime: 0,
      type: "hour"
    };
  } else {
    return getMinuteMusicTrack(new Date().getMinutes());
  }
}

function decodeAudioBuffer(arrayBuffer, filename) {
  return Promise.all([audioContext.decodeAudioData(arrayBuffer), filename]);
}

function playFromBuffer(startTime, endTime) {
  var trackToPlay = audioContext.createBufferSource();

  trackToPlay.buffer = audioBuffer;
  trackToPlay.connect(audioGain);
  trackToPlay.start(0, startTime, endTime);

  return undefined;
}


/////////////////////////////////////////////////////////////////
// VIDEO TRACK FUNCTIONS
/////////////////////////////////////////////////////////////////
function getRandomVideoSeason(type, minutes, seconds) {

  var actualTimeOfDay = ((minutes === 59 && seconds >= 56) ? nextTimeOfDay : timeOfDay);
  var seasonSelected = 0;

  if (type !== "hour") {
    if (actualTimeOfDay === "day") {
      seasonSelected = availableSeasons.selected[Math.floor(Math.random() * availableSeasons.selected.length)];
    } else if (actualTimeOfDay === "night") {
      seasonSelected = availableSeasons.nights[Math.floor(Math.random() * availableSeasons.nights.length)];
    } else {
      seasonSelected = availableSeasons.midnights[Math.floor(Math.random() * availableSeasons.midnights.length)];
    }
  } else {
    seasonSelected = availableSeasons.hours[Math.floor(Math.random() * availableSeasons.hours.length)];
  }

  return seasonSelected;
}

function getNextVideoTrack(minutes, seconds) {
  var realSeconds = ((videoTrack.status === undefined && seconds >= 55) ? seconds + 10 : seconds);
  var actualTimeOfDay = ((minutes === 59 && realSeconds >= 56) ? nextTimeOfDay : timeOfDay);
  var season = getRandomVideoSeason("seconds", minutes, seconds);
  var tracks = videosBySeason[season].seconds[actualTimeOfDay];
  var max = tracks.length;
  var randomIndex = getRandomIndex(max, ((videoTrack.season === season) ? videoTrack.index : -1));
  var selectedSeasonPath = `${videoAssetsPath}Season ${season}/`;
  var selectedTrack = `${tracks[randomIndex]}`;

  return {
    "ID": `${minutes}${realSeconds}`,
    "filename": selectedTrack,
    "index": randomIndex,
    "path": selectedSeasonPath,
    "season": season,
    "status": "new"
  };
}

function getNextVideoHourTrack(season, nextHour) {
  var dateNow = new Date();
  var tracks = videosBySeason[season].hours;
  var max = tracks.length;
  var randomTrackIndex = 0;
  var currentVideoObject = {
    "ID": `${dateNow.getMinutes()}${dateNow.getSeconds()}`,
    "filename": "",
    "hasHourMusic": seasonalData[season].hasHourMusic,
    "hourEndingSecond": seasonalData[season].hourEndingSecond,
    "hourStartingSecond": seasonalData[season].hourStartingSecond,
    "path": `${videoAssetsPath}Season ${season}/`,
    "season": season,
    "src": ""
  };

  if (seasonalData[season].hoursFollowTime) {
    if (nextHour > max - 1) {
      nextHour = 0;
    }

    currentVideoObject.filename = `${tracks[nextHour]}`;
    currentVideoObject.src = `${currentVideoObject.path}${currentVideoObject.filename}`;
  } else {
    randomTrackIndex = Math.floor(Math.random() * max);
    currentVideoObject.filename = `${tracks[randomTrackIndex]}`;
    currentVideoObject.src = `${currentVideoObject.path}${currentVideoObject.filename}`;
  }

  return currentVideoObject;
}

function setVideoSource(blobURL) {
  source.src = blobURL;
  video.load();
  return "loaded";
}

function setHourSourceTrack(videoHourSource) {
  hourSource.src = videoHourSource;
  hourVideo.load();
  return "loaded";
}

function playVideo() {
  var playback = video.play();

  playback.catch(function (err) {
    console.log("playback failure!");
    console.log(err);
  });

  return "played";
}

function playHour() {
  hourVideo.play();
  return "played";
}

/////////////////////////////////////////////////////////////////
// UTILITY FUNCTIONS
/////////////////////////////////////////////////////////////////
function getTimesBetweenRange(startHour, endHour) {
  var hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

  if (startHour < endHour) {
    return hours.splice(startHour, endHour - startHour);
  } else {
    return hours.toSpliced(endHour, startHour - endHour);
  }
}

function getTimeOfDay(currentHour) {
  var midnightRange = getTimesBetweenRange(customSeasonalData.midnightStartHour, customSeasonalData.midnightEndHour);
  var nightRange = getTimesBetweenRange(customSeasonalData.nightStartHour, customSeasonalData.nightEndHour);
  var nextHour = (currentHour + 1) % 24;
  var thisTime = "day";
  var nextTime = "day";

  if (customSeasonalData.hasNight) {
    if (nightRange.indexOf(currentHour) > -1) {
      thisTime = "night";
    }

    if (nightRange.indexOf(nextHour) > -1) {
      nextTime = "night";
    }
  }

  if (customSeasonalData.hasMidnight) {
    if (midnightRange.indexOf(currentHour) > -1) {
      thisTime = "midnight";
    }

    if (midnightRange.indexOf(nextHour) > -1) {
      nextTime = "midnight";
    }
  }

  return {
    "nextTimeOfDay": nextTime,
    "timeOfDay": thisTime
  };
}

function setTimeOfDay(timeOfDayObject) {
  timeOfDay = timeOfDayObject.timeOfDay;
  nextTimeOfDay = timeOfDayObject.nextTimeOfDay;
}

function setColors(hoursCount) {
  cssStyle.setProperty("--color_1", `rgb(${colorBySeason[availableSeasons.highest][hoursCount]})`);
}

function setCosmeticClasses(customSeasonalData, currentHour) {
  // SET THE STUFF FOR LOCKED / GLOW / ToD
  if (getTimesBetweenRange(customSeasonalData.glowStartHour, customSeasonalData.glowEndHour).indexOf(currentHour) > -1) {
    // add Glow class making the numbers glow when changed
    time1Container.classList.add("pulse");
    time2Container.classList.add("pulse");
  } else {
    // otherwise, remove that class
    time1Container.classList.remove("pulse");
    time2Container.classList.remove("pulse");
  }

  if (getTimesBetweenRange(customSeasonalData.lockedStartHour, customSeasonalData.lockedEndHour).indexOf(currentHour) > -1) {
    // add Locked class making the background top-to-bottom, right-to-left, etc. stop
    time1Container.classList.add("locked");
    time2Container.classList.add("locked");
    hourPlayer.classList.add("locked");
    videoPlayer.classList.add("locked");
  } else {
    // remove the locked class, allowing those background animations to continue
    time1Container.classList.remove("locked");
    time2Container.classList.remove("locked");
    hourPlayer.classList.remove("locked");
    videoPlayer.classList.remove("locked");
  }
}

function toggleColors() {
  // If it's daytime, then after every standard video plays,
  // the colors will swap around between the two time containers.
  if (timeOfDay === "day") {
    if (cssGetComputedStyle.getPropertyValue("--primary-color") === cssGetComputedStyle.getPropertyValue("--color_1")) {
      cssStyle.setProperty("--primary-color", "var(--color_2)");
      cssStyle.setProperty("--secondary-color", "var(--color_1)");
    } else {
      cssStyle.setProperty("--primary-color", "var(--color_1)");
      cssStyle.setProperty("--secondary-color", "var(--color_2)");
    }
  // otherwise the colors will be swapped to a set state and locked.
  } else if (cssGetComputedStyle.getPropertyValue("--primary-color") !== cssGetComputedStyle.getPropertyValue("--color_1")) {
    cssStyle.setProperty("--primary-color", "var(--color_1)");
    cssStyle.setProperty("--secondary-color", "var(--color_2)");
  }
}

function updateTime(hours, minutes, seconds) {

  // Makes the strings that lead with a 0 if the value is < 10
  var stringHours = ((hours < 10) ? "0" + String(hours) : String(hours));
  var stringMinutes = ((minutes < 10) ? "0" + String(minutes) : String(minutes));
  var stringSeconds = ((seconds < 10) ? "0" + String(seconds) : String(seconds));

  // NOTE: likely will remove. I don't think this is doing anything anymore.
  if (time1.dataset.timeSet !== "true") {
    // set data timeSet for both time containers.
    // not really using this for anything but it's at least
    // easy to see that we've been through this function once.
    time1.dataset.timeSet = "true";
    time2.dataset.timeSet = "true";
  }

  // If the dataset.[time] doesn't match with the string value
  // then update the value AND the dataset

  // Hours
  if (time1.dataset.hours !== stringHours) {

    if (time1.children[0].dataset.previousValue !== stringHours[0]) {
      time1.children[0].textContent = stringHours[0];
      time2.children[0].textContent = stringHours[0];
      time1.children[0].dataset.previousValue = stringHours[0];
      time2.children[0].dataset.previousValue = stringHours[0];
    }

    if (time1.children[1].dataset.previousValue !== stringHours[1]) {
      time1.children[1].textContent = stringHours[1];
      time2.children[1].textContent = stringHours[1];
      time1.children[1].dataset.previousValue = stringHours[1];
      time2.children[1].dataset.previousValue = stringHours[1];
    }

    time1.dataset.hours = hours;
    time2.dataset.hours = hours;
  }
  // Minutes
  if (time1.dataset.minutes !== stringMinutes) {

    if (time1.children[2].dataset.previousValue !== stringMinutes[0]) {
      time1.children[2].textContent = stringMinutes[0];
      time2.children[2].textContent = stringMinutes[0];
      time1.children[2].dataset.previousValue = stringMinutes[0];
      time2.children[2].dataset.previousValue = stringMinutes[0];
    }

    if (time1.children[3].dataset.previousValue !== stringMinutes[1]) {
      time1.children[3].textContent = stringMinutes[1];
      time2.children[3].textContent = stringMinutes[1];
      time1.children[3].dataset.previousValue = stringMinutes[1];
      time2.children[3].dataset.previousValue = stringMinutes[1];
    }

    time1.dataset.minutes = minutes;
    time2.dataset.minutes = minutes;
  }
  // Seconds
  if (time1.dataset.seconds !== stringSeconds) {

    if (time1.children[4].dataset.previousValue !== stringSeconds[0]) {
      time1.children[4].textContent = stringSeconds[0];
      time2.children[4].textContent = stringSeconds[0];
      time1.children[4].dataset.previousValue = stringSeconds[0];
      time2.children[4].dataset.previousValue = stringSeconds[0];
    }

    if (time1.children[5].dataset.previousValue !== stringSeconds[1]) {
      time1.children[5].textContent = stringSeconds[1];
      time2.children[5].textContent = stringSeconds[1];
      time1.children[5].dataset.previousValue = stringSeconds[1];
      time2.children[5].dataset.previousValue = stringSeconds[1];
    }

    time1.dataset.seconds = seconds;
    time2.dataset.seconds = seconds;
  }
}

function getTimes() {
  var currentDate = new Date();
  var currentHours = currentDate.getHours();
  var currentMinutes = currentDate.getMinutes();
  var currentSeconds = currentDate.getSeconds();
  var currentMilliseconds = currentDate.getMilliseconds();
  var secondsEndingValue = currentSeconds % 10;

  return {
    "hours": currentHours,
    "milliseconds": currentMilliseconds,
    "minutes": currentMinutes,
    "seconds": currentSeconds,
    "secondsEndingValue": secondsEndingValue
  };
}

function initialize() {
  console.log("setting time stuff now!");

  // IIEF that does the work of figuring out if we're using the clickWorker
  // or the regular setInterval to run this thing.
  (function () {

    // Checking the time again, and updating it.
    var startTime = getTimes();
    updateTime(startTime.hours, startTime.minutes, startTime.seconds);
    setColors(startTime.hours, availableSeasons.highest);

    // If we can use Web Workers, then we'll send a message to it so that
    // our setInterval is being ran on a different thread.
    // This will prevent the browser from throttling the execution of
    // setInterval if the tab / window is not visible. Otherwise,
    // if left for too long, the entire thing breaks down and stops.
    if (clickWorker) {
      // The first message we send, we need to include the "notChrome" prop
      // so the worker knows to load the driftless library to help FireFox out.
      clickWorker.postMessage({"notChrome": !window.chrome, "startClock": true});
    } else {

      // But if we don't have access to Web Workers, we fall back to just
      // outright calling setInterval here.

      // again, this might go away and I may require that Web Workers be available
      // in order for this to work. But not today.
      setInterval(clockTick, 1000);
    }
  }());

  // wipe the modal away revealing the clock
  document.getElementById("modal").classList.add("wipe");

  // display:none the modal to stop animations
  document.getElementById("modal").classList.add("hide");
}


/////////////////////////////////////////////////////////////////
// MAIN LOOP
/////////////////////////////////////////////////////////////////
function clockTick() {

  // grab the current clock time
  var currentTime = getTimes();

  updateTime(currentTime.hours, currentTime.minutes, currentTime.seconds);

  // If the minutes && seconds === 0, then we know we've reached a new hour
  // sometimes that means starting the Hour Video, but if that's
  // not the case, then we absolutely need to update:
  // 1. Time of Day
  // 2. Clock Colors
  // 3. Cosmetic Classes
  if (currentTime.minutes === 0 && currentTime.seconds === 0) {

    setTimeOfDay(getTimeOfDay(currentTime.hours));
    setCosmeticClasses(customSeasonalData, currentTime.hours);
    setColors(currentTime.hours);
    toggleColors();

    if (videoHourTrack.hourStartingSecond === 0) {
      // indicate that we should show and play the Hour Video this tick
      showHour = true;
    }
  } else if (videoHourTrack?.hourStartingSecond === 55) {
    // We also have to check to see if the Hour Video should play
    // BEFORE the H??:M00:S00 time (because Season 3 :))
    if (currentTime.minutes === 59 && currentTime.seconds === 55) {
      // indicate that we should show and play the Hour Video this tick
      showHour = true;
    }
  }

  // Each audioTrack is given a startTime property. While typically set to 0
  // it can be set to a different value if the track that just played before it
  // had a defined endTime property.

  // If the currentTime.seconds equals an audioTrack's startTime, then the track
  // will need to be played.
  // An exception to this is when the clock first starts (started === false).
  // In that scenario we'll set the startTime of the track to the current seconds
  // value of the time. In this way we can ensure the track ends exactly when the
  // clock reaches the next minute.
  if (currentTime.seconds === audioTrack.startTime || started === false) {

    // First Tick?
    if (started === false) {

      // set the startTime prop of the audioTrack
      audioTrack.startTime = currentTime.seconds;

      // indicate that the clock has entered its ticking phase
      started = true;
    }

    // Now let's play the new audio track using its Start and End times.
    // (we send the endTime prop even if it's undefined as sending a 0
    // would result in the track not playing!)

    // Note: playFromBuffer returns undefined, clearing the audioBuffer var!
    audioBuffer = playFromBuffer(audioTrack.startTime, audioTrack.endTime);
  }

  // if there is no audioBuffer then we need to
  // get a new one ready after getting a new trackIndex
  if (!audioBuffer) {

    // If we're in the 59th minute, then we know they next
    // track will need to be for an On-The-Hour Video.
    if (currentTime.minutes === 59 && videoHourTrack.hasHourMusic) {

      // Using the videoHourTrack (which contains the filename of the Video Track)
      // we can get its season and request an appropriate audio track to accompany it.
      audioTrack = getHourMusicTrack(videoHourTrack.season);

    } else {
      // Otherwise we just request a normal On-The-Minute track.
      audioTrack = getMinuteMusicTrack(currentTime.minutes);
    }

    // Using the filename of the audioTrack's filename property,
    // a request is made to get the audio buffer of the file proper.
    // The audio buffer is stored in the audioBuffer once it has been obtained.

    // THIS IS NOT SYNCHRONOUS even if the audio buffer is not already in the audioBufferCache!
    fetchWorker.postMessage({"fetch": true, "filename": audioTrack.filename, "path": audioAssetsPath, "type": "audio"});
  }

  // cleanupVideo will be true if the videoplayer
  // was either shown or hidden last tick.

  // If it was then we'll need to remove the classes
  // that kickoff the animations for it, and put it
  // into either a fully shown / hidden state.
  if (cleanupVideo) {

    // If the video *was* shown last tick...
    if (showVideo) {

      videoPlayer.classList.remove("show");

      // the video has started playback, now we can call to load our next video
      // and get the blobURL
      if (videoTrack.status === "played" || videoTrack.status === "missed") {
        videoTrack = getNextVideoTrack(currentTime.minutes, currentTime.seconds);
        videoTrack.status = "requesting";
        fetchWorker.postMessage({"ID": videoTrack.ID, "fetch": true, "filename": videoTrack.filename, "path": videoTrack.path, "type": "video"});
      }
    } else {
      // Otherwise...

      // Now that the player has been hidden, we can load the new track
      // we got from the request we made when the video was first played.

      // First we check to see *if* the fetch was successful by checking the
      // status property for the value of "ready".

      // If it's ready, we can load. If it isn't, then there is one more
      // opportunity to load the objectURL just before the video is set
      // to be played a little lower in this code.
      if (videoTrack.status === "ready") {
        videoTrack.status = setVideoSource(videoObjectURL);
      }
    }

    // Set this to false so we don't run it every tick.
    cleanupVideo = false;
  }

  // Much like cleanupVideo, cleanupHour will run when the last tick
  // either showed or hid the Video Hour Player
  if (cleanupHour) {

    // If the video *was* shown last tick...
    if (showHour) {
      hourPlayer.classList.remove("show");
    } else {
      // Otherwise, if it was hidden...

      if (hourPlayer.classList.contains("hide") && !hourPlayer.classList.contains("locked")) {
        hourPlayer.classList.remove("hide");
      }

      // because we can start the Hour Video in different spots, it's difficult to
      // figure out when to load the next track. So instead of making a bunch of
      // special logic for it. A new Hour Video will start its loading process AFTER
      // the hourPlayer has finished playing its current track.
      // In fact, because of this, we can just always run setHourSourceTrack after
      // the fetchWorker has finished its job.
      // load the next video

      if (videoHourTrack.status === "played" || videoHourTrack.status === "missed") {
        // Season 3 Hour Videos start on second 55, so using the currentTime.hours + 1 will result in a
        // rare Off-By-One error in video form! Terrible!
        videoHourTrack = getNextVideoHourTrack(getRandomVideoSeason("hour"), ((videoHourTrack.hourStartingSecond > 0) ? currentTime.hours + 2 : currentTime.hours + 1));
        videoHourTrack.status = "requesting";
        fetchWorker.postMessage({"ID": videoHourTrack.ID, "fetch": true, "filename": videoHourTrack.filename, "path": videoHourTrack.path, "type": "videoHour"});
      }
    }
    // Set this to false so we don't run it every tick.
    cleanupHour = false;
  }

  // The main 'top-to-bottom', 'right-to-left' etc. classes that control the main animations
  // for the Clock, are set on the viewContianer and are derived from the state of a
  // variable called 'count'.

  // the value of count can only ever be 0,1,2, or 3
  if (count === 0) {
    viewContainer.className = timeOfDay + " top-to-bottom";
  } else if (count === 1) {
    viewContainer.className = timeOfDay + " right-to-left";
  } else if (count === 2) {
    viewContainer.className = timeOfDay + " bottom-to-top";
  } else if (count === 3) {
    viewContainer.className = timeOfDay + " left-to-right";
  }

  count = (count + 1) % 4;

  // If the Hour Video is being shown...
  if (showHour) {

    // Check to see if the clock time's seconds match the ending time of the videoHour track.
    // If it does...
    if (videoHourTrack.hourEndingSecond === currentTime.seconds) {

      // Indicate that videoHourTrack is no longer going to be shown
      showHour = false;

      // Set the cleanupHour flag for the next tick
      cleanupHour = true;

      // remove and add classes that hide the Hour Player element.
      viewContainer.classList.remove("hourOn");
      hourPlayer.classList.remove("on");
      hourPlayer.classList.add("hide");

      // otherwise if the clock time's seconds match the starting time of the videoHourTrack...
    } else if (videoHourTrack.hourStartingSecond === currentTime.seconds) {

      // If we weren't able to load the video during the cleanup phase (when
      // the hourVideo player is being hidden) then we have one last chance
      // to get the video loaded, and this is it.
      if (videoHourTrack.status === "ready") {
        //console.log("THIS VIDEO WAS SET TO LOADED");
        console.log(videoHourTrack);
        videoHourTrack.status = setHourSourceTrack(videoHourObjectURL);
      }

      // If the videoHourTrack's status is set to "loaded" then we were successful
      // as loading the video in at *some* point. Now we can play it.

      // This also prevents the videoHourPlayer from being shown when a video isn't
      // actually loaded / ready to be played!
      if (videoHourTrack.status === "loaded") {

        // Only now do we show the video hour player
        viewContainer.classList.add("hourOn");
        hourPlayer.classList.add("show");
        hourPlayer.classList.add("on");

        // playHour() starts the video playback and returns a value of "played"
        // which the videoHourTrack's status is set to.
        videoHourTrack.status = playHour();
      } else {
        // because we'll load a new track on the cleanupHour
        // showHour needs to be false.
        videoHourTrack.status = "missed";
        showHour = false;
      }

      // we want to set this to true even IF the video was missed because
      // we load a new Hour video in the cleanup phase!
      cleanupHour = true;
    }
  }

  // If the non-hour videoTrack is being shown...
  if (showVideo) {

    // If the videoHourTrack is *also* being shown on this tick,
    // we'll ignore playing the non-hour video as you'd never see it!
    if (showHour) {

      // If the videoHour was already by the time we got here, we can remove
      // the 'hourOn' class. This may no longer be needed but will require testing.
      if (viewContainer.classList.contains("hourOn")) {
        // some css animations will get strange if we don't remove this
        viewContainer.classList.remove("hourOn");
      } else {
        // otherwise, we simply stop showing the regular videoPlayer.
        showVideo = false;
        cleanupVideo = true;
        videoPlayer.classList.add("hide");
        videoPlayer.classList.remove("on");
      }

    // Otherwise, if the last second in the time is a 1...
    } else if (currentTime.secondsEndingValue === 1) {

    // hide the video player
      showVideo = false;
      cleanupVideo = true;

      toggleColors();


      videoPlayer.classList.remove("on");
      videoPlayer.classList.add("hide");

      // if for whatever reason the videoHourPlayer is still hidden
      // remove the class
      hourPlayer.classList.remove("hide");
    }

  // Otherwise if no videoplayer is shown...
  } else {

    // If THIS second is the 6th second: play video
    if (!showHour && currentTime.secondsEndingValue === 6) {

      cleanupVideo = true;

      // If we weren't able to load the video during the cleanup phase (when
      // the video player is being hidden) then we have one last chance
      // to get the video loaded, and this is it.
      if (videoTrack.status === "ready") {
        //console.log("THIS VIDEO WAS SET TO LOADED");
        console.log(videoTrack);
        videoTrack.status = setVideoSource(videoObjectURL);
      }

      // If the video was loaded at *any* point...
      if (videoTrack.status === "loaded") {
        // show the video
        showVideo = true;
        videoPlayer.classList.remove("hide");
        videoPlayer.classList.add("show");
        videoPlayer.classList.add("on");

        // it should be noted that .play() on a video element returns a promise
        // if the tab is in the background (not visible) and the video media has
        // no sound, the video is automatically paused by Chrome.
        // If the promise.catch isn't being handled in any way this results in a
        // a visible error in the console informing you that the tab's video
        // interrupted the playback.

        // https://developer.chrome.com/blog/media-updates-in-chrome-63-64/#background-video-track-optimizations
        // https://developer.chrome.com/blog/play-request-was-interrupted/
        console.log("video should be playing");
        videoTrack.status = playVideo();
        console.log(videoTrack);
      } else {
        // if we failed to load the video, set the videoTrack's status to "missed"
        videoTrack.status = "missed";
      }

      // however if this isn't the time to play the video, then check to see if
      // the player was hidden and doesn't have the 'locked' class on it
    } else if (videoPlayer.classList.contains("hide") && !videoPlayer.classList.contains("locked")) {
      // then remove the class that kicks off the hide animation, as it has finished.
      videoPlayer.classList.remove("hide");
    }
  }

  // The tick has completed
  // But time marches on...
}

/////////////////////////////////////////////////////////////////
// ON LOAD EVENT
/////////////////////////////////////////////////////////////////
window.onload = function () {

  // audio should start not at speaker breaking volume!
  audioGain.gain.value = 0.05;

  // attach gain to audioContext
  audioGain.connect(audioContext.destination);

  // Browser tabs in the background (not visible) will have their resources
  // throttled to save on energy consumption. setInterval and video playback
  // (two things that are important for a clock that should keep time AND that
  // plays videos), are both severely limited based on how long the tab has
  // been in the background.

  // Because web workers run a separate thread from the main tab, they are not
  // bound by the same throttling rules, allowing us to use setInterval without
  // worrying that the entire program will grind to a halt just because it's
  // not immediately visible.

  // Additionally, because it's a little cleaner, I'm using a web worker to handle
  // making requests for audio and video files, with the intention of also
  // eventually adding some sort of caching mechanism into said worker when time permits.

  // I may change this so that the clock fails to load if Workers aren't available.
  // Not sure yet...
  if (window.Worker) {

    // Create a worker for our file requests
    fetchWorker = new Worker("./js/fetchWorker.js", {type: "module"});
    console.log("Loading new Worker - fetchWorker.js");

    // Set up the fetchWorker's message handler
    fetchWorker.onmessage = function (event) {
      var data = event.data;

      // requestData is a copy of the request we sent to the worker!
      var requestData = data.requestData;

      // if data contains the videoObjectURL prop, which will contain an
      // objectURL pointing to a blob of a video file, then...
      if (data.videoObjectURL) {

        if (requestData.type === "video") {

          //console.log("fetchWorker has sent videoObjectURL for video!" + data.videoObjectURL);

          // check to make sure that the videoTrack.ID matches the ID we sent to the
          // Worker when the initial request was made. Because requests are async,
          // and because a videoTrack object could change before a slow request completes,
          // this will (hopefully) prevent an outdated from being loaded when it shouldn't.
          if (requestData.ID === videoTrack.ID) {

            // set the videoObjectURL var to the value of the fetched data.
            videoObjectURL = data.videoObjectURL;

            // If the clock has already been started...
            if (!started) {
              // Load the objectURL into the video's source element.
              // This will also return "loaded" to the videoTrack's status.
              videoTrack.status = setVideoSource(videoObjectURL);
            } else {

              // Otherwise set the videoTrack's status to "ready".
              videoTrack.status = "ready";
            }

          } else {
            throw new Error(`mismatched message from fetchWorker.
            reply sent: requestID: ${requestData.ID}
            but track shows: videoTrack.ID: ${videoTrack.ID}`);
          }

        } else if (requestData.type === "videoHour") {

          // If the fetchRequest was being made for the videoHour and not the videoTrack
          // then we do much of the same, but for different variables.
          if (requestData.ID === videoHourTrack.ID) {

            videoHourObjectURL = data.videoObjectURL;
            videoHourTrack.status = setHourSourceTrack(videoHourObjectURL);

          } else {
            throw new Error(`mismatched message from fetchWorker.
            videoHour reply sent: requestID: ${requestData.ID}
            but track shows: videoTrack.ID: ${videoHourTrack.ID}`);
          }
        }
      } else if (requestData.type === "audio") {

        // Otherwise if the fetch request was made for an audio file...

        // Check to see if the arrayBuffer property was returned with something in it
        if (data.arrayBuffer) {

          // Attempt to decode the arrayBuffer.
          // This can not be done in the Worker unfortunately because AudioContext is not
          // available in Web Workers.

          // decodeAudioBuffer returns a Promise that is a Promise.all made of up
          // 1. audioContext.decodeAudioData(arrayBuffer) // Promise
          // 2. fileName // String
          decodeAudioBuffer(data.arrayBuffer, requestData.filename).then(function (vals) {

            // Once the audioContext has decoded the arrayBuffer, the Promise.all should resolve
            // and this (then) will execute giving us access to the resulting buffer at the first
            // index of the passed in value array.

            var narrowMS;

            // Set the value of the audioBuffer to that of the passed-in buffer
            audioBuffer = vals[0];

            // If the clock has not yet started, this is where we'll kick it off...
            if (!started) {

              console.log("Starting the Clock");

              //// PRE-START LOOP ////
              // When the device time seconds are too far from this app's seconds
              // it creates a blemish on my soul that cannot be removed and makes
              // me weep uncontrollably. I have created this terrible little setInterval
              // to run and kick off the main loop when the device time milliseconds
              // are bellow a certain threshold :)
              // I'm sorry you had to see this.
              narrowMS = setInterval(function () {
                var ms = new Date().getMilliseconds();
                if (ms < 10) {

                  console.log("clearing out narrowMS, with ms of: " + ms);
                  clearInterval(narrowMS);
                  initialize();
                }
              }, 10);

            }
          });
        }
      } else {
        console.log("The fetchWorker has sent a strange message that is neither for audio OR video!");
      }
    };

    // Create a worker to handle the clock ticking
    clickWorker = new Worker("./js/clickWorker.js", {type: "module"});
    console.log("Loading new Worker - clickWorker.js");

    // Set up the clickWorker's message handler
    clickWorker.onmessage = function (event) {

      // if the startClick:true is sent from the worker, then...
      if (event.data.startClick) {

        // Time marches forward
        clockTick();
      } else {

        // Should probably throw a more visible alert than this,
        // but for now, at least indicate *somewhere* that something happened.
        console.log("The clickworker has sent a strange message!");
      }
    };
  } else {
    // Indicate that we have no workers!
    console.log("Now Hiring :(...");
  }

  // Setup the events for Audio Controls

  // Volume Mute Control Event to mute the music.
  muteControl.addEventListener("click", function () {

    // <img> element of the audio control for Mute.
    var muteImage = muteControl.children[0];

    // If it was already muted, then we'll unmute
    if (muteControl.dataset.muted === "true") {
      // unmute
      // update Image to show speaker icon
      muteImage.src = "./assets/icons/Icon - Sound On - 11x10 - black.png";
      // update the data attribute
      muteControl.dataset.muted = false;
      // if volume control is 0, then it's likely that user has clicked
      // the mute button directly, so we'll set the volume back to what
      // it was before it was muted.
      if (parseFloat(volumeControl.value) === 0) {
        volumeControl.value = muteControl.dataset.unmutedValue;
        audioGain.gain.value = muteControl.dataset.unmutedValue;
      }
    } else {
      // mute
      // update Image to show speaker off icon
      muteImage.src = "./assets/icons/Icon - Sound Off - 24x10 - black.png";
      // update the data attribute
      muteControl.dataset.muted = true;

      // this will update the visual position of the volume slider
      // to show it to the far left (0 sound)
      volumeControl.value = 0;

      // but we'll need to store the value of what the volume was
      // set to before the user muted audio, so that we can
      // change the volume back to this value if the mute button
      // is clicked again to unmute
      muteControl.dataset.unmutedValue = audioGain.gain.value;

      // lastly the audio gain is set to 0
      audioGain.gain.value = 0;
    }
  }, false);

  // Volume Slider Control Event to change volume.
  // NOTE: add something to control volume with keyboard input maybe?
  volumeControl.addEventListener("input", function () {
    if (muteControl.dataset.muted === "true") {
      muteControl.click();
    }
    audioGain.gain.value = volumeControl.value;
    //console.log("volume changed to: " + this.value);
  }, false);

  // Handle the event for a user clicking on the splash screen to start
  // the Uniqlock. A user has to interact with the page in some capacity
  // before the browser will allow us to autoplay music!

  // Note: This event is created with the option "once" set to true
  document.getElementById("modal").addEventListener("click", function () {

    // I wanna update the time now before the modal has been removed so that I don't
    // see the night / midnight number change pulse animation play as the modal is removed.

    var startTime = getTimes();
    updateTime(startTime.hours, startTime.minutes, startTime.seconds);

    // Set the clock's colors
    setColors(startTime.hours, availableSeasons.highest);

    // unsuspended the audioContext
    if (audioContext.state === "suspended") {
      audioContext.resume();
    }

    // go on and set the Time of Day
    setTimeOfDay(getTimeOfDay(startTime.hours));

    // set up the classes that control the clocks default visual behavior
    setCosmeticClasses(customSeasonalData, startTime.hours);

    // using the fetchWorker get the video and videoHour tracks. I don't really care about waiting
    // for them to load. The audio is more important.
    // In the future I might try to clean this up so that I'm resolving a promise
    // for each one of these fetch calls and then at the end, start the initialization process
    // but for now, I'd like to just get version 1 out the door :)

    // Video
    videoTrack = getNextVideoTrack(startTime.minutes, startTime.seconds);
    videoTrack.status = "requesting";
    fetchWorker.postMessage({"ID": videoTrack.ID, "fetch": true, "filename": videoTrack.filename, "path": videoTrack.path, "type": "video"});
    // Video Hour
    videoHourTrack = getNextVideoHourTrack(getRandomVideoSeason("hour"), startTime.hours + 1);
    videoHourTrack.status = "requesting";
    fetchWorker.postMessage({"ID": videoHourTrack.ID, "fetch": true, "filename": videoHourTrack.filename, "path": videoHourTrack.path, "type": "videoHour"});

    // Audio
    audioTrack = getMinuteMusicTrack(startTime.minutes);
    // when this fetch resolves, it will initialize the clock
    fetchWorker.postMessage({"fetch": true, "filename": audioTrack.filename, "path": audioAssetsPath, "type": "audio"});
  }, {once: true}, false);
};