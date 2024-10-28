/*jslint browser, long, indent2, white */

/*global
  self, console
*/

var clockTimer;
var notChrome;
var timer;
var workerTick;

timer = (function(){
  "use strict";
  var _clearInterval;
  var _setInterval;
  var currentTimeFromStart;
  var currentTimeMS;
  var delayCorrectionOnMiss;
  var delayProximityThreshold;
  var executeTimer;
  var newTimerID;
  var setDelayCorrectionOnMiss;
  var setDelayProximityThreshold;
  var startingTimeMS;
  var timersHandled;

  currentTimeMS = Date.now;
  startingTimeMS = parseInt((performance.timeOrigin || performance?.timing?.navigationStart || currentTimeMS()), 10);
  currentTimeFromStart = function(){return currentTimeMS() - startingTimeMS;};

  delayProximityThreshold = 1;
  delayCorrectionOnMiss = 1.1;
  timersHandled = {};
  newTimerID = 0;

  executeTimer = function(id, delayUntil, wrapper){

    var delayRemaining = delayUntil - timer.currentTimeFromStart();
    var delayRetry = Math.floor(delayRemaining / delayCorrectionOnMiss);
    //var theDate = new Date();

    if (delayRemaining > delayProximityThreshold) {
      timersHandled[id] = setTimeout(function() {
        //var theDate = new Date();
        //console.log(`Delayed by MS: ${delayRetry}, S: ${delayRetry / 1000}`);
        executeTimer(id, delayUntil, wrapper);
      }, delayRetry);
    } else {
      timersHandled[id] = setTimeout(function(){
        //console.log(`Running @ S: ${theDate.getSeconds()} M: ${theDate.getMilliseconds()}`);
        wrapper();
      }, 0);
    }
  };

  _clearInterval = function(id){
    return clearTimeout(timersHandled[id]);
  };

  _setInterval = function(callback, delayMS, ...params) {
    var delayUntil;
    var id;
    var wrapper;

    id = newTimerID;
    delayUntil = timer.currentTimeFromStart() + delayMS;
    wrapper = function(){
      delayUntil += delayMS;
      executeTimer(id, delayUntil, wrapper);
      return callback.call(undefined, ...params);
    };

    newTimerID += 1;
    executeTimer(id, delayUntil, wrapper);
    return id;
  };

  setDelayProximityThreshold = function(newProximityThreshold){
    if (typeof newProximityThreshold === "number" && !Number.isNaN(newProximityThreshold)) {
      delayProximityThreshold = newProximityThreshold;
    }

    return delayProximityThreshold;
  };

  setDelayCorrectionOnMiss = function(newCorrectionOnMiss){
    if (typeof newCorrectionOnMiss === "number" && !Number.isNaN(newCorrectionOnMiss)) {
      delayCorrectionOnMiss = newCorrectionOnMiss;
    }
    return delayCorrectionOnMiss;
  };

  return {
    "clearInterval": _clearInterval,
    "currentTimeFromStart": currentTimeFromStart,
    "currentTimeMS": currentTimeMS,
    "setDelayCorrectionOnMiss": setDelayCorrectionOnMiss,
    "setDelayProximityThreshold": setDelayProximityThreshold,
    "setInterval": _setInterval,
    "startingTimeMS": startingTimeMS
  };
}());

workerTick = function() {
  "use strict";
	postMessage({"startClick": true});
};

self.onmessage = function(event) {
  "use strict";
	//console.log("clickWorker - processing work request!");

	// Chrome is designed in such a way that setInterval doesn't drift around
	// like current spec seems to suggest it should. So, all of this stuff works
	// really nicely in Chrome. FireFox on the other hand does not take the time
	// to prevent setInterval from drifting further and further out of sync
	// resulting in a terrible experience when using a program that is
	// designed to act like a clock.

	// So if we find that we're not using Chrome then it's best to just
	// go on and use the customer timer object and its functions instead
	// of the native setInterval. Doesn't fix all of the problems but at least
	// it makes it playable across more browsers!
	notChrome = event.data.notChrome;

	if (notChrome) {
		if (event.data.startClock) {
			//console.log("clickWorker - Starting Timer Clock!");
			clockTimer = timer.setInterval(workerTick, 1000);
		} else {
			//console.log("clickWorker - Stopping Timer Clock!");
			timer.clearInterval(clockTimer);
		}
	} else {
		if (event.data.startClock) {
			//console.log("clickWorker - Starting Clock!");
			clockTimer = setInterval(workerTick, 1000);
		} else {
			//console.log("clickWorker - Stopping Clock!");
			clearInterval(clockTimer);
		}
	}
};