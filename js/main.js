document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("hero-video");
  const overlay = document.getElementById("hero-video-overlay");
  const clickableTime = 5; // Set the time in seconds after which the video becomes clickable
  const videoStartDelay = 2; // Set the delay in seconds before the video starts playing
  let videoPlayedForClickableTime = false;

  setTimeout(function () {
    // Start playing the video automatically after the specified delay
    video.play();
  }, videoStartDelay * 1000); // Convert seconds to milliseconds

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

  overlay.addEventListener("click", function () {
    if (video.currentTime >= clickableTime) {
      const linkElement = document.getElementById("hero-video-link");
      window.open(linkElement.href, "_blank"); // Open link in a new tab
    }
  });

  // Disable right-click
  document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
  });
});