document.getElementById('postForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const hashtags = document.getElementById('hashtags').value;
    const scheduleTime = document.getElementById('scheduleTime').value;
    const media = document.getElementById('media').files;

    // Prepare form data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('hashtags', hashtags);
    formData.append('scheduleTime', scheduleTime);

    // Append media files to the form data
    for (let i = 0; i < media.length; i++) {
        formData.append('media', media[i]);
    }

    // Upload to all linked platforms
    uploadToPlatforms(formData);
});

// Function to handle uploads
function uploadToPlatforms(formData) {
    // API endpoint URLs (replace these with your server endpoints)
    const apiEndpoints = {
        youtube: '/api/upload/youtube',
        facebook: '/api/upload/facebook',
        instagram: '/api/upload/instagram',
        reddit: '/api/upload/reddit',
        threads: '/api/upload/threads'
    };

    // Upload to each platform
    for (const platform in apiEndpoints) {
        fetch(apiEndpoints[platform], {
            method: 'POST',
            body: formData,
            credentials: 'include' // For sending cookies/session data
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(`${platform} upload successful:`, data);
                alert(`Uploaded successfully to ${platform}!`);
            } else {
                console.error(`${platform} upload failed:`, data.message);
                alert(`Failed to upload to ${platform}: ${data.message}`);
            }
        })
        .catch(error => {
            console.error(`Error uploading to ${platform}:`, error);
            alert(`Error uploading to ${platform}: ${error.message}`);
        });
    }
}

// Function to link social media accounts
function linkAccount(platform) {
    const authUrls = {
        youtube: '/api/auth/youtube',
        facebook: '/api/auth/facebook',
        instagram: '/api/auth/instagram',
        reddit: '/api/auth/reddit',
        threads: '/api/auth/threads'
    };

    if (authUrls[platform]) {
        window.location.href = authUrls[platform]; // Redirect to authentication URL
    } else {
        alert('Invalid platform specified');
    }
}

// Add event listeners for linking accounts
document.getElementById('linkYoutube').addEventListener('click', () => linkAccount('youtube'));
document.getElementById('linkFacebook').addEventListener('click', () => linkAccount('facebook'));
document.getElementById('linkInstagram').addEventListener('click', () => linkAccount('instagram'));
document.getElementById('linkReddit').addEventListener('click', () => linkAccount('reddit'));
document.getElementById('linkThreads').addEventListener('click', () => linkAccount('threads'));
