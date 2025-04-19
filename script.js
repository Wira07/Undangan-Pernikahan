// Wedding Invitation JavaScript

document.addEventListener("DOMContentLoaded", function () {
  // Initialize components
  initNavbar();
  initCountdown();
  initGallery();
  initRSVPForm();
  initBackToTop();
  initAnimation();
  initMusicPlayer();
});

// Enter button for intro page
const introPage = document.getElementById("introPage");
const mainWebsite = document.getElementById("mainWebsite");
const enterSiteBtn = document.getElementById("enterSite");

// Array of elegant wedding background images
const backgroundImages = ["https://i.pinimg.com/736x/ac/4e/e6/ac4ee6b05b59ab70e6e9a2f6f7d380b0.jpg"];

// Change background image every 5 seconds
let currentBgIndex = 0;
function changeBackground() {
  const newBackground = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url("${backgroundImages[currentBgIndex]}")`;
  introPage.style.backgroundImage = newBackground;
  currentBgIndex = (currentBgIndex + 1) % backgroundImages.length;
}

// Initialize the background rotation
setInterval(changeBackground, 5000);

// Initial fade-in effect when the page loads
document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    document.querySelector(".intro-content").style.opacity = "1";
  }, 300);
});

enterSiteBtn.addEventListener("click", function () {
  // Add a click effect
  enterSiteBtn.classList.add("clicked");

  // Hide intro page with animation
  introPage.classList.add("hidden");

  // Show main website with animation
  setTimeout(function () {
    mainWebsite.classList.add("visible");
    // Manually trigger scroll event to set navbar properly
    window.dispatchEvent(new Event("scroll"));
  }, 1200);
});
// Navbar scroll effect
function initNavbar() {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Smooth scrolling for nav links
  document.querySelectorAll(".navbar-nav .nav-link").forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        window.scrollTo({
          top: targetSection.offsetTop - 70,
          behavior: "smooth",
        });

        // Close mobile menu if open
        const navbarToggler = document.querySelector(".navbar-toggler");
        const navbarCollapse = document.querySelector(".navbar-collapse");

        if (navbarCollapse.classList.contains("show")) {
          navbarToggler.click();
        }
      }
    });
  });
}

// Countdown timer
function initCountdown() {
  const weddingDate = new Date("August 15, 2025 14:00:00").getTime();

  const countdown = setInterval(function () {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;

    if (distance < 0) {
      clearInterval(countdown);
      document.getElementById("countdown").innerHTML = "<h3>Our Wedding Day Has Arrived!</h3>";
    }
  }, 1000);
}

// Gallery functionality
function initGallery() {
  // Create modal for gallery
  const modal = document.createElement("div");
  modal.className = "gallery-modal";
  modal.innerHTML = `
        <span class="close-modal">&times;</span>
        <img src="" class="modal-content" id="modal-image">
    `;
  document.body.appendChild(modal);

  // Add click event to gallery items
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      const imgSrc = this.querySelector("img").getAttribute("src");
      const modalImg = document.getElementById("modal-image");

      modalImg.src = imgSrc;
      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });

  // Close modal on click
  const closeModal = document.querySelector(".close-modal");

  closeModal.addEventListener("click", function () {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  });

  // Close modal when clicking outside of image
  modal.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
}

// RSVP form handling
function initRSVPForm() {
  const rsvpForm = document.getElementById("rsvpForm");

  if (rsvpForm) {
    rsvpForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const formData = new FormData(this);
      const formValues = {};

      for (const [key, value] of formData.entries()) {
        formValues[key] = value;
      }

      // In a real scenario, you would send this data to a server
      // For this demo, we'll just simulate a success response

      // Show success message
      let successMessage = document.querySelector(".success-message");

      if (!successMessage) {
        successMessage = document.createElement("div");
        successMessage.className = "success-message";
        successMessage.innerHTML = "<p>Thank you for your RSVP! We are looking forward to celebrating with you.</p>";
        rsvpForm.after(successMessage);
      }

      successMessage.classList.add("active");

      // Reset form
      rsvpForm.reset();

      // Hide success message after 5 seconds
      setTimeout(function () {
        successMessage.classList.remove("active");
      }, 5000);
    });
  }
}

// Back to top button
function initBackToTop() {
  const backToTopButton = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("active");
    } else {
      backToTopButton.classList.remove("active");
    }
  });

  backToTopButton.addEventListener("click", function (e) {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Animation effects
function initAnimation() {
  const elements = document.querySelectorAll(".section-title, .couple-card, .event-card, .gallery-item, .rsvp-form");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

// Background music player
function initMusicPlayer() {
  // Create music toggle button
  const musicToggle = document.createElement("div");
  musicToggle.className = "music-toggle";
  musicToggle.innerHTML = '<i class="fas fa-music"></i>';
  document.body.appendChild(musicToggle);

  // Create audio element
  const audio = document.createElement("audio");
  audio.loop = true;
  // In a real implementation, you would specify the actual music file
  // audio.src = 'path/to/your/wedding-music.mp3';
  document.body.appendChild(audio);

  // Toggle music play/pause
  let isPlaying = false;

  musicToggle.addEventListener("click", function () {
    if (isPlaying) {
      audio.pause();
      musicToggle.classList.add("paused");
    } else {
      audio.play().catch((e) => {
        // Auto-play may be blocked by browser
        console.log("Audio play was prevented by browser.");
      });
      musicToggle.classList.remove("paused");
    }

    isPlaying = !isPlaying;
  });
}

// Add location map functionality (if needed, you can use Google Maps API)
function initLocationMap() {
  // This would typically include Google Maps API integration
  // For this demo, we'll just add click handlers to the location buttons

  const locationButtons = document.querySelectorAll(".location-btn");

  locationButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // In a real scenario, you would open a map or provide directions
      // For this demo, we'll just add an alert
      alert("Map functionality would open here. In a real implementation, this would show the venue location on a map.");
    });
  });
}

// Handle window resize events
window.addEventListener("resize", function () {
  // Adjust any layout elements that may need resizing
  // This is useful for responsive designs
});

// Page loading animation
window.addEventListener("load", function () {
  // Hide page loader if you have one
  // const pageLoader = document.querySelector('.page-loader');
  // if (pageLoader) {
  //     pageLoader.style.display = 'none';
  // }

  // Animate hero section elements
  const heroElements = document.querySelectorAll(".save-date, .couple-name, .wedding-date");

  heroElements.forEach((element, index) => {
    setTimeout(() => {
      element.classList.add("fade-in");
    }, index * 300);
  });
});
