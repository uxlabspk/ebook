// ===========================
// Back to Top Button
// ===========================
const backtotop = document.getElementById("backtotop");
if (backtotop) {
  const toggleBacktotop = () => {
    if (window.scrollY > 100) {
      backtotop.classList.add("active");
    } else {
      backtotop.classList.remove("active");
    }
  };
  window.addEventListener("load", toggleBacktotop);
  document.addEventListener("scroll", toggleBacktotop);
}

// ===========================
// Sticky Header Shadow
// ===========================
const header = document.querySelector("header");
if (header) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
}

// ===========================
// Scroll Reveal Animations
// ===========================
const revealElements = document.querySelectorAll(
  ".reveal, .reveal-left, .reveal-right",
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  {
    threshold: 0.15,
    rootMargin: "0px 0px -40px 0px",
  },
);

revealElements.forEach((el) => revealObserver.observe(el));

// ===========================
// Animated Counter
// ===========================
const statNumbers = document.querySelectorAll(".stat-number[data-target]");
let countersStarted = false;

function animateCounters() {
  if (countersStarted) return;
  countersStarted = true;

  statNumbers.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"), 10);
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;
    let current = 0;
    const increment = target / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current);
      }
    }, stepTime);
  });
}

const statsSection = document.querySelector(".stats-section");
if (statsSection) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
        }
      });
    },
    { threshold: 0.3 },
  );

  counterObserver.observe(statsSection);
}

// ===========================
// Card Tilt Effect on Hover
// ===========================
const cards = document.querySelectorAll(".overview .card");
cards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// ===========================
// Smooth Scroll for Anchors
// ===========================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href === "#") return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});
