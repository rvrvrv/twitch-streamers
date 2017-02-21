/*jshint browser: true, esversion: 6*/
/*global $*/

// User array -- adjust as needed for different streaming accounts
var userArray = ['streamerhouse', 'freecodecamp', 'syndicate', 'esl_csgo', 'food'];

$(document).ready(retrieveInfo());

//Get user data from Twitch API
function retrieveInfo() {
	// Get info for every user in array
	userArray.forEach(function (e) {
		//URL for specific users
		var URL = `https://wind-bow.gomix.me/twitch-api/streams/${e}?callback=?`;
		//Retrieve from API and display data
		$.getJSON(URL, function (data) {
			//If channel does not exist
			if (data.error == 'Not Found') {
				$('.streamers').append(`<div class="row offline"><div class="col-xs-1 streamerPic"><img src="https://maxcdn.icons8.com/windows8/PNG/512/Messaging/offline-512.png" class="smallPicOff"></img></div><div class="col-xs-4 streamerID"><s>${e}</s></div><div class="col-xs-7 streamerInfo">User not found</div></div>`);
			}
			//If channel is online
			else if (data.stream !== null && data.stream !== undefined) {
				var info = data.stream.channel.status;
				var pic = data.stream.channel.logo;
				var link = data.stream.channel.url;
				$('.streamers').append(`<div class="row online"><div class="col-xs-1 streamerPic"><img src="${pic}" class="smallPic"></img></div><div class="col-xs-4 streamerID"><a href="${link}" target="_blank">${e}</a></div><div class="col-xs-7 streamerInfo">${info}</div></div>`);
			}
			//If channel is offline
			else {
				$('.streamers').append(`<div class="row offline"><div class="col-xs-1 streamerPic"><img src="https://maxcdn.icons8.com/windows8/PNG/512/Messaging/offline-512.png" class="smallPicOff"></img></div><div class="col-xs-4 streamerID">${e}</div><div class="col-xs-7 streamerInfo">Currently Offline</div></div>`);
			}
		});
		$('.streamers').fadeIn();
	});
}

//Disable clicked button and enable the other two
function disableMe(btn) {
	$(btn).prop('disabled', true);
	switch (btn.id) {
		case 'onlineBtn':
			$('#offlineBtn').prop('disabled', false);
			$('#allBtn').prop('disabled', false);
			break;
		case 'offlineBtn':
			$('#onlineBtn').prop('disabled', false);
			$('#allBtn').prop('disabled', false);
			break;
		case 'allBtn':
			$('#offlineBtn').prop('disabled', false);
			$('#onlineBtn').prop('disabled', false);
			break;
	}
}

//Display online users only
$('#onlineBtn').click(function () {
	disableMe(this);
	$('.offline').fadeOut(100, () => $('.online').fadeIn(100));
});

//Display offline users only
$('#offlineBtn').click(function () {
	disableMe(this);
	$('.online').fadeOut(100, () => $('.offline').fadeIn(100));
});

//Display all users
$('#allBtn').click(function () {
	disableMe(this);
	$('.offline').fadeIn();
	$('.online').fadeIn();
});

//Refresh entire results
$('#refreshBtn').click(function () {
	$('.streamers').empty().hide();
	retrieveInfo();
	$('#allBtn').click();
});
