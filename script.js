
/* =========================================
   HERO SLIDER AND ANNOUNCEMENT TICKER
========================================= */

const slides = [
    {
        title: "Learn. Discover. Achieve.",
        description: "A university committed to professional education, research and innovation.",
        image: "https://images.shiksha.com/mediadata/images/articles/1604512800phpnwiv16.jpeg",
        announcement: "Admissions 2026-27: Visit the official university portal for updates and counselling information."
    },
    {
        title: "Your Future Starts Here",
        description: "Explore academic programmes, student resources and opportunities to grow.",
        image: "https://www.thestatesman.com/wp-content/uploads/2026/04/HFc3ATNb0AAN0mT-1.webp",
        announcement: "Students: Check the university website regularly for examination notices and updates."
    },
    {
        title: "Knowledge Into Action",
        description: "Encouraging learning, research, collaboration and service to society.",
        image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1500&q=85",
        announcement: "University updates: Read the latest notices and circulars before taking action."
    }
];

let currentSlide = 0;

const hero = document.getElementById("hero-image");
const title = document.getElementById("slide-title");
const description = document.getElementById("slide-description");
const announcement = document.getElementById("announcement-text");
const dots = document.getElementById("slider-dots");

// Create slider dots
function renderDots() {
    if (!dots) return;

    dots.innerHTML = "";

    slides.forEach((slide, index) => {
        const dot = document.createElement("button");

        dot.type = "button";
        dot.className = index === currentSlide ? "active" : "";
        dot.setAttribute("aria-label", `Show slide ${index + 1}`);

        dot.addEventListener("click", () => showSlide(index));

        dots.appendChild(dot);
    });
}

// Display the selected slide
function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;

    const slide = slides[currentSlide];

    if (hero) {
        hero.style.backgroundImage =
            `linear-gradient(115deg, rgba(16,46,80,.92), rgba(27,89,134,.68)), url("${slide.image}")`;
    }

    if (title) {
        title.textContent = slide.title;
    }

    if (description) {
        description.textContent = slide.description;
    }

    if (announcement) {
        announcement.textContent = slide.announcement;
    }

    renderDots();
}

// Previous slide button
const prevSlide = document.getElementById("prev-slide");

if (prevSlide) {
    prevSlide.addEventListener("click", () => {
        showSlide(currentSlide - 1);
    });
}

// Next slide button
const nextSlide = document.getElementById("next-slide");

if (nextSlide) {
    nextSlide.addEventListener("click", () => {
        showSlide(currentSlide + 1);
    });
}

// Display the first slide
showSlide(0);


/* =========================================
   MOBILE NAVIGATION MENU
========================================= */

const menuToggle = document.getElementById("menu-toggle");
const navList = document.getElementById("nav-list");

if (menuToggle && navList) {

    // Open or close the menu
    menuToggle.addEventListener("click", () => {
        const isOpen = navList.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the menu after clicking a navigation link
    navList.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navList.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}


/* =========================================
   FONT SIZE CONTROLS
========================================= */

let textScale = 16;

const fontUp = document.getElementById("font-up");
const fontDown = document.getElementById("font-down");

// Increase font size
if (fontUp) {
    fontUp.addEventListener("click", () => {
        textScale = Math.min(20, textScale + 1);
        document.body.style.fontSize = `${textScale}px`;
    });
}

// Decrease font size
if (fontDown) {
    fontDown.addEventListener("click", () => {
        textScale = Math.max(13, textScale - 1);
        document.body.style.fontSize = `${textScale}px`;
    });
}


/* =========================================
   BACK TO TOP BUTTON
========================================= */

const backTop = document.getElementById("back-top");

if (backTop) {

    // Show button after scrolling down
    window.addEventListener("scroll", () => {
        backTop.classList.toggle("visible", window.scrollY > 350);
    }, { passive: true });

    // Scroll smoothly to the top
    backTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}


/* =========================================
   AUTOMATIC COPYRIGHT YEAR
========================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}



/* ========================================
        UNDER CONSTRUCTION POPUP
   ======================================== */

const popup = document.getElementById("construction-popup");
const closeButton = document.getElementById("popup-close");
const okayButton = document.getElementById("popup-ok");

// Select ALL links with the popup-trigger class
const popupLinks = document.querySelectorAll(".popup-trigger");

function openPopup(event) {
    event.preventDefault();

    if (popup) {
        popup.classList.add("popup-visible");
    }
}

function closePopup() {
    if (popup) {
        popup.classList.remove("popup-visible");
    }
}

// Attach the opening event to every selected link
popupLinks.forEach(function (link) {
    link.addEventListener("click", openPopup);
});

// Close using the X button or Okay button
if (closeButton) {
    closeButton.addEventListener("click", closePopup);
}

if (okayButton) {
    okayButton.addEventListener("click", closePopup);
}

// Close when clicking outside the popup box
if (popup) {
    popup.addEventListener("click", function (event) {
        if (event.target === popup) {
            closePopup();
        }
    });
}

// Close when pressing Escape
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closePopup();
    }
});
