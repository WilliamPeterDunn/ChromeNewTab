/*
const messages = ["What would you do if you weren't afraid?",
				  "Learn as if you will live forever, live like you will die tomorrow.",
				  "We cannot solve problems with the kind of thinking we employed when we came up with them.",
				  "Success is not final; failure is not fatal: It is the courage to continue that counts.",
				  "I feel fairly certain that my hatred harms me more than the people whom I hate. -Max Frisch, architect, playwright, and novelist (15 May 1911-1991)"];

message.innerHTML = messages[Math.floor(Math.random() * messages.length)];
*/

const message = document.getElementById('message');
const attribution = document.getElementById('attribution');

fetch('https://webapp.williamdunn.za.net:8081/random-quote')
  .then(response => response.json())
  .then(data => {
    // Process the data returned from the API
    console.log(data);
	message.innerHTML = data[0].QuoteText;
	attribution.innerHTML = data[0].QuoteAttribution;
  })
  .catch(error => {
    // Handle any errors that occurred during the API call
    console.error('Error:', error);
  });