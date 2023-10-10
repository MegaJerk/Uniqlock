// minified code for present and driftless is modified from projects of the same name, Copyright (c) 2014 Dan Kaplun.
// See directory third-parties\licenses\[name] for individual licenses. 
import {present, driftless} from "./modules/driftless-min.js";

var interval;
var notChrome;
var setDriftlessTimeout;
var setDriftlessInterval;
var clearDriftless;

function workerTick() {
	postMessage({"startClick": true});
}

onmessage = function(event) {
	console.log("clickWorker - processing work request!");

	// Chrome is designed in such a way that setInterval doesn't drift around
	// like current spec seems to suggest it should. So, all of this stuff works
	// really nicely in Chrome. FireFox on the other hand does not take the time
	// to prevent setInterval from drifting further and further out of sync
	// resulting in a terrible experience when using a program that is
	// designed to act like a clock.

	// So if we find that we're not using Chrome then it's best to just
	// go on and load up the driftless.js library and use its functions instead
	// of the native setInterval. Doesn't fix all of the problems but at least
	// it makes it playable across more browsers!
	notChrome = event.data.notChrome;

	if (notChrome) {
		if (!present) {
			setDriftlessTimeout = driftless.setDriftlessTimeout;
			setDriftlessInterval = driftless.setDriftlessInterval;
			clearDriftless = driftless.clearDriftless;
		}

		if (event.data.startClock) {
			console.log("clickWorker - Starting Driftless Clock!");
			interval = setDriftlessInterval(workerTick, 1000);			
		} else {			
			console.log("clickWorker - Stopping Driftless Clock!");		
			clearDriftless(interval);
		}
	} else {
		if (event.data.startClock) {
			console.log("clickWorker - Starting Clock!");
			interval = setInterval(workerTick, 1000);			
		} else {			
			console.log("clickWorker - Stopping Clock!");		
			clearInterval(interval);
		}		
	}
}