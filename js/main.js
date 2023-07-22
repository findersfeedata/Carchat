document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("hero-video");
  const overlay = document.getElementById("hero-video-overlay");
  const clickableTime = 7; // Set the time in seconds after which the video becomes clickable
  const videoStartDelay = 2; // Set the delay in seconds before the video starts playing
  let videoPlayedForClickableTime = false;
  let tapTriggered = false;

  // Mute the video by default
  video.muted = true;

  // Function to start playing the video
  function playVideo() {
    video.play();
  }

  setTimeout(function () {
    // Check if the video has been triggered to play by the user tap
    if (!tapTriggered) {
      playVideo();
    }
  }, videoStartDelay * 1000); // Convert seconds to milliseconds

  // Unmute the video if the user clicks during the delay or within the first second of the video starting to play
  document.addEventListener("click", function () {
    if (!videoPlayedForClickableTime && !tapTriggered) {
      tapTriggered = true;
      video.muted = false;
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

  overlay.addEventListener("click", function () {
    if (video.currentTime >= clickableTime) {
      const linkElement = document.getElementById("hero-video-link");
      window.open(linkElement.href, "_blank"); // Open link in a new tab
    }
  });
});
