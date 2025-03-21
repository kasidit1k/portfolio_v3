// DOM Elements
const menuIcon = document.querySelector("#menu-icon");
const navLinks = document.querySelector(".nav-links");
const header = document.querySelector(".header");
const modeToggle = document.querySelector(".mode-toggle");
const visitBtn = document.querySelector(".visit-btn");
const downloadBtn = document.querySelector(".secondary-btn");
const scrollIndicator = document.querySelector(".scroll-indicator");
const sections = document.querySelectorAll("section");
const navLinksItems = document.querySelectorAll(".nav-links li a");
const contactBtn = document.querySelector(".input-box .btn");

// Toggle mobile menu
menuIcon.onclick = () => {
  navLinks.classList.toggle("active");
};

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    !menuIcon.contains(e.target) &&
    !navLinks.contains(e.target) &&
    navLinks.classList.contains("active")
  ) {
    navLinks.classList.remove("active");
  }
});

// Header scroll effect
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Smooth scrolling for navigation links
navLinksItems.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    // Close mobile menu if open
    if (navLinks.classList.contains("active")) {
      navLinks.classList.remove("active");
    }

    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    window.scrollTo({
      top: targetSection.offsetTop - 100,
      behavior: "smooth",
    });
  });
});

// Scroll indicator smooth scroll
scrollIndicator.addEventListener("click", (e) => {
  e.preventDefault();
  const targetId = scrollIndicator.querySelector("a").getAttribute("href");
  const targetSection = document.querySelector(targetId);

  window.scrollTo({
    top: targetSection.offsetTop - 100,
    behavior: "smooth",
  });
});

// Active nav link based on scroll position
function highlightNavLink() {
  let scrollPosition = window.scrollY;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 150;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinksItems.forEach((link) => {
        link.classList.remove("active-link");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active-link");
        }
      });
    }
  });
}

window.addEventListener("scroll", highlightNavLink);

// Dark/Light mode toggle
modeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    modeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    localStorage.setItem("theme", "light");
  } else {
    modeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    localStorage.setItem("theme", "dark");
  }
});

// Check for saved theme preference
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    modeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
  }

  // Animate elements on page load
  setTimeout(() => {
    document.querySelector(".hero-content").classList.add("animate");
  }, 300);
});

// Visit Github button
visitBtn.addEventListener("click", () => {
  // Replace with your actual GitHub URL
  window.open("https://github.com/kasidit", "_blank");
});

// Download CV button
downloadBtn.addEventListener("click", (e) => {
  e.preventDefault();
  // Replace with actual path to your CV file
  const link = document.createElement("a");
  link.href = "files/kasidit-cv.pdf";
  link.download = "Kasidit_Nunkong_CV.pdf";
  link.click();
});

// Contact form submission
contactBtn.addEventListener("click", () => {
  const emailInput = document.querySelector(".input-box input");
  const email = emailInput.value.trim();

  if (validateEmail(email)) {
    // Here you would typically send this to a server
    alert("Thank you for contacting me! I will get back to you soon.");
    emailInput.value = "";
  } else {
    alert("Please enter a valid email address");
  }
});

// Email validation helper function
function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// Add animations when elements come into view
const observerOptions = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all these elements for scroll animations
document
  .querySelectorAll(
    ".project-card, .grid-card, .about-container, .hero-content"
  )
  .forEach((el) => {
    observer.observe(el);
  });
