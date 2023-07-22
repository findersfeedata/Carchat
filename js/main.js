document.addEventListener("DOMContentLoaded", function () {
  const heroImage = document.getElementById("hero-image");
  const heroVideo = document.getElementById("hero-video");
  const garageDoorAudio = document.getElementById("garage-door-audio");
  const videoAudio = document.getElementById("video-audio");

  const animationDelay = 3000; // 3 seconds
  const videoPlayDelay = 5000; // 5 seconds
  const linkURL = "https://t.me/JoinCarChatBot";
  const mobileImageSrc = "images/Join Car Chat 06 - Garage Door Only - Mobile.webp"; // Update this with the mobile image URL

  let hasImageAnimated = false;
  let automaticAnimationTimer;
  let canOpenLink = false;

  // Function to animate the image upwards and reveal the video
  function animateImage() {
    if (!hasImageAnimated) {
      heroImage.style.transform = "translateY(-100%)";
      heroImage.style.transition = `transform ${animationDelay / 1000}s ease`;
      heroImage.style.pointerEvents = "none"; // Disable pointer events on the image immediately
      garageDoorAudio.play(); // Play the garage door open sound
      setTimeout(() => {
        heroVideo.play();
        heroVideo.addEventListener("timeupdate", handleVideoTimeUpdate);
        videoAudio.play(); // Play the video audio sound
      }, animationDelay);
      hasImageAnimated = true;
    }
  }

  // Add a click event listener to the image
  heroImage.addEventListener("click", () => {
    clearTimeout(automaticAnimationTimer); // Clear the automatic animation timer if the user clicks
    animateImage();
  });

  // Automatically trigger the image animation after the specified delay
  automaticAnimationTimer = setTimeout(animateImage, videoPlayDelay);

  // Function to handle the video time update
  function handleVideoTimeUpdate() {
    if (heroVideo.currentTime >= videoPlayDelay / 1000 && !canOpenLink) {
      canOpenLink = true; // Allow opening the link after the specified delay
      document.body.classList.add("pointer-cursor"); // Add the pointer-cursor class to the body
    }
  }

  // Update the transition duration on the hero image to match the animation delay
  heroImage.style.transition = `transform ${animationDelay / 1000}s ease`;

  // Check for touch devices and update the image source
  if ('ontouchstart' in window || navigator.maxTouchPoints) {
    heroImage.src = mobileImageSrc;

    // Add a touchstart event listener to the document to detect the first user interaction on mobile
    document.addEventListener("touchstart", () => {
      if (!hasImageAnimated) {
        // If the image hasn't animated yet, trigger the image animation and audio playback
        animateImage();
      }
    }, { once: true }); // The { once: true } option ensures that the event listener is removed after the first touchstart.
  }

  // Open the link when the user clicks anywhere on the site after the specified delay
  document.addEventListener("click", () => {
    if (canOpenLink) {
      window.open(linkURL, "_blank");
    }
  });
});
