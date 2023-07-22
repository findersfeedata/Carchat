document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("hero-video");
  const overlay = document.getElementById("hero-video-overlay");
  const clickableTime = 5; // Set the time in seconds after which the video becomes clickable
  const videoStartDelay = 2; // Set the delay in seconds before the video starts playing
  let videoPlayedForClickableTime = false;
  let tapTriggered = false;

  // Function to start playing the video
  function playVideo() {
    video.play();
  }

  // Start playing the video automatically after the specified delay
  setTimeout(function () {
    // Check if the video has been triggered to play by the user tap
    if (!tapTriggered) {
      playVideo();
    }
  }, videoStartDelay * 1000); // Convert seconds to milliseconds

  // Event listener to detect user tap
  document.addEventListener("click", function () {
    // Check if the video has not been played yet and the tap occurs during the delay
    if (!videoPlayedForClickableTime && !tapTriggered) {
      tapTriggered = true;
      playVideo();
    }
  });

  video.onended = function () {
    // Show the video overlay once the video has ended
    overlay.style.pointerEvents = "auto";
    overlay.classList.add("clickable"); // Add clickable class to change cursor style
  };

  video.ontimeupdate = function () {
    // Check if the video has been playing for the specified time
    if (video.currentTime >= clickableTime && !videoPlayedForClickableTime) {
      videoPlayedForClickableTime = true;
      // Allow the video overlay to be clickable after the specified time
      overlay.style.pointerEvents = "auto";
      overlay.classList.add("clickable"); // Add clickable class to change cursor style
    }
  };

  // Add click event to the overlay to redirect to the link
  overlay.addEventListener("click", function () {
    if (video.currentTime >= clickableTime) {
      const linkElement = document.getElementById("hero-video-link");
      window.open(linkElement.href, "_blank"); // Open link in a new tab
    }
  });

  // Disable right-click on the entire document
  document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
  });
});