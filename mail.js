document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('[data-form]');
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        
        // Collect form data
        const formData = new FormData(form);
        
        // Send form data to the PHP script using Fetch API
        fetch('./send_email.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (response.ok) {
                // Handle success (e.g., show a success message)
                console.log('Form submitted successfully');
                // You can redirect the user or show a success message here
            } else {
                // Handle error
                console.error('Form submission failed');
                // Show an error message or handle the error as needed
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Handle any network errors
        });
    });
});
