//setPreferences('name','wd');
var username;

/*
function clearPreferences() {
	localStorage.removeItem('sitePreferences');
}
*/

function getPreferences(key){
	var storedPreferences = JSON.parse(localStorage.getItem('sitePreferences')) || {};
	return storedPreferences[key];
}

function setPreferences(key, value){
	var storedPreferences = JSON.parse(localStorage.getItem('sitePreferences')) || {};
	var newPreferences = {};
	newPreferences[key] = value;

	if (newPreferences) {
		Object.assign(storedPreferences, newPreferences);
		localStorage.setItem('sitePreferences', JSON.stringify(storedPreferences));
	}
}

function updateTime() {
	username = getPreferences('name');
	username = username ? username : 'anonymous user';

	const today = new Date();
	if (today.getMinutes() < 10) {
		var time = today.getHours() + ":0" + today.getMinutes();
	}
	else if (today.getMinutes() >= 10) {
		var time = today.getHours() + ":" + today.getMinutes();
	}

	const t = document.getElementById('currentTime');
	t.innerHTML = time;
	const displayUsername = username;

	const greet1 = "Good morning, " + displayUsername;
	const greet2 = "Good afternoon, " + displayUsername;
	const greet3 = "Good evening, " + displayUsername;
	const greet4 = "Good night, " + displayUsername;

	var greeting = document.getElementById('greetingHeading');

	if (today.getHours() >= 0 && today.getHours() < 12) {
		greeting.innerHTML = greet1;
	} else if (today.getHours() >= 12 && today.getHours() < 16) {
		greeting.innerHTML = greet2;
	} else if (today.getHours() >= 16 && today.getHours() <= 21) {
		greeting.innerHTML = greet3;
	} else if (today.getHours() >= 21 && today.getHours() <= 24) {
		greeting.innerHTML = greet4;	
	}
}

setInterval(updateTime, 2000);

document.addEventListener('DOMContentLoaded', function() {

	var updateNameButton = document.getElementById('greetingHeading');
			
	// Open the modal when the button is clicked
	updateNameButton.onclick = function() {
		const newName = prompt('What is your name?');
		if (newName) { setPreferences('name',newName)};
	}
});