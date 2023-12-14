        // Get the modal, overlay, and buttons
        var modal = document.getElementById('myModal');
        var overlay = document.getElementById('overlay');
        var openButton = document.getElementById('openButton');
        var cancelButton = document.getElementById('cancel');
        
        // Open the modal when the button is clicked
        openButton.onclick = function() {
            modal.style.display = 'block';
            overlay.style.display = 'block';
        }
        
        // Close the modal and overlay when the cancel button is clicked
        cancelButton.onclick = function() {
            modal.style.display = 'none';
            overlay.style.display = 'none';
        }
		
		