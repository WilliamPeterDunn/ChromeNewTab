const messages = ["What would you do if you weren't afraid?",
				  "Learn as if you will live forever, live like you will die tomorrow.",
				  "We cannot solve problems with the kind of thinking we employed when we came up with them.",
				  "Success is not final; failure is not fatal: It is the courage to continue that counts."];
var message = document.getElementById('message');
message.innerHTML = messages[Math.floor(Math.random() * messages.length)];