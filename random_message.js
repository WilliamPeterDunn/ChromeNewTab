const messages = ["An inspirational message",
				  "More inspiration",
				  "Yet more inspiration",
				  "And now for something completely different"];
var message = document.getElementById('message');
message.innerHTML = messages[Math.floor(Math.random() * messages.length)];