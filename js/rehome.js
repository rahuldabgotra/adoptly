document.addEventListener('DOMContentLoaded', function () {
    const petTypeSelect = document.getElementById('pet-type');
    const otherPetTypeDiv = document.getElementById('other-pet-type');
    const otherPetTypeInput = document.getElementById('other-pet-type-input');
    const messageBox = document.getElementById('submission-message');

    // Check if user is logged in via localStorage (using 'loggedInUser')
    const username = localStorage.getItem('loggedInUser');

    if (!username) {
        alert('You must be logged in to list a pet for adoption.');
        window.location.href = './index.html';
        return;
    }

    // Get user data from localStorage (placeholder email used)
    const currentUser = {
        name: username,
        email: `${username}@example.com`
    };

    // Show/hide "Other" type input field
    petTypeSelect.addEventListener('change', function () {
        if (this.value === 'other') {
            otherPetTypeDiv.style.display = 'block';
            otherPetTypeInput.required = true;
        } else {
            otherPetTypeDiv.style.display = 'none';
            otherPetTypeInput.required = false;
        }
    });

    // Handle form submission
    const form = document.getElementById('pet-submission-form');
    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        const formData = new FormData(form);

        // Append uploader info
        formData.append('uploaderName', currentUser.name);
        formData.append('uploaderEmail', currentUser.email);

        try {
            const response = await fetch('http://localhost:3000/rehome', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                messageBox.textContent = result.message || 'Pet listed successfully.';
                messageBox.style.color = 'green';
                form.reset();
                otherPetTypeDiv.style.display = 'none'; // Reset "Other" field visibility
            } else {
                messageBox.textContent = 'Error: ' + (result.message || 'Unknown error');
                messageBox.style.color = 'red';
            }
        } catch (err) {
            console.error('Error:', err);
            messageBox.textContent = 'Failed to submit pet data.';
            messageBox.style.color = 'red';
        }
    });
});
