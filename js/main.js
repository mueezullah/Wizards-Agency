/* ==========================================================
   MUEEZ'S STUDIO — MAIN SCRIPT
   Preloader, Smooth Scroll (Lenis), GSAP Animations, Cursor
   ========================================================== */

(function () {
  "use strict";

  // 1. PRELOADER
  
  const preloader = document.getElementById("preloader");
  const preloaderBrand = document.querySelector(".preloader-brand");
  const preloaderBottom = document.querySelector(".preloader-bottom");
  const preloaderBar = document.querySelector(".preloader-bar");
  const preloaderBarFill = document.querySelector(".preloader-bar-fill");
  const counterNumber = document.querySelector(".counter-number");

  function runPreloader() {
    // Fade in preloader elements
    gsap.to(preloaderBrand, {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out",
    });

    gsap.to([preloaderBottom, preloaderBar], {
      opacity: 1,
      duration: 0.6,
      delay: 0.4,
      ease: "power2.out",
    });

    // Animate counter
    let count = { val: 0 };
    gsap.to(count, {
      val: 100,
      duration: 2.5,
      delay: 0.5,
      ease: "power2.inOut",
      onUpdate: function () {
        const v = Math.floor(count.val);
        counterNumber.textContent = v;
        preloaderBarFill.style.width = v + "%";
      },
      onComplete: hidePreloader,
    });
  }

  function hidePreloader() {
    const tl = gsap.timeline();

    tl.to(preloaderBrand, {
      y: -50,
      opacity: 0,
      duration: 0.5,
      ease: "power3.in",
    });

    tl.to(
      [preloaderBottom, preloaderBar],
      {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      },
      "-=0.3"
    );

    tl.to(preloader, {
      yPercent: -100,
      duration: 1,
      ease: "power4.inOut",
      onComplete: function () {
        preloader.style.display = "none";
        animateHero();
      },
    });
  }


  // 2. LENIS SMOOTH SCROLL

  let lenis;

  function initLenis() {
    lenis = new Lenis({
      duration: 1.2,
      easing: function (t) {
        return Math.min(1, 1.001 - Math.pow(2, -10 * t));
      },
      touchMultiplier: 2,
      infinite: false,
    });

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add(function (time) {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  }



  // 4. HERO ANIMATION
  function animateHero() {
    var tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.to(".hero-line-1", { y: "0%", duration: 1.2 }, 0);
    tl.to(".hero-line-2", { y: "0%", duration: 1.2 }, 0.15);
    tl.to(".hero-line-3", { y: "0%", duration: 1.2 }, 0.3);

    tl.to(
      ".hero-meta",
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      },
      0.8
    );
  }

  // 5. SCROLL ANIMATIONS
  
  function initScrollAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    let mm = gsap.matchMedia();

    // Desktop only scroll animations
    mm.add("(min-width: 769px)", () => {
      // --- Hero Scroll Effect ---
      var tlHeroScroll = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 2,
        }
      });
      tlHeroScroll.to(".hero-line-1", { x: -100, filter: "blur(8px)" }, "same");
      tlHeroScroll.to(".hero-line-2", { x: 100, filter: "blur(8px)" }, "same");
      tlHeroScroll.to(".hero-line-3", { filter: "blur(8px)" }, "same");
      tlHeroScroll.to(".hero-meta", { filter: "blur(4px)", opacity: 0 }, "same");

      ScrollTrigger.create({
        trigger: ".hero",
        start: "top top",
        end: "+=100%", 
        pin: true,
        pinSpacing: false
      });

      // --- Showreel video expand on scroll ---
      var reelVideoWrap = document.querySelector(".showreel-video-wrap");
      if (reelVideoWrap) {
        gsap.to(reelVideoWrap, {
          width: "95%",
          height: "90vh",
          borderRadius: "24px",
          scrollTrigger: {
            trigger: ".showreel",
            start: "top bottom",
            end: "top 20%",
            scrub: 2,
          },
        });
      }
    });

    // Mobile & Tablet only scroll animations
    mm.add("(max-width: 768px)", () => {
      // --- Hero Scroll Effect (Gentler translations for mobile viewports) ---
      var tlHeroScroll = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        }
      });
      tlHeroScroll.to(".hero-line-1", { x: -30, filter: "blur(5px)" }, "same");
      tlHeroScroll.to(".hero-line-2", { x: 30, filter: "blur(5px)" }, "same");
      tlHeroScroll.to(".hero-line-3", { filter: "blur(5px)" }, "same");
      tlHeroScroll.to(".hero-meta", { filter: "blur(3px)", opacity: 0 }, "same");

      ScrollTrigger.create({
        trigger: ".hero",
        start: "top top",
        end: "+=60%", 
        pin: true,
        pinSpacing: false
      });

      // --- Showreel video expand on scroll (Aspect-ratio matched for vertical mobile layout!) ---
      var reelVideoWrap = document.querySelector(".showreel-video-wrap");
      if (reelVideoWrap) {
        gsap.to(reelVideoWrap, {
          width: "100%",
          height: "50vh",
          borderRadius: "12px",
          scrollTrigger: {
            trigger: ".showreel",
            start: "top bottom",
            end: "top 20%",
            scrub: 1.5,
          },
        });
      }
    });

    // --- About section — bg color change to light ---
    gsap.to(".about", {
      scrollTrigger: {
        trigger: ".about",
        start: "top 20%",
        end: "bottom 20%",
        scrub: 1,
        onEnter: function () {
          document.querySelector(".about").classList.add("is-light");
        },
        onLeave: function () {
          document.querySelector(".about").classList.remove("is-light");
        },
        onEnterBack: function () {
          document.querySelector(".about").classList.add("is-light");
        },
        onLeaveBack: function () {
          document.querySelector(".about").classList.remove("is-light");
        },
      },
    });

    // --- Clients section — bg color change to light ---
    gsap.to(".clients", {
      scrollTrigger: {
        trigger: ".clients",
        start: "top 20%",
        end: "bottom 40%",
        scrub: 1,
        onEnter: function () {
          document.querySelector(".clients").classList.add("is-light");
        },
        onLeave: function () {
          document.querySelector(".clients").classList.remove("is-light");
        },
        onEnterBack: function () {
          document.querySelector(".clients").classList.add("is-light");
        },
        onLeaveBack: function () {
          document.querySelector(".clients").classList.remove("is-light");
        },
      },
    });

    // Animate about content
    gsap.from(".about-statement", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-statement",
        start: "top 80%",
      },
    });

    gsap.from(".about-right p", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-right",
        start: "top 80%",
      },
    });

    gsap.from(".about-right .btn", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-right .btn",
        start: "top 90%",
      },
    });

    // --- Section labels fade in ---
    gsap.utils.toArray(".section-label").forEach(function (label) {
      gsap.from(label, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: label,
          start: "top 85%",
        },
      });
    });

    // --- Service rows stagger in ---
    gsap.from(".service-row", {
      y: 40,
      opacity: 0,
      duration: 0.7,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".services-list",
        start: "top 75%",
      },
    });

    // --- Work cards stagger in ---
    gsap.from(".work-card", {
      y: 60,
      opacity: 0,
      duration: 0.9,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".work-grid",
        start: "top 75%",
      },
    });

    // --- Client rows stagger ---
    gsap.from(".client-row", {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".clients-list",
        start: "top 80%",
      },
    });

    // --- Footer CTA ---
    gsap.from(".footer-eyebrow", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".footer-cta",
        start: "top 80%",
      },
    });

    gsap.from(".footer-headline", {
      y: 60,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".footer-headline",
        start: "top 85%",
      },
    });

    gsap.from(".footer-cta .btn", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".footer-cta .btn",
        start: "top 90%",
      },
    });

    // --- Parallax on work images ---
    gsap.utils.toArray(".work-card__media img, .work-card__media video").forEach(function (media) {
      gsap.to(media, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: media.closest(".work-card"),
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    });
  }

  // ========================
  // 6. SHOWREEL PLAY TOGGLE
  // ========================
  function initShowreel() {
    var video = document.querySelector(".showreel-video-wrap video");
    if (!video) return;

    // Autoplay muted on scroll into view
    ScrollTrigger.create({
      trigger: ".showreel",
      start: "top 80%",
      onEnter: function () {
        video.play().catch(function() {});
      },
      onLeaveBack: function () {
        video.pause();
      },
    });

    var playBtn = document.getElementById("playBtn");
    if (playBtn) {
      // Toggle play/mute on button click
      playBtn.addEventListener("click", function () {
        if (video.muted) {
          video.muted = false;
          playBtn.innerHTML =
            '<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
        } else {
          video.muted = true;
          playBtn.innerHTML =
            '<svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><polygon points="5,3 19,12 5,21"/></svg>';
        }
      });
    }

    // Play videos on work cards when hovered (safe checked)
    document.querySelectorAll(".work-card__media video").forEach(function (v) {
      var parent = v.closest(".work-card");
      if (parent) {
        parent.addEventListener("mouseenter", function () {
          v.play().catch(function() {});
        });
        parent.addEventListener("mouseleave", function () {
          v.pause();
        });
      }
    });
  }

  // ========================
  // 7. NAV SCROLL BEHAVIOR
  // ========================
  function initNavbar() {
    // Smooth scroll to sections on nav link click
    document.querySelectorAll('.nav-link[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var target = document.querySelector(link.getAttribute("href"));
        if (target && lenis) {
          lenis.scrollTo(target, { offset: -60 });
        }
      });
    });

    // Logo click scrolls to top
    document.querySelector(".nav-logo").addEventListener("click", function (e) {
      e.preventDefault();
      if (lenis) lenis.scrollTo(0);
    });
  }

  // ========================
  // 7b. MOBILE NAVIGATION
  // ========================
  function initMobileMenu() {
    var menuToggle = document.getElementById("menuToggle");
    var mobileMenu = document.getElementById("mobileMenu");
    var mobileMenuLinks = document.querySelectorAll(".mobile-menu-link");
    var mobileFooter = document.querySelector(".mobile-menu-footer");

    if (!menuToggle || !mobileMenu) return;

    var isMenuOpen = false;
    var menuTimeline = gsap.timeline({ paused: true });

    // Set up the GSAP animation for mobile menu open
    menuTimeline.to("#mobileMenu", {
      visibility: "visible",
      duration: 0
    });
    
    menuTimeline.to(".mobile-menu-bg", {
      scaleY: 1,
      duration: 0.5,
      ease: "power4.inOut"
    });

    menuTimeline.to(mobileMenuLinks, {
      y: 0,
      opacity: 1,
      stagger: 0.08,
      duration: 0.6,
      ease: "power3.out"
    }, "-=0.2");

    menuTimeline.to(mobileFooter, {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power3.out"
    }, "-=0.4");

    function openMobileMenu() {
      isMenuOpen = true;
      menuToggle.classList.add("is-active");
      mobileMenu.classList.add("is-active");
      if (lenis) lenis.stop(); // Stop Lenis scroll when menu is open
      menuTimeline.play();
    }

    function closeMobileMenu() {
      isMenuOpen = false;
      menuToggle.classList.remove("is-active");
      mobileMenu.classList.remove("is-active");
      if (lenis) lenis.start(); // Restart Lenis scroll when menu is closed
      menuTimeline.reverse();
    }

    menuToggle.addEventListener("click", function () {
      if (isMenuOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    // Close menu when clicking mobile links and trigger smooth scroll
    mobileMenuLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var targetId = link.getAttribute("href");
        var target = document.querySelector(targetId);

        closeMobileMenu();

        if (target && lenis) {
          // Add a short delay to wait for menu animation to partially close
          setTimeout(function () {
            lenis.scrollTo(target, { offset: -50 });
          }, 350);
        }
      });
    });
  }

  // ========================
  // 7c. FLOATING HOVER REVEAL
  // ========================
  function initHoverReveal() {
    // Disable hover reveal on touch devices (avoid glitchy popups on tap)
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    var reveal = document.createElement("div");
    reveal.id = "hoverReveal";
    reveal.className = "hover-reveal";
    reveal.innerHTML = '<div class="hover-reveal__inner"><img src="" alt="Preview" class="hover-reveal__img" /></div>';
    document.body.appendChild(reveal);

    var img = reveal.querySelector(".hover-reveal__img");
    var rows = document.querySelectorAll(".client-row");

    if (rows.length === 0) return;

    // quickTo for exceptionally smooth liquid cursor follow
    var setX = gsap.quickTo(reveal, "x", { duration: 0.5, ease: "power3.out" });
    var setY = gsap.quickTo(reveal, "y", { duration: 0.5, ease: "power3.out" });

    window.addEventListener("mousemove", function (e) {
      // Offset preview container away from the cursor
      var xOffset = 20;
      var yOffset = -90;

      var x = e.clientX + xOffset;
      var y = e.clientY + yOffset;

      // Bound-safety inside the window
      if (x + 300 > window.innerWidth) {
        x = e.clientX - 300;
      }
      if (y + 200 > window.innerHeight) {
        y = window.innerHeight - 200;
      }
      if (y < 10) {
        y = 10;
      }

      setX(x);
      setY(y);
    });

    rows.forEach(function (row) {
      row.addEventListener("mouseenter", function () {
        var imagePath = row.getAttribute("data-image");
        if (imagePath) {
          img.src = imagePath;
          reveal.style.display = "block";
          gsap.to(reveal, {
            opacity: 1,
            scale: 1,
            rotate: -3, // Clean tilt for client-row
            duration: 0.4,
            ease: "power3.out",
            overwrite: "auto"
          });
        }
      });

      row.addEventListener("mouseleave", function () {
        gsap.to(reveal, {
          opacity: 0,
          scale: 0.7,
          rotate: 0,
          duration: 0.3,
          ease: "power3.out",
          overwrite: "auto",
          onComplete: function () {
            reveal.style.display = "none";
          }
        });
      });
    });
  }

  // ========================
  // 7d. MEDIA LOADERS
  // ========================
  function initMediaLoaders() {
    const mediaContainers = document.querySelectorAll(
      ".work-card__media, .showreel-video-wrap"
    );

    mediaContainers.forEach(function (container) {
      const mediaElement = container.querySelector("img, video");
      if (!mediaElement) return;

      // Add loading state class immediately
      container.classList.add("media-loading");

      // Create loader overlay HTML dynamically
      const loader = document.createElement("div");
      loader.className = "media-loader";
      loader.innerHTML = '<div class="media-loader-spinner"></div>';
      container.appendChild(loader);

      // Helper function to remove loader and show media with transition
      function handleMediaLoaded() {
        if (container.classList.contains("is-loaded")) return;

        container.classList.remove("media-loading");
        container.classList.add("is-loaded");
        loader.classList.add("fade-out");

        // Clean up the loader element from DOM after transition completes
        setTimeout(function () {
          if (loader.parentNode) {
            loader.parentNode.removeChild(loader);
          }
        }, 600);
      }

      // Check if image or video
      if (mediaElement.tagName.toLowerCase() === "img") {
        // Image loading logic
        if (mediaElement.complete) {
          handleMediaLoaded();
        } else {
          mediaElement.addEventListener("load", handleMediaLoaded);
          mediaElement.addEventListener("error", handleMediaLoaded);
        }
      } else if (mediaElement.tagName.toLowerCase() === "video") {
        // Video loading logic
        if (mediaElement.readyState >= 2) {
          handleMediaLoaded();
        } else {
          mediaElement.addEventListener("loadeddata", handleMediaLoaded);
          mediaElement.addEventListener("canplay", handleMediaLoaded);
          mediaElement.addEventListener("error", handleMediaLoaded);
          
          // Fallback in case loading gets stuck or slow connection fails
          setTimeout(handleMediaLoaded, 8000);
        }
      }
    });
  }

  // ========================
  // 8. INITIALIZE EVERYTHING
  // ========================
  function init() {
    gsap.registerPlugin(ScrollTrigger);
    initMediaLoaders();
    initLenis();
    initNavbar();
    initMobileMenu();
    initHoverReveal();
    initShowreel();
    initScrollAnimations();
    runPreloader();
  }

  // Wait for DOM
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
