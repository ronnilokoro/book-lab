window.onload = function () {
    // Check if the URL contains a hash
    if (window.location.hash) {
        const hashValue = window.location.hash.substring(1); // Remove the '#' character
        const element = document.getElementById(hashValue);
        if (element) {
            element.click();
        }
    } else {
        // Your existing code for handling 'tab' parameter
        const urlParams = new URLSearchParams(window.location.search);
        const tab = urlParams.get('tab');
        if (tab) {
            const tabButton = document.getElementById(tab);
            if (tabButton) {
                tabButton.click();
            }
        }
    }
}
