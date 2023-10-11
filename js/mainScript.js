
/* global setDriftlessInterval, clearDriftless */
/* eslint-env browser */
/* eslint no-console: ["error", { allow: ["log", "error"] }]  */

/*global 
  
*/


// contains the default configuration of each season
var seasonalData = {
	"1": {
		hasDay: true,
		hasNight: false,
		hasMidnight: false,
		hasHours: false,
		hasHourMusic: false
	},
	"2": {
		hasDay: true,
		hasNight: true,
		hasMidnight: false,
		nightStartHour: 0,
		nightEndHour: 3,
		hasHours: true,
		hasHourMusic: true,
		hoursFollowTime: true,
		hourStartingSecond: 0,
		hourEndingSecond: 30,
		lockedStartHour: 0,
		lockedEndHour: 3,
		glowStartHour: 0,
		glowEndHour: 3
  },
	"3": {
		hasDay: true,
		hasNight: true,
		hasMidnight: false,
		nightStartHour: 0,
		nightEndHour: 1,
		hasHours: true,
		hoursFollowTime: true,
		hasHourMusic: false,
		hourStartingSecond: 55,
		hourEndingSecond: 10,
		lockedStartHour: 0,
		lockedEndHour: 1,
		glowStartHour: 0,
		glowEndHour: 3
	},
	"4": {
		hasDay: true,
		hasNight: true,
		hasMidnight: false,
		nightStartHour: 0,
		nightEndHour: 6,
		hasHours: true,
		hoursFollowTime: false,
		hasHourMusic: true,
		hourStartingSecond: 0,
		hourEndingSecond: 30,
		lockedStartHour: 0,
		lockedEndHour: 6,
		glowStartHour: 0,
		glowEndHour: 6
	},
	"5": {
		hasDay: true, 
		hasNight: true,
		hasMidnight: true,
		nightStartHour: 21,
		midnightStartHour: 0,
		midnightEndHour: 3,
		nightEndHour: 6,
		hasHours: true,
		hoursFollowTime: true,
		hasHourMusic: true,
		hourStartingSecond: 0,
		hourEndingSecond: 30,
		lockedStartHour: 21,
		lockedEndHour: 6,
		glowStartHour: 21,
		glowEndHour: 6
	},
	"6": {
		hasDay: true,
		hasNight: false,
		hasMidnight: false,
		hasHours: true,
		hoursFollowTime: false,
		hasHourMusic: true,
		hourStartingSecond: 0,
		hourEndingSecond: 30
	}
};

// contains a reference for each video track, per season, per time of day
var videosBySeason = {
	"1": {
		"seconds": {
			"day": [
				"Season 1 - Day - 01.webm",
				"Season 1 - Day - 02.webm",
				"Season 1 - Day - 03.webm",
				"Season 1 - Day - 04.webm",
				"Season 1 - Day - 05.webm",
				"Season 1 - Day - 06.webm",
				"Season 1 - Day - 07.webm",
				"Season 1 - Day - 08.webm",
				"Season 1 - Day - 09.webm",
				"Season 1 - Day - 10.webm",
				"Season 1 - Day - 11.webm",
				"Season 1 - Day - 12.webm",
				"Season 1 - Day - 13.webm",
				"Season 1 - Day - 14.webm",
				"Season 1 - Day - 15.webm",
				"Season 1 - Day - 16.webm",
				"Season 1 - Day - 17.webm",
				"Season 1 - Day - 18.webm",
				"Season 1 - Day - 19.webm",
				"Season 1 - Day - 20.webm",
				"Season 1 - Day - 21.webm",
				"Season 1 - Day - 22.webm",
				"Season 1 - Day - 23.webm",
				"Season 1 - Day - 24.webm",
				"Season 1 - Day - 25.webm",
				"Season 1 - Day - 26.webm",
				"Season 1 - Day - 27.webm",
				"Season 1 - Day - 28.webm",
				"Season 1 - Day - 29.webm",
				"Season 1 - Day - 30.webm",
				"Season 1 - Day - 31.webm",
				"Season 1 - Day - 32.webm",
				"Season 1 - Day - 33.webm",
				"Season 1 - Day - 34.webm",
				"Season 1 - Day - 35.webm",
				"Season 1 - Day - 36.webm",
				"Season 1 - Day - 37.webm",
				"Season 1 - Day - 38.webm",
				"Season 1 - Day - 39.webm",
				"Season 1 - Day - 40.webm",
				"Season 1 - Day - 41.webm",
				"Season 1 - Day - 42.webm",
				"Season 1 - Day - 43.webm",
				"Season 1 - Day - 44.webm",
				"Season 1 - Day - 45.webm",
				"Season 1 - Day - 46.webm",
				"Season 1 - Day - 47.webm",
				"Season 1 - Day - 48.webm",
				"Season 1 - Day - 49.webm",
				"Season 1 - Day - 50.webm",
				"Season 1 - Day - 51.webm",
				"Season 1 - Day - 52.webm",
				"Season 1 - Day - 53.webm",
				"Season 1 - Day - 54.webm",
				"Season 1 - Day - 55.webm",
				"Season 1 - Day - 56.webm"
			],
			"night": [],
			"midnight": []
		},
		"hours": []
	},
	"2": {
		"seconds": {
			"day": [
				"Season 2 - Day - 01.webm",
				"Season 2 - Day - 02.webm",
				"Season 2 - Day - 03.webm",
				"Season 2 - Day - 04.webm",
				"Season 2 - Day - 05.webm",
				"Season 2 - Day - 06.webm",
				"Season 2 - Day - 07.webm",
				"Season 2 - Day - 08.webm",
				"Season 2 - Day - 09.webm",
				"Season 2 - Day - 10.webm",
				"Season 2 - Day - 11.webm",
				"Season 2 - Day - 12.webm",
				"Season 2 - Day - 13.webm",
				"Season 2 - Day - 14.webm",
				"Season 2 - Day - 15.webm",
				"Season 2 - Day - 16.webm",
				"Season 2 - Day - 17.webm",
				"Season 2 - Day - 18.webm",
				"Season 2 - Day - 19.webm",
				"Season 2 - Day - 20.webm",
				"Season 2 - Day - 21.webm",
				"Season 2 - Day - 22.webm",
				"Season 2 - Day - 23.webm",
				"Season 2 - Day - 24.webm",
				"Season 2 - Day - 25.webm",
				"Season 2 - Day - 26.webm",
				"Season 2 - Day - 27.webm",
				"Season 2 - Day - 28.webm",
				"Season 2 - Day - 29.webm",
				"Season 2 - Day - 30.webm",
				"Season 2 - Day - 31.webm",
				"Season 2 - Day - 32.webm",
				"Season 2 - Day - 33.webm",
				"Season 2 - Day - 34.webm",
				"Season 2 - Day - 35.webm",
				"Season 2 - Day - 36.webm",
				"Season 2 - Day - 37.webm",
				"Season 2 - Day - 38.webm",
				"Season 2 - Day - 39.webm",
				"Season 2 - Day - 40.webm",
				"Season 2 - Day - 41.webm",
				"Season 2 - Day - 42.webm",
				"Season 2 - Day - 43.webm",
				"Season 2 - Day - 44.webm",
				"Season 2 - Day - 45.webm",
				"Season 2 - Day - 46.webm",
				"Season 2 - Day - 47.webm",
				"Season 2 - Day - 48.webm",
				"Season 2 - Day - 49.webm",
				"Season 2 - Day - 50.webm",
				"Season 2 - Day - 51.webm",
				"Season 2 - Day - 52.webm",
				"Season 2 - Day - 53.webm",
				"Season 2 - Day - 54.webm",
				"Season 2 - Day - 55.webm",
				"Season 2 - Day - 56.webm",
				"Season 2 - Day - 57.webm",
				"Season 2 - Day - 58.webm",
				"Season 2 - Day - 59.webm",
				"Season 2 - Day - 60.webm",
				"Season 2 - Day - 61.webm",
				"Season 2 - Day - 62.webm",
				"Season 2 - Day - 63.webm",
				"Season 2 - Day - 64.webm",
				"Season 2 - Day - 65.webm",
				"Season 2 - Day - 66.webm",
				"Season 2 - Day - 67.webm",
				"Season 2 - Day - 68.webm",
				"Season 2 - Day - 69.webm",
				"Season 2 - Day - 70.webm",
				"Season 2 - Day - 71.webm",
				"Season 2 - Day - 72.webm",
				"Season 2 - Day - 73.webm",
				"Season 2 - Day - 74.webm",
				"Season 2 - Day - 75.webm",
				"Season 2 - Day - 76.webm",
				"Season 2 - Day - 77.webm",
				"Season 2 - Day - 78.webm",
				"Season 2 - Day - 79.webm"
			],
			"night": [
				"Season 2 - Night - 01.webm",
				"Season 2 - Night - 02.webm",
				"Season 2 - Night - 03.webm",
				"Season 2 - Night - 04.webm",
				"Season 2 - Night - 05.webm",
				"Season 2 - Night - 06.webm",
				"Season 2 - Night - 07.webm",
				"Season 2 - Night - 08.webm",
				"Season 2 - Night - 09.webm",
				"Season 2 - Night - 10.webm",
				"Season 2 - Night - 11.webm",
				"Season 2 - Night - 12.webm",
				"Season 2 - Night - 13.webm",
				"Season 2 - Night - 14.webm",
				"Season 2 - Night - 15.webm",
				"Season 2 - Night - 16.webm",
				"Season 2 - Night - 17.webm",
				"Season 2 - Night - 18.webm",
				"Season 2 - Night - 19.webm",
				"Season 2 - Night - 20.webm",
				"Season 2 - Night - 21.webm",
				"Season 2 - Night - 22.webm",
				"Season 2 - Night - 23.webm",
				"Season 2 - Night - 24.webm",
				"Season 2 - Night - 25.webm",
				"Season 2 - Night - 26.webm",
				"Season 2 - Night - 27.webm",
				"Season 2 - Night - 28.webm",
				"Season 2 - Night - 29.webm",
				"Season 2 - Night - 30.webm",
				"Season 2 - Night - 31.webm",
				"Season 2 - Night - 32.webm",
				"Season 2 - Night - 33.webm",
				"Season 2 - Night - 34.webm",
				"Season 2 - Night - 35.webm",
				"Season 2 - Night - 36.webm",
				"Season 2 - Night - 37.webm",
				"Season 2 - Night - 38.webm",
				"Season 2 - Night - 39.webm",
				"Season 2 - Night - 40.webm",
				"Season 2 - Night - 41.webm",
				"Season 2 - Night - 42.webm"
			],
			"midnight": []
		},
		"hours": [
			"Season 2 - Hour - 00.webm",
			"Season 2 - Hour - 01.webm",
			"Season 2 - Hour - 02.webm",
			"Season 2 - Hour - 03.webm",
			"Season 2 - Hour - 04.webm",
			"Season 2 - Hour - 05.webm",
			"Season 2 - Hour - 06.webm",
			"Season 2 - Hour - 07.webm",
			"Season 2 - Hour - 08.webm",
			"Season 2 - Hour - 09.webm",
			"Season 2 - Hour - 10.webm",
			"Season 2 - Hour - 11.webm",
			"Season 2 - Hour - 12.webm",
			"Season 2 - Hour - 13.webm",
			"Season 2 - Hour - 14.webm",
			"Season 2 - Hour - 15.webm",
			"Season 2 - Hour - 16.webm",
			"Season 2 - Hour - 17.webm",
			"Season 2 - Hour - 18.webm",
			"Season 2 - Hour - 19.webm",
			"Season 2 - Hour - 20.webm",
			"Season 2 - Hour - 21.webm",
			"Season 2 - Hour - 22.webm",
			"Season 2 - Hour - 23.webm"
			
		]
	},
	"3": {
		"seconds": {
			"day": [
				"Season 3 - Day - 01.webm",
				"Season 3 - Day - 02.webm",
				"Season 3 - Day - 03.webm",
				"Season 3 - Day - 04.webm",
				"Season 3 - Day - 05.webm",
				"Season 3 - Day - 06.webm",
				"Season 3 - Day - 07.webm",
				"Season 3 - Day - 08.webm",
				"Season 3 - Day - 09.webm",
				"Season 3 - Day - 10.webm",
				"Season 3 - Day - 11.webm",
				"Season 3 - Day - 13.webm",
				"Season 3 - Day - 14.webm",
				"Season 3 - Day - 15.webm",
				"Season 3 - Day - 16.webm",
				"Season 3 - Day - 17.webm",
				"Season 3 - Day - 18.webm",
				"Season 3 - Day - 19.webm",
				"Season 3 - Day - 20.webm",
				"Season 3 - Day - 21.webm",
				"Season 3 - Day - 22.webm",
				"Season 3 - Day - 23.webm",
				"Season 3 - Day - 24.webm",
				"Season 3 - Day - 25.webm",
				"Season 3 - Day - 27.webm",
				"Season 3 - Day - 28.webm",
				"Season 3 - Day - 29.webm",
				"Season 3 - Day - 30.webm",
				"Season 3 - Day - 31.webm",
				"Season 3 - Day - 32.webm",
				"Season 3 - Day - 34.webm",
				"Season 3 - Day - 36.webm",
				"Season 3 - Day - 37.webm",
				"Season 3 - Day - 38.webm",
				"Season 3 - Day - 39.webm",
				"Season 3 - Day - 40.webm",
				"Season 3 - Day - 41.webm",
				"Season 3 - Day - 42.webm",
				"Season 3 - Day - 43.webm",
				"Season 3 - Day - 44.webm",
				"Season 3 - Day - 45.webm",
				"Season 3 - Day - 46.webm",
				"Season 3 - Day - 47.webm",
				"Season 3 - Day - 48.webm",
				"Season 3 - Day - 49.webm",
				"Season 3 - Day - 50.webm",
				"Season 3 - Day - 51.webm",
				"Season 3 - Day - 52.webm",
				"Season 3 - Day - 53.webm",
				"Season 3 - Day - 54.webm",
				"Season 3 - Day - 55.webm",
				"Season 3 - Day - 56.webm",
				"Season 3 - Day - 57.webm",
				"Season 3 - Day - 58.webm",
				"Season 3 - Day - 59.webm",
				"Season 3 - Day - 60.webm",
				"Season 3 - Day - 61.webm",
				"Season 3 - Day - 62.webm",
				"Season 3 - Day - 63.webm",
				"Season 3 - Day - 64.webm",
				"Season 3 - Day - 65.webm",
				"Season 3 - Day - 66.webm",
				"Season 3 - Day - 67.webm",
				"Season 3 - Day - 68.webm",
				"Season 3 - Day - 69.webm",
				"Season 3 - Day - 71.webm",
				"Season 3 - Day - 72.webm",
				"Season 3 - Day - 73.webm",
				"Season 3 - Day - 74.webm",
				"Season 3 - Day - 75.webm",
				"Season 3 - Day - 76.webm",
				"Season 3 - Day - 77.webm",
				"Season 3 - Day - 78.webm",
				"Season 3 - Day - 79.webm",
				"Season 3 - Day - 80.webm",
				"Season 3 - Day - 81.webm",
				"Season 3 - Day - 82.webm",
				"Season 3 - Day - 83.webm"
			],
			"night": [
				"Season 3 - Night - 01.webm",
				"Season 3 - Night - 02.webm",
				"Season 3 - Night - 03.webm",
				"Season 3 - Night - 04.webm",
				"Season 3 - Night - 05.webm",
				"Season 3 - Night - 06.webm",
				"Season 3 - Night - 07.webm",
				"Season 3 - Night - 08.webm"
			],
			"midnight": []
		},
		"hours": [
			"Season 3 - Hour - 00.webm",
			"Season 3 - Hour - 01.webm",
			"Season 3 - Hour - 02.webm",
			"Season 3 - Hour - 03.webm",
			"Season 3 - Hour - 04.webm",
			"Season 3 - Hour - 05.webm",
			"Season 3 - Hour - 06.webm",
			"Season 3 - Hour - 07.webm",
			"Season 3 - Hour - 08.webm",
			"Season 3 - Hour - 09.webm",
			"Season 3 - Hour - 10.webm",
			"Season 3 - Hour - 11.webm",
			"Season 3 - Hour - 12.webm",
			"Season 3 - Hour - 13.webm",
			"Season 3 - Hour - 14.webm",
			"Season 3 - Hour - 15.webm",
			"Season 3 - Hour - 16.webm",
			"Season 3 - Hour - 17.webm",
			"Season 3 - Hour - 18.webm",
			"Season 3 - Hour - 19.webm",
			"Season 3 - Hour - 20.webm",
			"Season 3 - Hour - 21.webm",
			"Season 3 - Hour - 22.webm",
			"Season 3 - Hour - 23.webm"			
		]
	},
	"4": {
		"seconds": {
			"day": [
				"Season 4 - Day - 01.webm",
				"Season 4 - Day - 02.webm",
				"Season 4 - Day - 03.webm",
				"Season 4 - Day - 04.webm",
				"Season 4 - Day - 05.webm",
				"Season 4 - Day - 06.webm",
				"Season 4 - Day - 07.webm",
				"Season 4 - Day - 08.webm",
				"Season 4 - Day - 09.webm",
				"Season 4 - Day - 10.webm",
				"Season 4 - Day - 11.webm",
				"Season 4 - Day - 12.webm",
				"Season 4 - Day - 13.webm",
				"Season 4 - Day - 14.webm",
				"Season 4 - Day - 15.webm",
				"Season 4 - Day - 16.webm",
				"Season 4 - Day - 17.webm",
				"Season 4 - Day - 18.webm",
				"Season 4 - Day - 19.webm",
				"Season 4 - Day - 20.webm",
				"Season 4 - Day - 21.webm",
				"Season 4 - Day - 22.webm",
				"Season 4 - Day - 23.webm",
				"Season 4 - Day - 24.webm",
				"Season 4 - Day - 25.webm",
				"Season 4 - Day - 26.webm",
				"Season 4 - Day - 27.webm",
				"Season 4 - Day - 28.webm",
				"Season 4 - Day - 29.webm",
				"Season 4 - Day - 30.webm",
				"Season 4 - Day - 31.webm",
				"Season 4 - Day - 32.webm",
				"Season 4 - Day - 33.webm",
				"Season 4 - Day - 34.webm",
				"Season 4 - Day - 35.webm",
				"Season 4 - Day - 36.webm",
				"Season 4 - Day - 38.webm",
				"Season 4 - Day - 39.webm",
				"Season 4 - Day - 40.webm",
				"Season 4 - Day - 41.webm",
				"Season 4 - Day - 42.webm",
				"Season 4 - Day - 43.webm",
				"Season 4 - Day - 44.webm"
			],
			"night": [
				"Season 4 - Night - 01.webm",
				"Season 4 - Night - 02.webm",
				"Season 4 - Night - 03.webm",
				"Season 4 - Night - 04.webm",
				"Season 4 - Night - 05.webm",
				"Season 4 - Night - 06.webm",
				"Season 4 - Night - 07.webm",
				"Season 4 - Night - 08.webm",
				"Season 4 - Night - 09.webm",
				"Season 4 - Night - 10.webm",
				"Season 4 - Night - 11.webm",
				"Season 4 - Night - 12.webm",
				"Season 4 - Night - 13.webm",
				"Season 4 - Night - 14.webm",
				"Season 4 - Night - 15.webm",
				"Season 4 - Night - 16.webm",
				"Season 4 - Night - 17.webm",
				"Season 4 - Night - 18.webm",
				"Season 4 - Night - 19.webm",
				"Season 4 - Night - 20.webm",
				"Season 4 - Night - 21.webm",
				"Season 4 - Night - 22.webm",
				"Season 4 - Night - 23.webm",
				"Season 4 - Night - 24.webm",
				"Season 4 - Night - 25.webm",
				"Season 4 - Night - 26.webm",
				"Season 4 - Night - 27.webm",
				"Season 4 - Night - 28.webm",
				"Season 4 - Night - 29.webm",
				"Season 4 - Night - 30.webm",
				"Season 4 - Night - 31.webm",
				"Season 4 - Night - 32.webm",
				"Season 4 - Night - 33.webm",
				"Season 4 - Night - 34.webm",
				"Season 4 - Night - 35.webm",
				"Season 4 - Night - 36.webm",
				"Season 4 - Night - 37.webm",
				"Season 4 - Night - 38.webm",
				"Season 4 - Night - 39.webm",
				"Season 4 - Night - 40.webm",
				"Season 4 - Night - 41.webm",
				"Season 4 - Night - 42.webm",
				"Season 4 - Night - 43.webm",
				"Season 4 - Night - 44.webm",
				"Season 4 - Night - 45.webm",
				"Season 4 - Night - 46.webm",
				"Season 4 - Night - 47.webm",
				"Season 4 - Night - 48.webm",
				"Season 4 - Night - 49.webm",
				"Season 4 - Night - 50.webm",
				"Season 4 - Night - 51.webm",
				"Season 4 - Night - 52.webm",
				"Season 4 - Night - 53.webm"
			],
			"midnight": []
		},
		"hours": [
			"Season 4 - Hour - 00.webm",
			"Season 4 - Hour - 01.webm",
			"Season 4 - Hour - 02.webm",
			"Season 4 - Hour - 03.webm",
			"Season 4 - Hour - 04.webm",
			"Season 4 - Hour - 05.webm",
			"Season 4 - Hour - 06.webm",
			"Season 4 - Hour - 07.webm"
		]
	},
	"5": {
		"seconds": {
			"day": [
				"Season 5 - Day - 001.webm",
				"Season 5 - Day - 002.webm",
				"Season 5 - Day - 003.webm",
				"Season 5 - Day - 004.webm",
				"Season 5 - Day - 005.webm",
				"Season 5 - Day - 006.webm",
				"Season 5 - Day - 007.webm",
				"Season 5 - Day - 008.webm",
				"Season 5 - Day - 009.webm",
				"Season 5 - Day - 010.webm",
				"Season 5 - Day - 011.webm",
				"Season 5 - Day - 012.webm",
				"Season 5 - Day - 013.webm",
				"Season 5 - Day - 014.webm",
				"Season 5 - Day - 015.webm",
				"Season 5 - Day - 016.webm",
				"Season 5 - Day - 017.webm",
				"Season 5 - Day - 018.webm",
				"Season 5 - Day - 019.webm",
				"Season 5 - Day - 020.webm",
				"Season 5 - Day - 021.webm",
				"Season 5 - Day - 022.webm",
				"Season 5 - Day - 023.webm",
				"Season 5 - Day - 024.webm",
				"Season 5 - Day - 025.webm",
				"Season 5 - Day - 026.webm",
				"Season 5 - Day - 027.webm",
				"Season 5 - Day - 028.webm",
				"Season 5 - Day - 029.webm",
				"Season 5 - Day - 030.webm",
				"Season 5 - Day - 031.webm",
				"Season 5 - Day - 032.webm",
				"Season 5 - Day - 033.webm",
				"Season 5 - Day - 034.webm",
				"Season 5 - Day - 035.webm",
				"Season 5 - Day - 036.webm",
				"Season 5 - Day - 037.webm",
				"Season 5 - Day - 038.webm",
				"Season 5 - Day - 039.webm",
				"Season 5 - Day - 040.webm",
				"Season 5 - Day - 041.webm",
				"Season 5 - Day - 042.webm",
				"Season 5 - Day - 043.webm",
				"Season 5 - Day - 044.webm",
				"Season 5 - Day - 045.webm",
				"Season 5 - Day - 046.webm",
				"Season 5 - Day - 047.webm",
				"Season 5 - Day - 048.webm",
				"Season 5 - Day - 049.webm",
				"Season 5 - Day - 050.webm",
				"Season 5 - Day - 051.webm",
				"Season 5 - Day - 052.webm",
				"Season 5 - Day - 053.webm",
				"Season 5 - Day - 054.webm",
				"Season 5 - Day - 055.webm",
				"Season 5 - Day - 056.webm",
				"Season 5 - Day - 057.webm",
				"Season 5 - Day - 058.webm",
				"Season 5 - Day - 059.webm",
				"Season 5 - Day - 060.webm",
				"Season 5 - Day - 061.webm",
				"Season 5 - Day - 062.webm",
				"Season 5 - Day - 063.webm",
				"Season 5 - Day - 064.webm",
				"Season 5 - Day - 065.webm",
				"Season 5 - Day - 066.webm",
				"Season 5 - Day - 067.webm",
				"Season 5 - Day - 068.webm",
				"Season 5 - Day - 069.webm",
				"Season 5 - Day - 070.webm",
				"Season 5 - Day - 071.webm",
				"Season 5 - Day - 072.webm",
				"Season 5 - Day - 073.webm",
				"Season 5 - Day - 074.webm",
				"Season 5 - Day - 075.webm",
				"Season 5 - Day - 076.webm",
				"Season 5 - Day - 077.webm",
				"Season 5 - Day - 078.webm",
				"Season 5 - Day - 079.webm",
				"Season 5 - Day - 080.webm",
				"Season 5 - Day - 081.webm",
				"Season 5 - Day - 082.webm",
				"Season 5 - Day - 083.webm",
				"Season 5 - Day - 084.webm",
				"Season 5 - Day - 085.webm",
				"Season 5 - Day - 086.webm",
				"Season 5 - Day - 087.webm",
				"Season 5 - Day - 088.webm",
				"Season 5 - Day - 089.webm",
				"Season 5 - Day - 090.webm",
				"Season 5 - Day - 091.webm",
				"Season 5 - Day - 092.webm",
				"Season 5 - Day - 093.webm",
				"Season 5 - Day - 094.webm",
				"Season 5 - Day - 095.webm",
				"Season 5 - Day - 096.webm",
				"Season 5 - Day - 097.webm",
				"Season 5 - Day - 098.webm",
				"Season 5 - Day - 099.webm",
				"Season 5 - Day - 101.webm",
				"Season 5 - Day - 102.webm",
				"Season 5 - Day - 103.webm",
				"Season 5 - Day - 104.webm",
				"Season 5 - Day - 105.webm",
				"Season 5 - Day - 106.webm"
			],
			"night": [
				"Season 5 - Night - 01.webm",
				"Season 5 - Night - 02.webm",
				"Season 5 - Night - 03.webm",
				"Season 5 - Night - 04.webm",
				"Season 5 - Night - 05.webm",
				"Season 5 - Night - 06.webm",
				"Season 5 - Night - 07.webm",
				"Season 5 - Night - 08.webm",
				"Season 5 - Night - 09.webm",
				"Season 5 - Night - 10.webm",
				"Season 5 - Night - 11.webm",
				"Season 5 - Night - 12.webm",
				"Season 5 - Night - 13.webm",
				"Season 5 - Night - 14.webm",
				"Season 5 - Night - 15.webm",
				"Season 5 - Night - 16.webm",
				"Season 5 - Night - 17.webm",
				"Season 5 - Night - 18.webm",
				"Season 5 - Night - 19.webm",
				"Season 5 - Night - 20.webm",
				"Season 5 - Night - 21.webm",
				"Season 5 - Night - 22.webm",
				"Season 5 - Night - 23.webm",
				"Season 5 - Night - 24.webm",
				"Season 5 - Night - 25.webm",
				"Season 5 - Night - 26.webm",
				"Season 5 - Night - 27.webm",
				"Season 5 - Night - 28.webm",
				"Season 5 - Night - 29.webm",
				"Season 5 - Night - 30.webm",
				"Season 5 - Night - 31.webm",
				"Season 5 - Night - 32.webm",
				"Season 5 - Night - 33.webm",
				"Season 5 - Night - 34.webm",
				"Season 5 - Night - 35.webm",
				"Season 5 - Night - 36.webm",
				"Season 5 - Night - 37.webm",
				"Season 5 - Night - 38.webm",
				"Season 5 - Night - 39.webm",
				"Season 5 - Night - 40.webm",
				"Season 5 - Night - 41.webm",
				"Season 5 - Night - 42.webm",
				"Season 5 - Night - 43.webm",
				"Season 5 - Night - 44.webm",
				"Season 5 - Night - 45.webm",
				"Season 5 - Night - 46.webm",
				"Season 5 - Night - 47.webm",
				"Season 5 - Night - 48.webm"
			],
			"midnight": [
				"Season 5 - Midnight - 01.webm",
				"Season 5 - Midnight - 02.webm",
				"Season 5 - Midnight - 03.webm",
				"Season 5 - Midnight - 04.webm",
				"Season 5 - Midnight - 05.webm",
				"Season 5 - Midnight - 06.webm",
				"Season 5 - Midnight - 07.webm",
				"Season 5 - Midnight - 08.webm",
				"Season 5 - Midnight - 09.webm",
				"Season 5 - Midnight - 10.webm"
			]
		},
		"hours": [
			"Season 5 - Hour - 00.webm",
			"Season 5 - Hour - 01.webm",
			"Season 5 - Hour - 02.webm",
			"Season 5 - Hour - 03.webm",
			"Season 5 - Hour - 04.webm",
			"Season 5 - Hour - 05.webm",
			"Season 5 - Hour - 06.webm",
			"Season 5 - Hour - 07.webm",
			"Season 5 - Hour - 08.webm",
			"Season 5 - Hour - 09.webm",
			"Season 5 - Hour - 10.webm",
			"Season 5 - Hour - 11.webm",
			"Season 5 - Hour - 12.webm",
			"Season 5 - Hour - 13.webm",
			"Season 5 - Hour - 14.webm",
			"Season 5 - Hour - 15.webm",
			"Season 5 - Hour - 16.webm",
			"Season 5 - Hour - 17.webm",
			"Season 5 - Hour - 18.webm",
			"Season 5 - Hour - 19.webm",
			"Season 5 - Hour - 20.webm",
			"Season 5 - Hour - 21.webm",
			"Season 5 - Hour - 22.webm",
			"Season 5 - Hour - 23.webm"
		]
	},
	"6": {
		"seconds": {
			"day": [
				"Season 6 - Day - 001.webm",
				"Season 6 - Day - 002.webm",
				"Season 6 - Day - 003.webm",
				"Season 6 - Day - 004.webm",
				"Season 6 - Day - 005.webm",
				"Season 6 - Day - 006.webm",
				"Season 6 - Day - 007.webm",
				"Season 6 - Day - 008.webm",
				"Season 6 - Day - 009.webm",
				"Season 6 - Day - 010.webm",
				"Season 6 - Day - 011.webm",
				"Season 6 - Day - 012.webm",
				"Season 6 - Day - 013.webm",
				"Season 6 - Day - 014.webm",
				"Season 6 - Day - 015.webm",
				"Season 6 - Day - 016.webm",
				"Season 6 - Day - 017.webm",
				"Season 6 - Day - 018.webm",
				"Season 6 - Day - 019.webm",
				"Season 6 - Day - 020.webm",
				"Season 6 - Day - 021.webm",
				"Season 6 - Day - 022.webm",
				"Season 6 - Day - 023.webm",
				"Season 6 - Day - 024.webm",
				"Season 6 - Day - 025.webm",
				"Season 6 - Day - 026.webm",
				"Season 6 - Day - 027.webm",
				"Season 6 - Day - 028.webm",
				"Season 6 - Day - 029.webm",
				"Season 6 - Day - 030.webm",
				"Season 6 - Day - 031.webm",
				"Season 6 - Day - 032.webm",
				"Season 6 - Day - 033.webm",
				"Season 6 - Day - 034.webm",
				"Season 6 - Day - 035.webm",
				"Season 6 - Day - 036.webm",
				"Season 6 - Day - 037.webm",
				"Season 6 - Day - 038.webm",
				"Season 6 - Day - 039.webm",
				"Season 6 - Day - 040.webm",
				"Season 6 - Day - 041.webm",
				"Season 6 - Day - 042.webm",
				"Season 6 - Day - 043.webm",
				"Season 6 - Day - 044.webm",
				"Season 6 - Day - 045.webm",
				"Season 6 - Day - 046.webm",
				"Season 6 - Day - 047.webm",
				"Season 6 - Day - 048.webm",
				"Season 6 - Day - 049.webm",
				"Season 6 - Day - 050.webm",
				"Season 6 - Day - 051.webm",
				"Season 6 - Day - 052.webm",
				"Season 6 - Day - 053.webm",
				"Season 6 - Day - 054.webm",
				"Season 6 - Day - 055.webm",
				"Season 6 - Day - 056.webm",
				"Season 6 - Day - 057.webm",
				"Season 6 - Day - 058.webm",
				"Season 6 - Day - 059.webm",
				"Season 6 - Day - 060.webm",
				"Season 6 - Day - 061.webm",
				"Season 6 - Day - 062.webm",
				"Season 6 - Day - 063.webm",
				"Season 6 - Day - 064.webm",
				"Season 6 - Day - 065.webm",
				"Season 6 - Day - 066.webm",
				"Season 6 - Day - 067.webm",
				"Season 6 - Day - 068.webm",
				"Season 6 - Day - 069.webm",
				"Season 6 - Day - 070.webm",
				"Season 6 - Day - 071.webm",
				"Season 6 - Day - 072.webm",
				"Season 6 - Day - 073.webm",
				"Season 6 - Day - 074.webm",
				"Season 6 - Day - 075.webm",
				"Season 6 - Day - 076.webm",
				"Season 6 - Day - 077.webm",
				"Season 6 - Day - 078.webm",
				"Season 6 - Day - 079.webm",
				"Season 6 - Day - 080.webm",
				"Season 6 - Day - 081.webm",
				"Season 6 - Day - 082.webm",
				"Season 6 - Day - 083.webm",
				"Season 6 - Day - 084.webm",
				"Season 6 - Day - 085.webm",
				"Season 6 - Day - 086.webm",
				"Season 6 - Day - 087.webm",
				"Season 6 - Day - 089.webm",
				"Season 6 - Day - 090.webm",
				"Season 6 - Day - 091.webm",
				"Season 6 - Day - 092.webm",
				"Season 6 - Day - 093.webm",
				"Season 6 - Day - 094.webm",
				"Season 6 - Day - 095.webm",
				"Season 6 - Day - 096.webm",
				"Season 6 - Day - 097.webm",
				"Season 6 - Day - 098.webm",
				"Season 6 - Day - 099.webm",
				"Season 6 - Day - 100.webm",
				"Season 6 - Day - 101.webm",
				"Season 6 - Day - 102.webm",
				"Season 6 - Day - 103.webm",
				"Season 6 - Day - 104.webm"
			],
			"night": [],
			"midnight": []
		},
		"hours": [
			"Season 6 - Hour - 00.webm",
			"Season 6 - Hour - 01.webm",
			"Season 6 - Hour - 02.webm",
			"Season 6 - Hour - 03.webm",
			"Season 6 - Hour - 04.webm"
		]
	}
};

// contains a reference for each music track, per season, per time of day
var musicBySeason = {
	"1": {
		"minutes": {
			"day": [
				"00 - Season 1.ogg",
				"01 - Season 1.ogg",
				"02 - Season 1.ogg"
			],
			"night": [],
			"midnight": []
		},
		"hours": {
			"day": [],
			"night": [],
			"midnight": []
		},
		
	},
	"2": {
		"minutes": {
			"day": [
				"00 - Season 1.ogg",
				"01 - Season 1.ogg",
				"02 - Season 1.ogg",
				"03 - Season 2.ogg",
				"04 - Season 2.ogg"
			],
			"night": ["Night - 01 - Season 2.ogg"],
			"midnight": []
		},
		"hours": {
			"day": ["Special - Hour - Season 2.ogg"],
			"night": [],
			"midnight": []
		}	
	},
	"3": {
		"minutes": {
			"day": [
				"00 - Season 1.ogg",
				"01 - Season 1.ogg",
				"02 - Season 1.ogg",
				"03 - Season 2.ogg",
				"04 - Season 2.ogg",
				"05 - Season 3.ogg",
				"06 - Season 3.ogg",
				"07 - Season 3.ogg"
			],
			"night": ["Night - 01 - Season 2.ogg"],
			"midnight": []
		},
		"hours": {
			"day": [],
			"night": [],
			"midnight": []
		}		
	},
	"4": {
		"minutes": {
			"day": [
				"00 - Season 1.ogg",
				"01 - Season 1.ogg",
				"02 - Season 1.ogg",
				"03 - Season 2.ogg",
				"04 - Season 2.ogg",
				"05 - Season 3.ogg",
				"06 - Season 3.ogg",
				"07 - Season 3.ogg"
			],
			"night": [
				"Night - 01 - Season 2.ogg",
				"Night - 02 - Season 4.ogg",
				"Night - 03 - Season 4.ogg",
				"Night - 04 - Season 4.ogg"
			],
			"midnight": []
		},
		"hours": {
			"day": ["Special - Hour - Season 2.ogg"],
			"night": ["Special - Hour - Season 4.ogg"],
			"midnight": []
		}		
	},
	"5": {
		"minutes": {
			"day": [
				"00 - Season 1.ogg",
				"01 - Season 1.ogg",
				"02 - Season 1.ogg",
				"03 - Season 2.ogg",
				"04 - Season 2.ogg",
				"05 - Season 3.ogg",
				"06 - Season 3.ogg",
				"07 - Season 3.ogg",
				"08 - Season 5.ogg",
				"09 - Season 5.ogg",
				"10 - Season 5.ogg"
			],
			"night": [
				"Night - 02 - Season 4.ogg",
				"Night - 03 - Season 4.ogg",
				"Night - 04 - Season 4.ogg",
				"Night - 05 - Season 5.ogg"
			],
			"midnight": ["Night - 01 - Season 2.ogg"]
		},
		"hours": {
			"day": ["Special - Hour - Season 5.ogg"],
			"night": ["Special - Hour - Season 5.ogg"],
			"midnight": ["Special - Hour - Season 2.ogg"]
		}		
	},
	"6": {
		"minutes": {
			"day": [
				"00 - Season 1.ogg",
				"01 - Season 1.ogg",
				"02 - Season 1.ogg",
				"03 - Season 2.ogg",
				"04 - Season 2.ogg",
				"05 - Season 3.ogg",
				"06 - Season 3.ogg",
				"07 - Season 3.ogg",
				"08 - Season 5.ogg",
				"09 - Season 5.ogg",
				"10 - Season 5.ogg",
				"11 - Season 6.ogg",
				"12 - Season 6.ogg",
				"13 - Season 6.ogg"
			],
			"night": [],
			"midnight": []
		},
		"hours": {
			"day": ["Special - Hour - Season 6.ogg"],
			"night": [],
			"midnight": []
		}		
	}
};

// contains a reference for each screen color, per season, per hour
var colorBySeason = {
	"1": [
		[125,0,34],
		[23,23,156],
		[190,27,190],
		[19,206,164],
		[129,81,28],
		[42,126,0],
		[82,207,226],
		[255,153,0],
		[107,0,189],
		[255,90,0],
		[146,6,131],
		[153,216,19],
		[228,0,127],
		[255,187,0],
		[0,115,109],
		[0,160,233],
		[241,145,73],
		[138,128,0],
		[238,120,212],
		[127,229,107],
		[96,35,61],
		[29,69,162],
		[106,57,5],
		[231,63,178]
	],
	"2": [
		[125,0,34],
		[23,23,156],
		[96,35,61],
		[19,206,164],
		[129,81,28],
		[42,126,0],
		[82,207,226],
		[255,153,0],
		[107,0,189],
		[255,90,0],
		[146,6,131],
		[153,216,19],
		[228,0,127],
		[255,187,0],
		[0,115,109],
		[0,160,233],
		[241,145,73],
		[138,128,0],
		[238,120,212],
		[127,229,107],
		[190,27,190],
		[29,69,162],
		[106,57,5],
		[231,63,178]
	],
	"3": [
		[0,56,127],
		[66,33,6],
		[62,0,127],
		[127,87,0],
		[0,223,34],
		[191,54,0],
		[148,213,241],
		[135,191,0],
		[240,127,255],
		[67,127,0],
		[229,97,7],
		[251,176,59],
		[168,0,104],
		[0,157,136],
		[255,220,0],
		[223,0,136],
		[38,63,0],
		[255,182,220],
		[105,0,65],
		[0,149,255],
		[214,196,22],
		[0,211,223],
		[207,235,0],
		[119,32,199]
	],
	"4": [
		[0,56,104],
		[26,42,51],
		[168,0,104],
		[237,50,88],
		[93,8,117],
		[35,98,146],
		[148,213,241],
		[111,235,197],
		[135,191,0],
		[67,127,0],
		[241,90,36],
		[234,60,239],
		[0,223,34],
		[0,157,136],
		[255,220,0],
		[223,0,136],
		[0,211,223],
		[255,182,220],
		[207,235,0],
		[0,149,255],
		[214,196,22],
		[105,0,65],
		[38,63,0],
		[83,38,68]
	],
	"5": [
		[0,56,104],
		[26,42,51],
		[168,0,104],
		[237,50,88],
		[93,8,117],
		[35,98,146],
		[148,213,241],
		[111,235,197],
		[135,191,0],
		[67,127,0],
		[241,90,36],
		[234,60,239],
		[0,223,34],
		[0,157,136],
		[255,220,0],
		[223,0,136],
		[0,211,223],
		[255,182,220],
		[207,235,0],
		[0,149,255],
		[214,196,22],
		[105,0,65],
		[38,63,0],
		[83,38,68]
	],
	"6": [
		[0,56,104],
		[26,42,51],
		[168,0,104],
		[237,50,88],
		[93,8,117],
		[35,98,146],
		[148,213,241],
		[111,235,197],
		[135,191,0],
		[67,127,0],
		[241,90,36],
		[234,60,239],
		[0,223,34],
		[0,157,136],
		[255,220,0],
		[223,0,136],
		[0,211,223],
		[255,182,220],
		[207,235,0],
		[0,149,255],
		[214,196,22],
		[105,0,65],
		[38,63,0],
		[83,38,68]
	],
	"custom": []
};


/////////////////////////////////////////////////////////////////
// AUDIO STUFF!
/////////////////////////////////////////////////////////////////
var audioAssetsPath = "../assets/music/";


var lastTrackObject = {};
var nextTrackObject = {};
var sourceBuffer = undefined;

var trackStartTime = 0;
var started = false;

var customContext = new AudioContext();
var customGain = customContext.createGain();

// audio should start not at speaker breaking volume!
customGain.gain.value = 0.05;

// attach gain to Context
customGain.connect(customContext.destination);

/////////////////////////////////////////////////////////////////
// AUDIO CONTROLS!
/////////////////////////////////////////////////////////////////

var muteControl = document.querySelector("[data-action='mute']");
var volumeControl = document.querySelector("[data-action='volume']");






var videoAssetsPath = "../assets/videos/";

var video = document.querySelector("#videoPlayer video");
var source = document.querySelector("#videoPlayer video source");
var hourVideo = document.querySelector("#hourPlayer video");
var hourSource = document.querySelector("#hourPlayer video source");
var videoTrack = {
	"season": undefined,
	"filename": undefined,
	"index": -1,
	"status": undefined
};
var videoURLCache = {};
var videoBlobURL = undefined;
var currentVideoTrack = "";
var nextVideoTrack = "";
var currentVideoHourTrack = undefined;//"";
var videoHourBlobURL = undefined;
var nextVideoHourTrack = "";

//var maxHourDuration = 0;


var count = 0;

var viewContainer = document.getElementById("viewContainer");
var time1Container = document.querySelector("#time1");
var time2Container = document.querySelector("#time2");
var time1 = document.querySelector("#time1 .time");
var time2 = document.querySelector("#time2 .time");
var videoPlayer = document.querySelector("#videoPlayer");
var hourPlayer = document.querySelector("#hourPlayer");



var timeOfDay = "day";
var nextTimeOfDay = "day";

//var timeOfDayHour = 0;




var showVideo = false;
var showHour = false;
var cleanupVideo = false;
var cleanupHour = false;

var cssGetComputedStyle = getComputedStyle(document.documentElement);
var cssStyle = document.documentElement.style;



var clickWorker;
var fetchWorker;


var dumbTest;


/////////////////////////////////////////////////////////////////
// CONFIG OBJECTS!
/////////////////////////////////////////////////////////////////


// somewhere to store all of the audio buffers so we only have to
// make xhr requests once per track.
var audioBufferCache = {};

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


// Music Track Functions 
//function getTrackIndex(minutes){
function getTrackIndex(timeOfDay){
	//var actualTimeOfDay = ((minutes === 59) ? nextTimeOfDay : timeOfDay);
  var max = availableMusicMinutes[timeOfDay].length;
  var nextTrackIndex = Math.floor(Math.random() * max);

  if (max > 1 && nextTrackIndex === lastTrackObject.index) {
    nextTrackIndex = getTrackIndex(timeOfDay);
  }

  return nextTrackIndex;
}

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
  trackIndex = getTrackIndex(actualTimeOfDay);
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

/*
function getMusicTrack(type, timeOfDay, nextTimeOfDay, availableMusicMinutes, season, availableMusicHours ) {

	var trackIndex = 0;
	var calcTimeOfDay = type === "hour" ? nextTimeOfDay : timeOfDay;
	if (type === "hour" && availableMusicHours[season]) {

		let hourTracks = availableMusicHours[season][calcTimeOfDay];
		let max = hourTracks.length;
		trackIndex = Math.floor(Math.random() * max);
		return {
			name: hourTracks[trackIndex],
			type: type,
			index: trackIndex,
			startTime: 0,
			endTime: ((hourVideo.duration < 18) ? 15.056 : 30.056)
		};	
	} else {
		trackIndex = getTrackIndex(calcTimeOfDay);
		return {
			name: availableMusicMinutes[calcTimeOfDay][trackIndex],
			type: "minute",
			index: trackIndex,
			startTime: Math.floor(lastTrackObject.endTime || 0)
		};
	}
}
*/






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
function old_getAudioBufferArray(context, path, filename, callback) {

  // if the audioBufferCache already contains a buffer
  // for the filename in question, just send that along
  // to the setSourceBuffer function.
  if (audioBufferCache[filename]) {
    return setSourceBuffer(audioBufferCache[filename]);
  }

  // otherwise, make the url path and request
  var url = path + filename;
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  // when we get the buffer, add it to the cache, and send it
  // to the callback function.
  request.onload = function() {
    context.decodeAudioData(request.response, function(buffer) {
      if (!buffer) {
        alert("No Buffer From: " + url);
        return undefined;
      }

      // add buffer to cache:
      audioBufferCache[filename] = buffer;
      callback(buffer);
    });
  }

  request.onerror = function() {
    alert("getAudioBufferArray ERROR!");        
  }

  request.send();
}

function old_getAudioBufferArrayPromise(path, filename) {
	if (audioBufferCache[filename]) {
    return setSourceBuffer(audioBufferCache[filename]);
  }

	var url = path + filename;

	return fetch(url);
}

function old_setSourceBuffer(buffer){
	if (buffer && !sourceBuffer) {
		sourceBuffer = buffer;
	} else {
		alert("setSourceBuffer - Error! buffer undefined or sourceBuffer full!");
	}
}

function fetchAudioBufferStream(path, filename, callback){
	if (audioBufferCache[filename]) {
    return callback(audioBufferCache[filename]);
  }
	var url = path + filename;
	return Promise.all([fetch(url), filename]).then((vals)=>getAudioBufferArray(...vals)).then((vals)=>decodeAudioBuffer(...vals)).then((vals)=>callback(...vals));
}

function getAudioBufferArray(stream, filename){
	return Promise.all([stream.arrayBuffer(), filename]);
}

function decodeAudioBuffer(arrayBuffer, filename){
	return Promise.all([customContext.decodeAudioData(arrayBuffer), filename]);
}

function setSourceBuffer(buffer, filename){
	if (filename) {
		audioBufferCache[filename] = buffer;
	}	
	return sourceBuffer = buffer;
}

function playFromBuffer(startTime, endTime){
  var trackToPlay = customContext.createBufferSource();

  trackToPlay.buffer = sourceBuffer;
  trackToPlay.connect(customGain);

	/*
  if (startTime === undefined) {
    startTime = 0;
  }
	*/

  trackToPlay.start(0, startTime, endTime);

	return undefined;
}



// Video Track Selection Functions
/*
function getHourVideoSeason(currentVideoHourTrack){
  if (currentVideoHourTrack) {
    return parseInt(currentVideoHourTrack.match(/Season\s{1}\d{1}/)[0].slice(-1), 10);
  } else {
    return getRandomVideoSeason("hour");
  }  
}
*/
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
	/*
	console.log(`
		function: getRandomVideoSeason,
		type: ${type},
		minutes: ${minutes},
		seconds: ${seconds},
		actualTimeOfDay: ${actualTimeOfDay},
		seasonSelected: ${seasonSelected}
	`);
	*/
	return seasonSelected;
}

/*
function getNextVideoTrack(minutes, seconds) {
  "use strict";
	if (currentVideoTrack) {
		if ((video.played.length === 0 && seconds > 51) || (video.played.length === 1 && seconds > 46)) { //decodeURI(currentVideoTrack.match(/[^/]+(?=\/$|$)/g)[0]) === decodeURI(source.src.match(/[^/]+(?=\/$|$)/g)[0]) &&
			seconds += 10;
			console.log(`%ccurrentVideoTrack: ${currentVideoTrack},
				adding 10 seconds to seconds. Now: ${seconds}`,
				"color: green"
			);
		}
	} else if (!currentVideoTrack && !nextVideoHourTrack && seconds >=55) {
		seconds += 10;
		console.log(`%cJUST STARTING,
			adding 10 seconds to seconds. Now: ${seconds}`,
			"color: green"
		);
	}

	
	
	var actualTimeOfDay = ((minutes === 59 && seconds >= 56) ? nextTimeOfDay : timeOfDay);
	var season = getRandomVideoSeason("seconds", minutes, seconds);
  var tracks = videosBySeason[season].seconds[actualTimeOfDay];
  var max = tracks.length;
  var randomIndex = Math.floor(Math.random() * max);
	var selectedTrack = `${videoAssetsPath}Season ${season}/${tracks[randomIndex]}`;
	console.log(`
		function: getNextVideoTrack,
		minutes: ${minutes},
		seconds: ${seconds},
		actualTimeOfDay: ${actualTimeOfDay},
		selectedTrack: ${selectedTrack}
	`);


  return selectedTrack;
}
*/

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

function fetchStream(type, path, filename, callback) {
	var url = path + filename;

	if (type === "audio") {
		if (audioBufferCache[filename]) {
			return callback(audioBufferCache[filename]);
		}

		return Promise.all([fetch(url), filename]).then((vals)=>getAudioBufferArray(...vals)).then((vals)=>decodeAudioBuffer(...vals)).then((vals)=>callback(...vals));
	} else if (type === "video") {

		if (videoURLCache[filename]) {
			return videoURLCache[filename];
		}
		return Promise.all([fetch(url), filename]).then((vals)=>getVideoBlob(...vals)).then((vals)=>callback(...vals));
	} else {
		return undefined;
	}
}

function getVideoBlob(stream, filename) {
	return Promise.all([stream.blob(), filename]);
}

function getBlobURL(blob, filename){	
	var blobURL = window.URL.createObjectURL(blob);

	if (filename) {
		videoURLCache[filename] = blobURL;
	}

	return videoBlobURL = blobURL;
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

function setSourceTrack(blobURL){	
  //currentVideoTrack = videoSource;
  //source.src = videoSource;

	//source.src = currentVideoTrack;
	source.src = blobURL;
  video.load();
  //console.log("video loaded: " + currentVideoTrack);
	//return `${videoAssetsPath}Season ${season}/${trackName}`;

	return undefined;
}

function setVideoSource(blobURL){
	source.src = blobURL;
  video.load();
	return "loaded";
}

function setHourSourceTrack(videoHourSource){
	
	//hourVideoSecondsStart = videoHourSource.hourStartingSecond;
	//hourVideoSecondsEnd = videoHourSource.hourEndingSecond;
  //currentVideoHourTrack = videoHourSource;
  hourSource.src = videoHourSource;
  hourVideo.load();
	return "loaded";

	
	// should we just do an onload event? probably. That can set the vars.
}

function playVideo() {  
	console.log(`
		%cplaying: ${decodeURI(source.src.match(/[^/]+(?=\/$|$)/g)[0])},
		%cnextVideoTrack: ${nextVideoTrack},
		time: ${new Date()}
	`, "color: red", "color: white");
	/*
  if (nextVideoTrack) {
    currentVideoTrack = nextVideoTrack;
    nextVideoTrack = "";
  } else {
    currentVideoTrack = "";
  }
  */
  video.play();
	return "played";
  //console.log("video played");
}

function playHour() {
	/*
  if (nextVideoHourTrack) {
    currentVideoHourTrack = nextVideoHourTrack;
    nextVideoHourTrack = "";
  } else {
    currentVideoHourTrack = "";
  }
	*/
  hourVideo.play();
	return "played";
}

// we need a way of knowing how long the duration of the hour video
// is, so we'll have to use the 'onloaddata' event to tell us when
// we'll be able to actually check the duration property as it
// returns NaN until a video has been loaded.
/*
hourVideo.onloadeddata = function(){
  console.log("video is loaded. duration is: " + hourVideo.duration);
  if (hourVideo.duration < 18) {
    maxHourDuration = 15;
  } else {
    maxHourDuration = 30;
  }
}
*/


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



// Main Loop
function simpleTick() {

	// grab the current clock time
	var currentTime = getTimes();

	// testing something
	

	updateTime(currentTime.hours, currentTime.minutes, currentTime.seconds);

	// If we don't have a Minutes Video queued, get one.
	/*
	if (!nextVideoTrack) {
		nextVideoTrack = getNextVideoTrack(currentTime.minutes, currentTime.seconds);
	}
	*/


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
		
		// If there is a nextTrackObject, which will be the case if we've
		// 'ticked' the clock at least once, then nextTrackObject can be 
		// set to it. Otherwise this work is skipped.
		

		// NOTE : note sure this needs to happen, ever.
		/*
		if (nextTrackObject !== undefined) {
			lastTrackObject = nextTrackObject;		
		}
		*/
		
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
			// nextTrackObject = getHourMusicTrack(getHourVideoSeason(currentVideoHourTrack));
			//nextTrackObject = getHourMusicTrack(currentVideoHourTrack.season);
			lastTrackObject = getHourMusicTrack(currentVideoHourTrack.season);

		} else {
			// Otherwise we just request a normal On-The-Minute track.
			//nextTrackObject = getMinuteMusicTrack(); //getTrackIndex();
			lastTrackObject = getMinuteMusicTrack(currentTime.minutes); //getTrackIndex();
		}
		
		// Also now that there is a track of audio playing, the
		// trackStartTime should be updated so that it's possible to know
		// when the next audio track should start playing, whether that is
		// partway through the minute or when a new minute starts (0 seconds).
		
		//trackStartTime = nextTrackObject.startTime || 0;

		// Using the filename of the nextTrackObject's name property,
		// a request is made to get the audio buffer of the file proper.
		// The audio buffer is stored in the sourceBuffer once it has been obtained.

		// THIS IS NOT SYNCHRONOUS if the audio buffer is not already in the audioBufferCache!
		//getAudioBufferArray(customContext, audioAssetsPath, nextTrackObject.name, setSourceBuffer);		
		//sourceBuffer = fetchAudioBufferStream(audioAssetsPath, lastTrackObject.filename, setSourceBuffer);

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
			
			//videoPlayer.classList.remove("hide");

			// now that the player is really hidden, we
			// should be able to load the next vid track.
			// cleanup video stuff.
			// currentVideoTrack was set to the nextVideoTrack
			// by the playVideo() function on second 6
			// this will now set the source to whatever video that is
			// and load it
			//console.log("setSourceTrack on Hidden videoPlayer for: " + currentVideoTrack);
			//setSourceTrack(currentVideoTrack);

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
						console.log("fetchWorker has sent videoBlobURL for videoHour!" + data.videoBlobURL);
						videoHourBlobURL = data.videoBlobURL;
						currentVideoHourTrack.status = setHourSourceTrack(videoHourBlobURL);
						/*
						if (!started) {
							
						} else {
							currentVideoHourTrack.status = "ready";
						}
						*/
					} else {
						console.log(`mismatched message from fetchWorker.
						reply sent: requestID: ${requestData.ID}
						but track shows: videoTrack.ID: ${currentVideoHourTrack.ID}`);
					}
					
				}	
			} else if (requestData.type === "audio") {
				
				if (data.arrayBuffer) {
					console.log("fetchWorker has sent arrayBuffer for currentAudioTrack!");
					
				
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

						} else {
							console.log('it is already started!');
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
				console.log("Ticking! Tocking, even!");
				simpleTick();
			} else {
				if (event.data.fetchRequest) {
					console.log("Click Worker GO! " + event.data.fetchRequest);
				} else {
					console.log("The clickworker has sent a strange message!");
				}	
			}	
		}

		// fetchWorker.postMessage({"checkArray": true});
		// var someTrack = getNextVideoTrack(startTime.minutes, startTime.seconds);
		// fetchWorker.postMessage({"fetch": true, "type": "video", "path": someTrack.path, "filename": someTrack.filename});


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
		
		//currentVideoTrack = getNextVideoTrack(startTime.minutes, startTime.seconds);
		//setSourceTrack(currentVideoTrack);

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


	}, false);	
};

