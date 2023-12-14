const message = document.getElementById('message');
const attribution = document.getElementById('attribution');

fetch('https://webapp.williamdunn.za.net:8081/random-quote')
  .then(response => response.json())
  .then(data => {  
	message.innerHTML = data[0].QuoteText;
	attribution.innerHTML = data[0].QuoteAttribution;
  })
  .catch(error => {    
    console.error('Error:', error);
  });


// Send new quote to server
const addButton = document.getElementById('btn-add-quote');
const responseDiv = document.getElementById('response');

function handleButtonClick() {
	
	const text = document.getElementById('newquotetext').value;
	const attrib = document.getElementById('newquoteattribution').value;
	const addQuoteURL = `https://webapp.williamdunn.za.net:8081/add-quote?quoteText=${text}&quoteAttribution=${attrib}`;
	
	if (document.getElementById('newquotetext').value == '' && document.getElementById('newquoteattribution').value == ''){
		console.log('Abort - no content');	
		responseDiv.textContent = 'Both fields must be supplied';
		return;
	}
	
	fetch(addQuoteURL)
	  .then(response => response.json())
	  .then(data => {  		
		if (data["message"]){
			responseDiv.textContent = data["message"];
			document.getElementById('newquotetext').value = '';
			document.getElementById('newquoteattribution').value = '';
		}
		else if (data["error"]){
			responseDiv.textContent = data["error"];		
	  } else {
		  responseDiv.textContent = JSON.stringify(data);
	  } 
	  })
	  
	  .catch(error => {    
		console.log('Problemo');
		console.error('error: ',error);
		responseDiv.textContent = "Error";
	  });
    
}

addButton.addEventListener('click', handleButtonClick);