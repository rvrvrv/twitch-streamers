/*jshint browser: true, esversion: 6*/
/*global $, console*/

// User array -- adjust as needed for different streaming accounts
let userArray = [
  'streamerhouse',
  'freecodecamp',
  'syndicate',
  'esl_csgo',
  'food'
];

$(document).ready(retrieveInfo());

//Get user data from Twitch API
function retrieveInfo() {
	// Get info for each user in array
	userArray.forEach(user => {
		let URL = `https://wind-bow.gomix.me/twitch-api/streams/${user}?callback=?`;
		//Retrieve from API and display data
		$.getJSON(URL, data => {
			//If channel is online
			if (data.stream) {
				let channel = data.stream.channel;
				$('.streamers').append(
					`<div class='row online'>
						<div class='col-sm-5'>
								<img src='${channel.logo}' class='small-pic' alt='Channel logo'>
								<span class='streamer-id'><a href='${channel.url}' target='_blank'>${user}</a></span>
						</div>
						<div class='col-sm-7'>
							<p class='streamer-info'>${channel.status}</p>
						</div>
					</div>`
				);
			} else if (data.error === 'Not Found') {
				//If channel does not exist
				$('.streamers').append(
					`<div class='row offline'>
						<div class='col-sm-5'>
							<img src='https://rvrvrv.github.io/img/offline.png' class='small-pic-off' alt='Offline logo'>
							<span class='streamer-id'><s>${user}</s></span>
						</div>
						<div class='col-sm-7'>
							<p class='streamer-info'>User not found</p>
						</div>
					</div>`
				);
			} else {
				//If channel is offline
				$('.streamers').append(
					`<div class='row offline'>
						<div class='col-sm-5'>
							<img src='https://rvrvrv.github.io/img/offline.png' class='small-pic-off' alt='Offline logo'>
							<span class='streamer-id'>${user}</span>
						</div>
						<div class='col-sm-7'>
							<p class='streamer-info'>Currently offline</p>
						</div>
					</div>`
				);
			}
		});
		$('.streamers').fadeIn();
	});
}

//Disable clicked button and enable other the two
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
$('#offlineBtn').click(function() {
	disableMe(this);
	$('.online').fadeOut(100, () => $('.offline').fadeIn(100));
});

//Display all users
$('#allBtn').click(function() {
	disableMe(this);
	$('.offline').fadeIn();
	$('.online').fadeIn();
});

//Refresh entire list
$('#refreshBtn').click(function() {
	$('.streamers').empty().hide();
	retrieveInfo();
	$('#allBtn').click();
});
