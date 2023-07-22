document.addEventListener("DOMContentLoaded", function () {
  const heroImage = document.getElementById("hero-image");
  const heroVideo = document.getElementById("hero-video");

  const animationDelay = 3000; // Garage Door Animation Time
  const videoPlayDelay = 6000; // Video Link Time
  const linkURL = "https://t.me/JoinCarChatBot";
  const mobileImageSrc = "images/Join Car Chat 06 - Garage Door Only - Mobile.webp";

  let hasImageAnimated = false;
  let automaticAnimationTimer;
  let canOpenLink = false;

  // Function to animate the image upwards and reveal the video
  function animateImage() {
    if (!hasImageAnimated) {
      heroImage.style.transform = "translateY(-100%)";
      heroImage.style.transition = `transform ${animationDelay / 1000}s ease`; //Update the transition duration on the hero image to match the animation delay
      heroImage.style.pointerEvents = "none"; // Disable pointer events on the image immediately
      setTimeout(() => {
        heroVideo.play();
        heroVideo.addEventListener("timeupdate", handleVideoTimeUpdate);
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
  }

  // Open the link when the user clicks anywhere on the site after the specified delay
  document.addEventListener("click", () => {
    if (canOpenLink) {
      window.open(linkURL, "_blank");
    }
  });
});
