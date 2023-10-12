
/* global setDriftlessInterval, clearDriftless */
/* eslint-env browser */
/* eslint no-console: ["error", { allow: ["log", "error"] }]  */

/*global 
  
*/

import {availableSeasons, customSeasonalData, musicOverrides, availableVideoSeconds, availableVideoHours, availableMusicMinutes, availableMusicHours} from "./modules/customizedData.js";
import {seasonalData, videosBySeason, colorBySeason} from "./modules/defaultData.js";

/////////////////////////////////////////////////////////////////
// AUDIO VARIABLES
/////////////////////////////////////////////////////////////////
var audioAssetsPath = "../assets/music/";
var lastTrackObject = {};
var sourceBuffer = undefined;
var customContext = new AudioContext();
var customGain = customContext.createGain();

// audio should start not at speaker breaking volume!
customGain.gain.value = 0.05;

// attach gain to Context
customGain.connect(customContext.destination);

/////////////////////////////////////////////////////////////////
// VIDEO VARIABLES
/////////////////////////////////////////////////////////////////
var videoAssetsPath = "../assets/videos/";
var videoTrack = {
	"season": undefined,
	"filename": undefined,
	"index": -1,
	"status": undefined
}; // Does this need to be initialized as an object? probably not!
var currentVideoHourTrack = {}; // Change this name!!!!
var videoBlobURL = undefined;
var videoHourBlobURL = undefined;

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




// Music Track Functions
function getRandomIndex(maxValue, retryValue){
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
  trackIndex = getRandomIndex(maxValue, lastTrackObject.index);//getTrackIndex(actualTimeOfDay);
  return {
		
    filename: availableMusicMinutes[actualTimeOfDay][trackIndex],
    type: "minute",
    index: trackIndex,
    startTime: Math.floor(lastTrackObject.endTime || 0)
  };  
}

function getHourMusicTrack(season) {
  var trackIndex = 0;

  if (availableMusicHours[season]) {
    
    let hourTracks = availableMusicHours[season][nextTimeOfDay];
    let max = hourTracks.length;
    trackIndex = Math.floor(Math.random() * max);
    return {
      filename: hourTracks[trackIndex],
      type: "hour",
      index: trackIndex,
      startTime: 0,
      endTime: ((hourVideo.duration < 18) ? 15.056 : 30.056)
    };

  } else {
    return getMinuteMusicTrack(new Date().getMinutes());
  }
}

// Time of Day
function getTimesBetweenRange(startHour, endHour){
	var hours = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23];

	if (startHour < endHour) {
		return hours.splice(startHour, endHour - startHour);
	} else {
		return hours.toSpliced(endHour, startHour - endHour);
	}
}

function getTimeOfDay(currentHour) {
	var midnightRange = getTimesBetweenRange(customSeasonalData.midnightStartHour, customSeasonalData.midnightEndHour);
	var nightRange = getTimesBetweenRange(customSeasonalData.nightStartHour , customSeasonalData.nightEndHour);
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
		"timeOfDay": thisTime,
		"nextTimeOfDay": nextTime
	};
}

function setTimeOfDay(timeOfDayObject) {
	timeOfDay = timeOfDayObject.timeOfDay;
	nextTimeOfDay = timeOfDayObject.nextTimeOfDay;
}


// Audio Context // Buffer Functions
function decodeAudioBuffer(arrayBuffer, filename){
	return Promise.all([customContext.decodeAudioData(arrayBuffer), filename]);
}

function playFromBuffer(startTime, endTime){
  var trackToPlay = customContext.createBufferSource();

  trackToPlay.buffer = sourceBuffer;
  trackToPlay.connect(customGain);
  trackToPlay.start(0, startTime, endTime);

	return undefined;
}


// Video Track Selection Functions
function getRandomVideoSeason(type, minutes, seconds){

	var actualTimeOfDay = ((minutes === 59 && seconds >= 56) ? nextTimeOfDay : timeOfDay);
	var seasonSelected = 0;
	
	if (type !== "hour") {
		if (actualTimeOfDay === "day") {      
			seasonSelected = availableSeasons["selected"][Math.floor(Math.random() * availableSeasons["selected"].length)];
		} else if (actualTimeOfDay === "night") {
			seasonSelected = availableSeasons["nights"][Math.floor(Math.random() * availableSeasons["nights"].length)];
		} else {
			seasonSelected = availableSeasons["midnights"][Math.floor(Math.random() * availableSeasons["midnights"].length)];
		}
	} else {
		seasonSelected = availableSeasons.hours[Math.floor(Math.random() * availableSeasons.hours.length)];
	}

	return seasonSelected;
}

function getNextVideoTrack(minutes, seconds) {
  "use strict";

  if (videoTrack.status === undefined && seconds >= 55) {
		seconds += 10
  }	
	
	var actualTimeOfDay = ((minutes === 59 && seconds >= 56) ? nextTimeOfDay : timeOfDay);
	var season = getRandomVideoSeason("seconds", minutes, seconds);
  var tracks = videosBySeason[season].seconds[actualTimeOfDay];
  var max = tracks.length;
  var randomIndex = getRandomIndex(max, ((videoTrack.season === season) ? videoTrack.index : -1)); //Math.floor(Math.random() * max);
  var selectedSeasonPath = `${videoAssetsPath}Season ${season}/`
	var selectedTrack = `${tracks[randomIndex]}`;

  return {
		"path": selectedSeasonPath,
		"filename": selectedTrack,
		"index": randomIndex,
		"season": season,
		"status": "new",
		"ID": `${minutes}${seconds}`
	};
}

function getNextVideoHourTrack(season, nextHour) {
  "use strict";
	var dateNow = new Date();
	var currentVideoObject = {
		"ID": `${dateNow.getMinutes()}${dateNow.getSeconds()}`,
		"path": `${videoAssetsPath}Season ${season}/`,
		"filename": "",
		"season": season,
		"hasHourMusic": seasonalData[season].hasHourMusic,
		"hourStartingSecond": seasonalData[season].hourStartingSecond,
		"hourEndingSecond": seasonalData[season].hourEndingSecond,
		src: ""
	};

  var tracks = videosBySeason[season].hours;
  var max = tracks.length;
  var randomTrackIndex = 0;

  //seasonalData[2].hoursFollowTime
  if (seasonalData[season].hoursFollowTime) {
    if (nextHour > max - 1) {
      nextHour = 0;
    }

		currentVideoObject.filename = `${tracks[nextHour]}`;
    currentVideoObject.src = `${currentVideoObject.path}${currentVideoObject.filename}`;
  } else {
    randomTrackIndex = Math.floor(Math.random() * max);
		currentVideoObject.filename = `${tracks[randomTrackIndex]}`;
    currentVideoObject.src =  `${currentVideoObject.path}${currentVideoObject.filename}`;
  }

	return currentVideoObject;
}

function setVideoSource(blobURL){
	source.src = blobURL;
  video.load();
	return "loaded";
}

function setHourSourceTrack(videoHourSource){
  hourSource.src = videoHourSource;
  hourVideo.load();
	return "loaded";
}

function playVideo() {  
	video.play();
	return "played";
}

function playHour() {
  hourVideo.play();
	return "played";
}



// Utility Functions
function setColors(hoursCount){	
	cssStyle.setProperty("--color_1", `rgb(${colorBySeason[availableSeasons.highest][hoursCount]})`);
}

function setCosmeticClasses(customSeasonalData, currentHour){
	// SET THE STUFF FOR LOCKED / GLOW / TOD
	if (getTimesBetweenRange(customSeasonalData.glowStartHour, customSeasonalData.glowEndHour).indexOf(currentHour) > -1) {
		// add Glow class

		time1Container.classList.add("pulse");
		time2Container.classList.add("pulse");


	} else {

		time1Container.classList.remove("pulse");
		time2Container.classList.remove("pulse");
	}
	
	if (getTimesBetweenRange(customSeasonalData.lockedStartHour, customSeasonalData.lockedEndHour).indexOf(currentHour) > -1) {
		// add Locked class
		time1Container.classList.add("locked");
		time2Container.classList.add("locked");
		hourPlayer.classList.add("locked");
		videoPlayer.classList.add("locked");


	} else {
		time1Container.classList.remove("locked");
		time2Container.classList.remove("locked");
		hourPlayer.classList.remove("locked");
		videoPlayer.classList.remove("locked");
	}
}

function toggleColors(){
	if (timeOfDay === "day") {
		if (cssGetComputedStyle.getPropertyValue("--primary-color") === cssGetComputedStyle.getPropertyValue("--color_1")) {
			cssStyle.setProperty("--primary-color", "var(--color_2)");
			cssStyle.setProperty("--secondary-color", "var(--color_1)");
		} else {
			cssStyle.setProperty("--primary-color", "var(--color_1)");
			cssStyle.setProperty("--secondary-color", "var(--color_2)");
		}
	} else if (cssGetComputedStyle.getPropertyValue("--primary-color") !== cssGetComputedStyle.getPropertyValue("--color_1")) {
		cssStyle.setProperty("--primary-color", "var(--color_1)");
		cssStyle.setProperty("--secondary-color", "var(--color_2)");
	}
}

function updateTime(hours, minutes, seconds) {

  var stringHours = (hours < 10) ? "0" + String(hours) : String(hours);
  var stringMinutes = (minutes < 10) ? "0" + String(minutes) : String(minutes);
  var stringSeconds = (seconds < 10) ? "0" + String(seconds) : String(seconds);

  if (time1.dataset.timeSet !== "true") {
    // set data timeSet for both time containers.
    // not really using this for anything but it's at least
    // easy to see that we've been through this function once.
    time1.dataset.timeSet = time2.dataset.timeSet = "true";
  }

  if (time1.dataset.hours !== stringHours) {

    if (time1.children[0].dataset.previousValue !== stringHours[0]) {
      time1.children[0].textContent = time2.children[0].textContent = stringHours[0];
      time1.children[0].dataset.previousValue = time2.children[0].dataset.previousValue = stringHours[0];
    }

    if (time1.children[1].dataset.previousValue !== stringHours[1]) {
      time1.children[1].textContent = time2.children[1].textContent = stringHours[1];
      time1.children[1].dataset.previousValue = time2.children[1].dataset.previousValue = stringHours[1];
    }    

    time1.dataset.hours = time2.dataset.hours = hours;
  }

  if (time1.dataset.minutes !== stringMinutes) {

    if (time1.children[2].dataset.previousValue !== stringMinutes[0]) {
      time1.children[2].textContent = time2.children[2].textContent = stringMinutes[0];
      time1.children[2].dataset.previousValue = time2.children[2].dataset.previousValue = stringMinutes[0];
    }

    if (time1.children[3].dataset.previousValue !== stringMinutes[1]) {
      time1.children[3].textContent = time2.children[3].textContent = stringMinutes[1];
      time1.children[3].dataset.previousValue = time2.children[3].dataset.previousValue = stringMinutes[1];
    }    

    time1.dataset.minutes = time2.dataset.minutes = minutes;
  }



  if (time1.dataset.seconds !== stringSeconds) {

    if (time1.children[4].dataset.previousValue !== stringSeconds[0]) {
      time1.children[4].textContent = time2.children[4].textContent = stringSeconds[0];
      time1.children[4].dataset.previousValue = time2.children[4].dataset.previousValue = stringSeconds[0];
    }

    if (time1.children[5].dataset.previousValue !== stringSeconds[1]) {
      time1.children[5].textContent = time2.children[5].textContent = stringSeconds[1];
      time1.children[5].dataset.previousValue = time2.children[5].dataset.previousValue = stringSeconds[1];
    }    

    time1.dataset.seconds = time2.dataset.seconds = seconds;
  }
}

function getTimes(){
	var currentDate = new Date();
	var currentHours = currentDate.getHours();
	var currentMinutes = currentDate.getMinutes();
	var currentSeconds = currentDate.getSeconds();
	var currentMilliseconds = currentDate.getMilliseconds();
	var secondsEndingValue = currentSeconds % 10;

	return {
		"hours": currentHours,
		"minutes": currentMinutes,
		"seconds": currentSeconds,
		"milliseconds": currentMilliseconds,
		"secondsEndingValue": secondsEndingValue
	};
}

function initialize() {
	console.log("setting time stuff now!");


	(function(){
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
			clickWorker.postMessage({"startClock": true, "notChrome": !window.chrome});
		} else {

			// But if we don't have access to Web Workers, we fall back to just
			// outright calling setInterval here.
			setInterval(simpleTick, 1000);
		}
		
	}());
	
	// If I don't set the body to be default hidden and the show it
	// after the time has been updated when you first load, then
	// you can see the value change quickly and it will drive me insane!
	document.body.classList.remove("hide");

	// wipe the modal away revealing the clock
	document.getElementById("modal").classList.add("wipe");

	// display:none the modal to stop animations 
	document.getElementById("modal").classList.add("hide");
}



// Main Loop
function simpleTick() {

	// grab the current clock time
	var currentTime = getTimes();	

	updateTime(currentTime.hours, currentTime.minutes, currentTime.seconds);

	// If the minutes && seconds === 0, then we know we've reached a new hour
	// and should prepare to start the Hour Video Player
	if (currentTime.minutes === 0 && currentTime.seconds === 0) {

		setTimeOfDay(getTimeOfDay(currentTime.hours));
		setCosmeticClasses(customSeasonalData, currentTime.hours);


		if (currentVideoHourTrack.hourStartingSecond === 0) {
			showHour = true;
		}

		// This is also when we'll need to update the color palette.
		setColors(currentTime.hours);
		toggleColors();
	}	else if (currentVideoHourTrack?.hourStartingSecond === 55) {
		if (currentTime.minutes === 59 && currentTime.seconds === 55) {
			showHour = true;

			// saving myself some trouble here, but if we ever get the 
			// canvas videos stuff working then the colors actually
			// still need to transition on the 0m0s time.
		}
	}

	// if the current track is finished at 60 seconds
	// or if no audio has been started (started === false),
	// then a new track should be played.
	//if (currentTime.seconds === trackStartTime || started === false) {
	if (currentTime.seconds === lastTrackObject.startTime || started === false) {
		
		// Check to see if this is the very first tick of the clock.
		// If it is, started will be false.
		if (started === false) {

			// Because audio tracks are roughly a minute in length, they
			// should be started at the current seconds count of the clock.
			//trackStartTime = currentTime.seconds;
			lastTrackObject.startTime = currentTime.seconds;
			started = true;
		} else {
			// The On-The-Hour Videos get a special audio track to accompany them.
			// These special audio tracks were designed to be a full 1 minute,
			// (and some change) long. However, there was a slight oversight in their
			// production, in that the last 30 seconds of audio that they play
			// may be completely innappropriate for the Time of Day that the clock
			// is currently in. This results in tracks that would normally not be heard
			// during certain late hours, being played for 30 seconds before the music
			// would return back to normal.

			// To fix this, when an audioTrack has been selected to play On-The-Hour
			// it sends along an endTime property. Subsequently the nextTrackObject
			// that is created to queue after that On-The-Hour audioTrack, will be
			// given a startTime property that is equal to the endTime of the track
			// before it.

			// So an On-The-Hour audio track will have an endtime of roughly 30 secs,
			// and the following nextTrackObject will have a startTime of 30 secs.
			// However if two regular minute long audio tracks are following each
			// other back to back, then the startTime property will be undefined
			// meaning that we can assume their startTime is 0.

			// might not need this either
			//trackStartTime = lastTrackObject.startTime || 0;
		}

		// Now let's play the new audio track using its Start and End times.
		// (we send the endTime prop even if it's undefined as sending a 0
		// would result in the track not playing!)
		//
		// playFromBuffer returns undefined, which will clear the soucreBuffer
		//sourceBuffer = playFromBuffer(trackStartTime, lastTrackObject.endTime);	
		sourceBuffer = playFromBuffer(lastTrackObject.startTime, lastTrackObject.endTime);
	}	


	// if there is no sourceBuffer then we need to 
	// get a new one ready after getting a new trackIndex
	if (!sourceBuffer) {

		// If we're in the 59th minute, then we know they next
		// track will need to be for an On-The-Hour Video.
		if (currentTime.minutes === 59 && currentVideoHourTrack.hasHourMusic) {

			// Using the currentVideoHourTrack (which contains the filename of the Video Track)
			// we can get its season and request an appropriate audio track to accompany it.
			lastTrackObject = getHourMusicTrack(currentVideoHourTrack.season);

		} else {
			// Otherwise we just request a normal On-The-Minute track.
			lastTrackObject = getMinuteMusicTrack(currentTime.minutes);
		}
		
		// Also now that there is a track of audio playing, the
		// trackStartTime should be updated so that it's possible to know
		// when the next audio track should start playing, whether that is
		// partway through the minute or when a new minute starts (0 seconds).
		
		//trackStartTime = nextTrackObject.startTime || 0;

		// Using the filename of the nextTrackObject's name property,
		// a request is made to get the audio buffer of the file proper.
		// The audio buffer is stored in the sourceBuffer once it has been obtained.

		// THIS IS NOT SYNCHRONOUS even if the audio buffer is not already in the audioBufferCache!
		fetchWorker.postMessage({"fetch": true, "type": "audio", "path": audioAssetsPath, "filename": lastTrackObject.filename});
	}
	
	// cleanupVideo will be true if the videoplayer
	// was either shown or hidden last tick.

	// If it was then we'll need to remove the classes
	// that kickoff the animations for it, and put it
	// into either a fully shown / hidden state.
	if (cleanupVideo) {
		if (showVideo){
			videoPlayer.classList.remove("show");

			// the video has started playback, now we can call to load our next video
			// and get the blobURL
			if (videoTrack.status === "played" || videoTrack.status === "missed") {
				videoTrack = getNextVideoTrack(currentTime.minutes, currentTime.seconds);
				fetchWorker.postMessage({"fetch": true, "type": "video", "path": videoTrack.path, "filename": videoTrack.filename, "ID": videoTrack.ID});
			}
		} else {
			
			// NOTE: REWRITE THIS!!!!

			// now that the player is really hidden, we
			// should be able to load the next vid track.
			// cleanup video stuff.
			// [videoTrack] was set to the new [videoTrack]
			// by the playVideo() function on second 6
			// this will now set the source to whatever video that is
			// and load it


			// this could lead to a problem if we haven't received the videoBlob / objectURL
			// back from the fetchRequest.
			// I might end up just moving this to before the video should be played.
			// not sure if that would cause any issues since the video should be 
			// instantly loaded now that it's a objectURL. 
			if (videoTrack.status === "ready") {
				videoTrack.status = setVideoSource(videoBlobURL);
			}
		}


		cleanupVideo = false;
	}

	if (cleanupHour) {

		if (showHour) {
			hourPlayer.classList.remove("show");
		} else {
			//hourPlayer.classList.remove("hide");
			// maybe this is where we set the currentVideoHourTrackStartTime and currentVideoHourTrackEndTime

			if (hourPlayer.classList.contains("hide") && !hourPlayer.classList.contains("locked")){//timeOfDay === "day" && videoPlayer.classList.contains("hide")) {

				hourPlayer.classList.remove("hide");	
			}

			/*
			if (!currentVideoHourTrack) {
				// This will need to look forward into the future to get the next
				// Hour Video track. However if we're currently showing a Season 3
				// Hour Video track, which starts at 55 seconds of the final minute,
				// then using only "+1" will result in an off-by-one bug and we'll
				// end up grabbing the same Season 3 video we just played!
				// To mitigate this we can check to see what the current value of the
				// current seconds are, and testing against that can determine how far
				// into the future we should look when getting the next Video Hour track.

				currentVideoHourTrack = getNextVideoHourTrack(getRandomVideoSeason("hour"), currentTime.hours + 1);
				//currentVideoHourTrack = getNextVideoHourTrack(getRandomVideoSeason("hour"), currentTime.hours + ((currentTime.seconds > 2) ? 2 : 1)); 
			}

			setHourSourceTrack(currentVideoHourTrack);
			*/

			// because we can start the Hour Video in different spots, it's difficult to
			// figure out when to load the next track. So instead of making a bunch of
			// special logic for it. The Hour Video will start its loading process AFTER
			// the hourPlayer has finished playing its current track.
			// In fact, because of this, we can just always run setHourSourceTrack after
			// the fetchWorker has finished its job.
			// load the next video

			if (currentVideoHourTrack.status === "played" || currentVideoHourTrack.status === "missed") {
				currentVideoHourTrack = getNextVideoHourTrack(getRandomVideoSeason("hour"), (currentVideoHourTrack.hourStartingSecond > 0) ? currentTime.hours + 2 : currentTime.hours + 1);
				currentVideoHourTrack.status = "requesting";
				fetchWorker.postMessage({"fetch": true, "type": "videoHour", "path": currentVideoHourTrack.path, "filename": currentVideoHourTrack.filename, "ID": currentVideoHourTrack.ID});
			}
			/*
			if (currentVideoHourTrack.status === "ready") {
				currentVideoHourTrack.status = setHourSourceTrack(videoHourBlobURL);
				console.log("loading next hour video");
			}
			*/
		}

		cleanupHour = false;
	}


	// for midnight we need to do a different thing for the time transitions
	// instead of the normal side-to-side transitions, the color is static,
	// black background for anything outside of video, and after video plays
	// GOTO black overlay (that covers time), and transitions alpha to 100
	// over 2 seconds or so

	if (count == 0) {
		viewContainer.className = timeOfDay + ' top-to-bottom';
	}
	else if (count == 1) {
		viewContainer.className = timeOfDay + ' right-to-left';		
	}
	else if (count == 2) {
		viewContainer.className = timeOfDay + ' bottom-to-top';		
	}
	else if (count == 3) {		
		viewContainer.className = timeOfDay + ' left-to-right';
	}

	count = (count + 1) % 4;

	if (showHour) {
		// lol this is not true for the hour videos from the
		// third season because they decided to get strange!
		// this used to use === maxHourDuration, but lets just 
		// parse the actual hourVideo.duration directly.
		// no need to add a new var.
		if (currentVideoHourTrack.hourEndingSecond === currentTime.seconds) {
			showHour = false;
			cleanupHour = true;
			viewContainer.classList.remove("hourOn");
			hourPlayer.classList.remove("on");
			hourPlayer.classList.add("hide");
			//currentVideoHourTrack = undefined;
		} else if (currentVideoHourTrack.hourStartingSecond === currentTime.seconds) {
			
			// we want to set this to true even IF the video was missed because
			// that will load up a new track no matter what!
			cleanupHour = true;

			// just to make sure it is loaded... let's try again.
			// probably don't need this any more with how the video is being loaded now. 
			if (currentVideoHourTrack.status === "ready") {
				console.log("THIS VIDEO WAS SET TO READY");
				console.log(currentVideoHourTrack);
				currentVideoHourTrack.status = setHourSourceTrack(videoHourBlobURL);
			}

			if (currentVideoHourTrack.status === "loaded") {
				// Only want to show the hourPlayer if the video
				// is actually loaded. Otherwise, it's pointless.
				viewContainer.classList.add("hourOn");
				hourPlayer.classList.add("show");
				hourPlayer.classList.add("on");

				currentVideoHourTrack.status = playHour();
			} else {
				// because we'll load a new track on the cleanupHour
				// showHour needs to be false.				
				currentVideoHourTrack.status = "missed";
				showHour = false;
			}
		}
	}
	
	// If we are showing the videoplayer...
	if (showVideo){
		// if the last second in the time is a 1
		// hide the video player
		if (showHour) {
	
			if (viewContainer.classList.contains("hourOn")){
				viewContainer.classList.remove("hourOn");
			} else {
				showVideo = false;
				cleanupVideo = true;
				videoPlayer.classList.add("hide");
				videoPlayer.classList.remove("on");
			}

		} else if (currentTime.secondsEndingValue === 1) {

			showVideo = false;
			cleanupVideo = true;

			toggleColors();


			videoPlayer.classList.remove("on");
			videoPlayer.classList.add("hide");

			// if forwhatever reason the videoHourPlayer is still hidden
			// remove the class
			hourPlayer.classList.remove("hide");
		}
	// otherwise if no videoplayer is shown...
	}	else {
		/* If THIS second is the 6th second: play video */
		/* set class on frame that indicates that video should sweep in */
		if (!showHour && currentTime.secondsEndingValue === 6) {
			
			cleanupVideo = true;
			

			if (videoTrack.status === "ready") {
				console.log("THIS VIDEO WAS SET TO READY");
				console.log(videoTrack);
				videoTrack.status = setVideoSource(videoBlobURL);
			}


			if (videoTrack.status === "loaded") {
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
				videoTrack.status = playVideo();
			} else {
				videoTrack.status = "missed";
			}
			
			/// play video if it's time & loaded
			//console.log("playVideo: " + source.src);
			
		} else if (videoPlayer.classList.contains("hide") && !videoPlayer.classList.contains("locked")) {
      videoPlayer.classList.remove("hide");	
    }
	}

	//trackSecondsPlayed += 1;
}



// First Load
window.onload = function() {

	// um. let's set up a web worker. If it works then we can run the
	// ticks through its SetInterval instead of the main thread.
	// This would allow us to not have to worry about the window / tab
	// keeping focus because Web Workers aren't throttled in the same
	// way that the main browser thread is.

	if (window.Worker) {
		fetchWorker = new Worker("./js/fetchWorker.js", {type:"module"});
		console.log("Loading new Worker - fetchWorker.js");
		fetchWorker.onmessage = function(event) {
			var data = event.data;
			var requestData = data.requestData;

			if (data.videoBlobURL) {
				if (requestData.type === "video") {

					console.log("fetchWorker has sent videoBlobURL for video!" + data.videoBlobURL);
					if (requestData.ID === videoTrack.ID) {
						videoBlobURL = data.videoBlobURL;
						if (!started) {
							videoTrack.status = setVideoSource(videoBlobURL);
						} else {
							videoTrack.status = "ready";
						}
						
					} else {
						console.log(`mismatched message from fetchWorker.
						reply sent: requestID: ${requestData.ID}
						but track shows: videoTrack.ID: ${videoTrack.ID}`);
					}
					
				} else if (requestData.type === "videoHour") {
					if (requestData.ID === currentVideoHourTrack.ID) {

						videoHourBlobURL = data.videoBlobURL;
						currentVideoHourTrack.status = setHourSourceTrack(videoHourBlobURL);

					} else {
						console.log(`mismatched message from fetchWorker.
						videoHour reply sent: requestID: ${requestData.ID}
						but track shows: videoTrack.ID: ${currentVideoHourTrack.ID}`);
					}
					
				}	
			} else if (requestData.type === "audio") {
				
				if (data.arrayBuffer) {
				
					decodeAudioBuffer(data.arrayBuffer, requestData.filename).then(function(vals){
						var narrowMS;
						sourceBuffer = vals[0];

						if (!started) {
							console.log('start the thing');					
		
							//// PRE-START LOOP ////
							// When the device time seconds are too far from this app's seconds
							// it creates a blemish on my soul that cannot be removed and makes
							// me weep uncontrollably. I have created this terrible little setInterval
							// to run and kick off the main loop when the device time milliseconds
							// are bellow a certain threshold :)
							// I'm sorry you had to see this.
							narrowMS = setInterval(function(){
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
			}	else {
				console.log("The fetchWorker has sent a strange message!");
			}
		}

		clickWorker = new Worker("./js/clickWorker.js", {type:"module"});
		console.log("Loading new Worker - clickWorker.js");
		clickWorker.onmessage = function(event) {
			if (event.data.startClick) {
				simpleTick();
			} else {
				if (event.data.fetchRequest) {
					console.log("Click Worker GO! " + event.data.fetchRequest);
				} else {
					console.log("The clickworker has sent a strange message!");
				}	
			}	
		}
	} else {
		console.log("Now Hiring :(...");
	}

	// Setup the events for Audio Controls

	// Volume Mute Control Event to mute the music.
	muteControl.addEventListener("click", function() {

		// <button> element of the audio control for Mute.
		var mute = this;

		// <img> element of the audio control for Mute.
		var muteImage = mute.children[0];
		
		// If it was already muted, then we'll unmute
		if (mute.dataset.muted === "true") {
			// unmute
			// update Image to show speaker icon
			muteImage.src = "./assets/icons/Icon - Sound On - 11x10 - black.png";
			// update the data attribute
			mute.dataset.muted = false;
			// if volume control is 0, then it's likely that user has clicked
			// the mute button directly, so we'll set the volume back to what
			// it was before it was muted.
			if (parseFloat(volumeControl.value) === 0) {
				volumeControl.value = mute.dataset.unmutedValue;
				customGain.gain.value = mute.dataset.unmutedValue;
			}
		} else {
			// mute
			// update Image to show speaker off icon
			muteImage.src = "./assets/icons/Icon - Sound Off - 24x10 - black.png";
			// update the data attribute
			mute.dataset.muted = true;

			// this will update the visual position of the volume slider
			// to show it to the far left (0 sound)
			volumeControl.value = 0;

			// but we'll need to store the value of what the volume was
			// set to before the user muted audio, so that we can
			// change the volume back to this value if the mute button
			// is cliked again to unmute
			mute.dataset.unmutedValue = customGain.gain.value;

			// lastly the audio gain is set to 0
			customGain.gain.value = 0;		
		}
	}, false);
	
	// Volume Slider Control Event to change volume.
	// NOTE: add something to control volume with keyboard input maybe?
	volumeControl.addEventListener("input", function() {
		if (muteControl.dataset.muted === "true") {
			muteControl.click();
		}
		customGain.gain.value = this.value;
		console.log("volume changed to: " + this.value);
	}, false);

	// Handle the event for a user clicking on the splash screen to start
	// the Uniqlock. A user has to interact with the page in some capcity
	// before the browser will allow us to autoplay music!
	document.getElementById("modal").addEventListener('click', function() {
		
		console.log("CLICK");

		// I wanna update the time now before the modal has been removed so that I don't
		// see the night / midnight number change pulse animation play as the modal is removed.
		var startTime = getTimes();
		updateTime(startTime.hours, startTime.minutes, startTime.seconds);

		setColors(startTime.hours, availableSeasons.highest);

		if (customContext.state === 'suspended') {
			customContext.resume();
		}
		
		setTimeOfDay(getTimeOfDay(startTime.hours));
		setCosmeticClasses(customSeasonalData, startTime.hours);

		// using the fetchWorker get the video and videoHour tracks. I don't really care about waiting
		// for them to load. The audio is more important.
		// In the future I might try to clean this up so that I'm resolving a promise
		// for each one of these fetch calls and then at the end, start the initialization process
		// but for now, I'd like to just get version 1 out the door :)
		videoTrack = getNextVideoTrack(startTime.minutes, startTime.seconds);
		videoTrack.status = "requesting";
		fetchWorker.postMessage({"fetch": true, "type": "video", "path": videoTrack.path, "filename": videoTrack.filename, "ID": videoTrack.ID});
		
		//videoBlobURL = fetchStream("video", videoTrack.path, videoTrack.filename, getBlobURL);


		// TODO: there should be a check here that figures out if we've already missed our window
		// to load in the on-the-hour video for the upcoming hour.
		// For instance, if we're already beyond the Season 3 -
		// Starting Playback Time of HH:55:00, then we should try to select a different season.
		// Likewise if we're only 1 second away from playback of a normal on-the-hour video
		// then it might be too late!
		// If we don't fix this, then there is a chance that a video will be loaded and kept
		// unplayed resulting in an Off-By-One error in video form! the worst type of Off By Ones!
		
		// Create a special variable called "startingHourVideo" which is used to set the value of currentVideoHourTrack
		// On the next hour, we check to see if the hourVideoPlayer is playing something
		// if it isn't, then we look to see if currentVideoHourTrack === startingVideoTrack.
		// If the two match, then we know that the video was NOT played and that the nextVideoHourTrack should be
		// loaded in its place, and replaced by an even newer video. 

		currentVideoHourTrack = getNextVideoHourTrack(getRandomVideoSeason("hour"), startTime.hours + 1);
		currentVideoHourTrack.status = "requesting";
		fetchWorker.postMessage({"fetch": true, "type": "videoHour", "path": currentVideoHourTrack.path, "filename": currentVideoHourTrack.filename, "ID": currentVideoHourTrack.ID});
		
		//setHourSourceTrack(currentVideoHourTrack);



		lastTrackObject = getMinuteMusicTrack(startTime.minutes);
		fetchWorker.postMessage({"fetch": true, "type": "audio", "path": audioAssetsPath, "filename": lastTrackObject.filename});


	}, {once: true}, false);	
};

