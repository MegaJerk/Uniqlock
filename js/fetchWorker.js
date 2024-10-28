/*jslint browser, long, indent2, white */

/*global
  self, console
*/

var audioBufferCache = {};

function fetchStream(type, path, filename, callback) {
  "use strict";
  var url = path + filename;

  if (type === "audio") {

    if (audioBufferCache[filename]) {
      return callback(audioBufferCache[filename]);
    }

    return Promise.all([fetch(url), filename]).then(function(vals){
      return getAudioBufferArray(...vals);
    }).then(function(vals){
      return setArrayBuffer(...vals);
    }).then(callback);
  } else {
    return undefined;
  }
}

function getAudioBufferArray(stream, filename){
  "use strict";
  return Promise.all([stream.arrayBuffer(), filename]);
}

function setArrayBuffer(arrayBuffer, filename) {	
  "use strict";
  if (filename) {
    //console.log(`Adding audio buffer to cache for file: ${filename}`);
    audioBufferCache[filename] = arrayBuffer;
  }

  return arrayBuffer;
}

self.onmessage = function(event) {
  "use strict";
  var data = event.data;
  var filename = data.filename;
  var isFetch = data.isFetch;
  var path = data.path;
  var type = data.type;

  //console.log("fetchWorker.js - processing work request!");

  if (isFetch) {
    if (type === "audio") {
      fetchStream(type, path, filename, function(arrayBuffer){
        postMessage({"arrayBuffer": arrayBuffer, "requestData": event.data});
      });
    }
  }
};