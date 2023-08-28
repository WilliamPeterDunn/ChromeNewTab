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

function handleButtonClick() {
	
	const text = document.getElementById('newquotetext').value;
	const attrib = document.getElementById('newquoteattribution').value;
	const addQuoteURL = `https://webapp.williamdunn.za.net:8081/add-quote?quoteText=${text}&quoteAttribution=${attrib}`;
	
	fetch(addQuoteURL)
	  .then(response => response.json())
	  .then(data => {  
		
	  })
	  .catch(error => {    
		console.error('Error:', error);
	  });
    
    console.log(addQuoteURL);	
    
}

addButton.addEventListener('click', handleButtonClick);
