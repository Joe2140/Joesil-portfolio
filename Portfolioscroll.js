particlesJS("particles-js", {
      particles: {
        number: { value: 60, density: { enable: true, value_area: 800 } },
        color: { value: "#00bfff" },
        shape: { type: "circle" },
        opacity: { value: 0.7, random: true },
        size: { value: 5, random: true },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#00bfff",
          opacity: 0.5,
          width: 2
        },
        move: {
          enable: true,
          speed: 2,
          out_mode: "out",
          direction: "none"
        }
      },
      interactivity: {
        events: {
          onhover: { enable: true, mode: "grab" },
          onclick: { enable: true, mode: "push" }
        },
        modes: {
          grab: { distance: 150, line_linked: { opacity: 1 } },
          push: { particles_nb: 4 }
        }
      },
      retina_detect: true
    });

    // Add CSS glow to particles canvas
    document.addEventListener('DOMContentLoaded', function() {
      var canvas = document.querySelector('#particles-js > canvas');
      if (canvas) {
        canvas.style.filter = 'drop-shadow(0 0 16px #00bfff) drop-shadow(0 0 32px #00bfff)';
      }
    });

  ScrollReveal().reveal('header', {
    delay: 100,
    duration: 400,
    origin: 'top',
    distance: '30px',
    reset: true  // Repeats when in/out of view
  });

  ScrollReveal().reveal('section', {
    delay: 100,
    duration: 400,
    origin: 'bottom',
    distance: '30px',
    interval: 100,
    reset: true
  });

  ScrollReveal().reveal('.socials', {
    delay: 100,
    duration: 400,
    origin: 'bottom',
    distance: '20px',
    reset: true
  });
  

  document.querySelectorAll('.skill-box').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element
      const y = e.clientY - rect.top;  // y position within the element

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });
    const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, {
    threshold: 0.2
  });

  document.querySelectorAll('.custom-scroll-item').forEach(item => {
    observer.observe(item);
  });
    document.addEventListener('DOMContentLoaded', () => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('show');
          }, index * 200); // staggered animation
        }
      });
    }, {
      threshold: 0.2
    });

    document.querySelectorAll('.custom-scroll-item').forEach((item) => {
      observer.observe(item);
    });
  });
  // Carousel logic
document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector(".carousel-track");
  const items = document.querySelectorAll(".carousel-item");
  const dotsContainer = document.getElementById("carousel-dots");
  let currentIndex = 0;

  // Create dots
  items.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      currentIndex = index;
      updateCarousel();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  function updateCarousel() {
    const width = items[0].offsetWidth;
    track.style.transform = `translateX(-${currentIndex * width}px)`;
    dots.forEach(dot => dot.classList.remove("active"));
    dots[currentIndex].classList.add("active");
  }

  // Swipe handling
  let startX = 0;
  let isDragging = false;
  const carouselContainer = document.querySelector(".carousel-container");

  carouselContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  carouselContainer.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        currentIndex = (currentIndex + 1) % items.length;
      } else {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
      }
      updateCarousel();
      isDragging = false;
    }
  });

  carouselContainer.addEventListener("touchend", () => {
    isDragging = false;
  });

  window.addEventListener("resize", updateCarousel);

  // Initial update
  updateCarousel();
});

// Welcome overlay logic with fade-out
window.addEventListener('DOMContentLoaded', function() {
  const overlay = document.getElementById('welcome-overlay');
  const continueBtn = document.getElementById('continueBtn');
  const music = document.getElementById('bg-music');
  const musicBtn = document.getElementById('musicBtn');
  let isPlaying = false;
  if (overlay && continueBtn) {
    document.body.style.overflow = 'hidden';
    continueBtn.addEventListener('click', function() {
      overlay.style.opacity = '0';
      setTimeout(function() {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
      }, 700);
      // Try to play music on continue
      if (music && music.paused) {
        music.play();
        isPlaying = true;
        if (musicBtn) musicBtn.textContent = '🔈';
      }
    });
  }
  // Music controls logic
  if (music && musicBtn) {
    music.volume = 1.0;
    // Try to autoplay on page load
    music.play().then(() => {
      isPlaying = true;
      musicBtn.textContent = '🔈';
    }).catch(() => {
      musicBtn.textContent = '🔊';
    });
    musicBtn.addEventListener('click', function() {
      if (music.paused) {
        music.play();
        isPlaying = true;
        musicBtn.textContent = '🔈';
      } else {
        music.pause();
        isPlaying = false;
        musicBtn.textContent = '🔊';
      }
    });
    // Start music on first user interaction if not already playing
    function playOnce() {
      if (music.paused) {
        music.play();
        isPlaying = true;
        musicBtn.textContent = '🔈';
      }
      window.removeEventListener('click', playOnce);
      window.removeEventListener('keydown', playOnce);
    }
    window.addEventListener('click', playOnce);
    window.addEventListener('keydown', playOnce);
  }
});