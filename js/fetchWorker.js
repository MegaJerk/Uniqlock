// import the indexedDB (or do *something* with it!) / cache
import {videoURLCache, audioBufferCache} from "./modules/cache.js";

function fetchStream(type, path, filename, callback) {
	var url = path + filename;

	if (type === "audio") {
		if (audioBufferCache[filename]) {
			return callback(audioBufferCache[filename]);
		}

		return Promise.all([fetch(url), filename]).then((vals)=>getAudioBufferArray(...vals)).then((vals)=>setArrayBuffer(...vals)).then(callback);

	} else if (type === "video" || type === "videoHour") {

		if (videoURLCache[filename]) {
			return callback(videoURLCache[filename]);
		}
		return Promise.all([fetch(url), filename]).then((vals)=>getVideoBlob(...vals)).then((vals)=>getBlobURL(...vals)).then(callback);
	} else {
		return undefined;
	}
}

function getAudioBufferArray(stream, filename){
	return Promise.all([stream.arrayBuffer(), filename]);
}

function setArrayBuffer(arrayBuffer, filename) {
	if (filename) {
		audioBufferCache[filename] = arrayBuffer;
	}

	return arrayBuffer;
}

function getVideoBlob(stream, filename) {
	return Promise.all([stream.blob(), filename]);
}

function getBlobURL(blob, filename){	
	var blobURL = self.URL.createObjectURL(blob);

	if (filename) {
		videoURLCache[filename] = blobURL;
	}

	return blobURL;
}

onmessage = function(event) {
	var data = event.data;
	var fetch = data.fetch;
	var type = data.type;
	var path = data.path;
	var filename = data.filename;

	console.log("fetchWorker.js - processing work request!");

	if (fetch) {
		if (type === "video" || type === "videoHour") {
			fetchStream(type, path, filename, function(videoBlobURL){
				postMessage({"requestData": event.data, "videoBlobURL": videoBlobURL});
			});			
		} else if (type === "audio") {			
			fetchStream(type, path, filename, function(arrayBuffer){					
				postMessage({"requestData": event.data, "arrayBuffer": arrayBuffer});					
			});
						
		}
	}
}