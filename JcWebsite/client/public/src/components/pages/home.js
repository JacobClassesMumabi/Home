// Slider functionality
      let currentSlide = 0;
      const totalSlides = 3;

      function showSlide(slideIndex) {
        // Hide all slides
        document.querySelectorAll(".slide").forEach((slide) => {
          slide.classList.remove("active");
        });

        // Remove active class from all buttons
        document.querySelectorAll(".slider-btn").forEach((btn) => {
          btn.classList.remove("active");
        });

        // Show selected slide
        document.getElementById(`slide-${slideIndex}`).classList.add("active");

        // Add active class to selected button
        document
          .querySelectorAll(".slider-btn")
          [slideIndex].classList.add("active");

        currentSlide = slideIndex;
      }

      // Auto-advance slides every 8 seconds
      function autoAdvanceSlides() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
      }

      // Start auto-advance
      let slideInterval = setInterval(autoAdvanceSlides, 8000);

      // Pause auto-advance when user interacts
      document.querySelectorAll(".slider-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          clearInterval(slideInterval);
          // Restart auto-advance after 10 seconds of inactivity
          setTimeout(() => {
            slideInterval = setInterval(autoAdvanceSlides, 8000);
          }, 10000);
        });
      });

      // Smooth scrolling for navigation links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute("href"));
          if (target) {
            target.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        });
      });

      // Add hover effects to testimonial cards
      document.querySelectorAll(".testimonial-card").forEach((card) => {
        card.addEventListener("mouseenter", function () {
          this.style.transform = "translateY(-10px)";
        });

        card.addEventListener("mouseleave", function () {
          this.style.transform = "translateY(-5px)";
        });
      });

      // Add loading animation to hero section
      window.addEventListener("load", function () {
        const heroContent = document.querySelector(".hero-content");
        heroContent.style.opacity = "0";
        heroContent.style.transform = "translateY(30px)";
        heroContent.style.transition = "opacity 0.8s ease, transform 0.8s ease";

        setTimeout(() => {
          heroContent.style.opacity = "1";
          heroContent.style.transform = "translateY(0)";
        }, 300);
      });

      // Add intersection observer for animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      }, observerOptions);

      // Observe elements for animation
      document.addEventListener("DOMContentLoaded", () => {
        const animateElements = document.querySelectorAll(
          ".testimonial-card, .student-card, .course-card, .teacher-card"
        );
        animateElements.forEach((el) => {
          el.style.opacity = "0";
          el.style.transform = "translateY(30px)";
          el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
          observer.observe(el);
        });
      });