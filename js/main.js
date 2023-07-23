document.addEventListener("DOMContentLoaded", function () {
  const heroImage = document.getElementById("hero-image");
  const heroVideo = document.getElementById("hero-video");
  const garageDoorAudio = document.getElementById("garage-door-audio");
  const videoAudio = document.getElementById("video-audio");

  const doorTransitionTime = 3000; // Time for the garage door transition
  const videoClickableDelay = 5000; // Time before the video becomes a clickable link
  const autoPlayDelay = 5000; // Time before the garage door starts animating by itself if the user doesn't click anywhere
  const videoStartDelay = 1500; // Time before the video starts playing after the garage door transition starts
  const linkURL = "https://t.me/JoinCarChatBot";
  const mobileImageSrc =
    "images/Join Car Chat 06 - Garage Door Only - Mobile.webp";

  let hasImageAnimated = false;
  let automaticAnimationTimer;
  let canOpenLink = false;

  // Function to animate the image upwards and reveal the video
  function animateImage() {
    if (!hasImageAnimated) {
      heroImage.style.transform = "translateY(-100%)";
      heroImage.style.transition = `transform ${
        doorTransitionTime / 1000
      }s ease`;
      heroImage.style.pointerEvents = "none"; // Disable pointer events on the image immediately
      garageDoorAudio.play(); // Play the garage door open sound
      setTimeout(() => {
        heroVideo.play();
        heroVideo.addEventListener("timeupdate", handleVideoTimeUpdate);
        videoAudio.play(); // Play the video audio sound
      }, videoStartDelay);
      hasImageAnimated = true;
    }
  }

  // Add a click event listener to the image
  heroImage.addEventListener("click", () => {
    clearTimeout(automaticAnimationTimer); // Clear the automatic animation timer if the user clicks
    animateImage();
  });

  // Automatically trigger the image animation after the specified delay
  automaticAnimationTimer = setTimeout(animateImage, autoPlayDelay);

  // Function to handle the video time update
  function handleVideoTimeUpdate() {
    if (heroVideo.currentTime >= videoClickableDelay / 1000 && !canOpenLink) {
      canOpenLink = true; // Allow opening the link after the specified delay
      document.body.classList.add("pointer-cursor"); // Add the pointer-cursor class to the body
    }
  }

  // Update the transition duration on the hero image to match the animation delay
  heroImage.style.transition = `transform ${doorTransitionTime / 1000}s ease`;

  // Check for touch devices and update the image source to say Tap to Enter instead of Click to Enter
  if ("ontouchstart" in window || navigator.maxTouchPoints) {
    heroImage.src = mobileImageSrc;
  }

  // Open the link when the user clicks anywhere on the site after the specified delay
  document.addEventListener("click", () => {
    if (canOpenLink) {
      window.open(linkURL, "_blank");
    }
  });
});