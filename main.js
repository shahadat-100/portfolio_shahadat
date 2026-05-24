
    const SYSTEM_PROMPT = `You are an AI assistant for Shahadat Hossen's iOS developer portfolio website.
Answer ONLY questions about this developer. Be concise, friendly, and professional.
Keep answers under 3 sentences. Use ONLY the facts listed below.

DEVELOPER FACTS:
- Name: Shahadat Hossen — Junior iOS Developer
- Location: Dhaka Cantonment, Bangladesh
- Email: ios.shahadathossen@gmail.com | Phone: 01815-933780
- Current Role: Junior iOS Developer at CIBL (Feb 2025 – Present)
  - NBLiPower: iOS banking app for National Bank Ltd. (account management, fund transfers, NPSB, bill pay, recharge)
  - Trust Money: Trust Bank's iOS banking app with 50+ features (FDR/DPS, bKash/Nagad, real-time alerts)
- Previous: Jr iOS Developer at AppExits (Jan 2025 – Jan 2026)
  - Shipped: AIVideoGencut, Math Solver, Momo, Summarise AI, Collage Studio
- Intern at AppExits (Jul 2024 – Dec 2024) — demo apps: ChatBuddy, ExpanseX
- Languages (coding): Swift, C, C++, OOP, DSA
- Design Pattern: MVC
- Frameworks: UIKit, Foundation, Alamofire, Firebase, AVFoundation, PhotosUI, VisionKit, MessageKit, Speech, PencilKit, PDFKit, AutoLayout
- Database: CoreData, Document Directory, Firestore, Firebase, Cloudinary
- Education: BSc in CSE at Northern University of Bangladesh (June 2025–Present); Diploma in CST from Brahmanbaria Polytechnic (2020–2025, CGPA 3.62)
- Languages spoken: English, Bangla, Hindi
- Awards: 2nd Place, Intra-Institute Competitive Programming Contest
- Coding Profiles: LeetCode (itsmearyan10), Codeforces (itsmearyan10)
- Availability: Open to opportunities

If asked anything unrelated, say: "I can only answer questions about Shahadat's portfolio."`;

    let chatHistory = [];

    function toggleChat() {
      const win = document.getElementById('chat-window');
      const icon = document.getElementById('chat-icon');
      win.classList.toggle('open');
      icon.textContent = win.classList.contains('open') ? 'close' : 'chat';
    }

    async function sendMessage() {
      const input = document.getElementById('chat-input');
      const text = input.value.trim();
      if (!text) return;
      input.value = '';
      await processMessage(text);
    }

    function sendQuick(text) { processMessage(text); }

    async function processMessage(text) {
      appendMessage(text, 'user');
      await getBotReply(text);
    }

    function appendMessage(text, type) {
      const msgs = document.getElementById('chat-messages');
      const div = document.createElement('div');
      div.className = type === 'user' ? 'msg-user' : 'msg-bot';
      div.textContent = text;
      msgs.appendChild(div);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function showTyping() {
      const msgs = document.getElementById('chat-messages');
      const div = document.createElement('div');
      div.className = 'typing-indicator'; div.id = 'typing';
      div.innerHTML = '<span></span><span></span><span></span>';
      msgs.appendChild(div);
      msgs.scrollTop = msgs.scrollHeight;
    }
    function removeTyping() { const t = document.getElementById('typing'); if (t) t.remove(); }

    async function getBotReply(userMessage) {
      showTyping();
      document.getElementById('send-btn').disabled = true;

      // Simulate natural thinking delay
      await new Promise(resolve => setTimeout(resolve, 600));

      removeTyping();

      const msg = userMessage.toLowerCase().trim();
      let reply = "";

      // Offline Keywords/Rules Matching Engine
      if (msg.includes("project") || msg.includes("work") || msg.includes("build") || msg.includes("shipped") || msg.includes("nblipower") || msg.includes("trust money")) {
        reply = "Shahadat has built several premium iOS apps including NBLiPower (a banking app for National Bank Ltd. with fund transfers, NPSB, and bill pay) and Trust Money (a banking app for Trust Bank with FDR/DPS & wallet integration). He also shipped AIVideoGencut, Collage Studio, and others during his time at AppExits!";
      } else if (msg.includes("skill") || msg.includes("expert") || msg.includes("language") || msg.includes("framework") || msg.includes("database") || msg.includes("swift") || msg.includes("uikit")) {
        reply = "Shahadat is highly skilled in Swift, C/C++, and OOP/DSA. His framework expertise includes UIKit, Alamofire, CoreData, Firebase, AVFoundation, and VisionKit. He standardizes on clean MVC architecture.";
      } else if (msg.includes("hire") || msg.includes("available") || msg.includes("opportunity") || msg.includes("job") || msg.includes("offer")) {
        reply = "Yes, Shahadat is open to new opportunities! He is ready to bring his native iOS expertise to secure banking or creative consumer apps. You can hire him by emailing ios.shahadathossen@gmail.com or calling 01815-933780.";
      } else if (msg.includes("contact") || msg.includes("email") || msg.includes("phone") || msg.includes("call") || msg.includes("address") || msg.includes("location")) {
        reply = "You can contact Shahadat Hossen directly via email at ios.shahadathossen@gmail.com or call him at 01815-933780. He is located in Dhaka Cantonment, Bangladesh.";
      } else if (msg.includes("experience") || msg.includes("role") || msg.includes("current") || msg.includes("cibl") || msg.includes("appexits")) {
        reply = "Shahadat is currently a Junior iOS Developer at CIBL (Feb 2025 – Present) building secure banking solutions. Previously, he was a Junior iOS Developer and Intern at AppExits (Jul 2024 – Jan 2026), shipping multiple AI, utility, and creative apps.";
      } else if (msg.includes("education") || msg.includes("study") || msg.includes("college") || msg.includes("university") || msg.includes("degree") || msg.includes("diploma")) {
        reply = "Shahadat is studying BSc in CSE at Northern University of Bangladesh (June 2025 – Present). He also holds a Diploma in Computer Science and Technology (CGPA 3.62) from Brahmanbaria Polytechnic Institute.";
      } else if (msg.includes("who") || msg.includes("about") || msg.includes("name") || msg.includes("yourself")) {
        reply = "I am the local offline assistant representing Shahadat Hossen! Shahadat is a talented Junior iOS Developer specializing in UIKit, Swift, clean MVC codebases, and production-grade secure applications.";
      } else if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey") || msg.includes("welcome")) {
        reply = "Hello! I am Shahadat's offline portfolio assistant. Ask me anything about his projects, skills, education, experience, or hire availability! 👋";
      } else {
        reply = "I can only answer questions related to Shahadat Hossen's iOS developer portfolio, projects, skills, and availability. Try asking about 'Projects', 'Skills', or how to 'Contact' him!";
      }

      chatHistory.push({ role: 'user', parts: [{ text: userMessage }] });
      chatHistory.push({ role: 'model', parts: [{ text: reply }] });
      appendMessage(reply, 'bot');
      document.getElementById('send-btn').disabled = false;
    }

    function filterProj(tag, btn) {
      document.querySelectorAll('.proj-filter').forEach(b => {
        b.classList.remove('bg-on-surface', 'text-background', 'active-filter');
        b.classList.add('bg-background', 'text-on-surface');
      });
      btn.classList.add('bg-on-surface', 'text-background', 'active-filter');
      btn.classList.remove('bg-background', 'text-on-surface');
      document.querySelectorAll('#proj-grid > div').forEach(card => {
        const tags = card.dataset.tags || '';
        card.style.display = (tag === 'all' || tags.includes(tag)) ? 'block' : 'none';
      });
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // Staggered scroll items animation
    const staggerItems = document.querySelectorAll('.stagger-item');
    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            staggerObserver.unobserve(entry.target); // fire once
          }
        });
      },
      {
        threshold: 0.15,   // 15% visible triggers it
        rootMargin: '0px', // no offset
      }
    );
    staggerItems.forEach((item) => staggerObserver.observe(item));

    /* Accessibility: skip animation if user prefers reduced motion */
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) {
      staggerItems.forEach((el) => el.classList.add('visible'));
    }

    const sections = ['hero', 'projects', 'about', 'skills', 'contact'];
    window.addEventListener('scroll', () => {
      let current = 'hero';
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) current = id;
      });
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('text-primary', 'border-b-4', 'border-primary', 'pb-2');
        if (link.dataset.section === current) link.classList.add('text-primary', 'border-b-4', 'border-primary');
      });
    });

    // ========== PREMIUM ANIMATIONS & INTERACTIONS ==========

    // 1. Native Anchor Smooth Scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // 2. Scroll Text Reveal
    function splitTextForReveal(element) {
      const childNodes = Array.from(element.childNodes);
      element.innerHTML = '';

      let wordIndex = 0;

      childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          const words = node.textContent.split(/(\s+)/);
          words.forEach(word => {
            if (word.trim() === '') {
              element.appendChild(document.createTextNode(word));
            } else {
              const wrapper = document.createElement('span');
              wrapper.className = 'reveal-word-wrapper';
              wrapper.style.display = 'inline-block';
              wrapper.style.overflow = 'hidden';
              wrapper.style.verticalAlign = 'bottom';

              const innerSpan = document.createElement('span');
              innerSpan.className = 'reveal-word';
              innerSpan.style.display = 'inline-block';
              innerSpan.style.transform = 'translateY(40px)';
              innerSpan.style.opacity = '0';
              innerSpan.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
              innerSpan.style.transitionDelay = `${wordIndex * 0.08}s`;
              innerSpan.textContent = word;

              wrapper.appendChild(innerSpan);
              element.appendChild(wrapper);
              wordIndex++;
            }
          });
        } else {
          element.appendChild(node.cloneNode(true));
        }
      });
    }

    const revealHeadings = document.querySelectorAll('h1:not([data-no-reveal]), h2');
    revealHeadings.forEach(heading => {
      splitTextForReveal(heading);

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.reveal-word').forEach(word => {
              word.style.transform = 'translateY(0)';
              word.style.opacity = '1';
            });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });

      observer.observe(heading);
    });

    // ═══ HERO SCRAMBLE → REVEAL ANIMATION ═══
    (function initHeroScramble() {
      const el = document.getElementById('hero-scramble');
      if (!el) return;

      const GLYPHS = '!@#$%^&*()_+-=[]{}|;:<>?/~\\0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const LINE1  = 'BUILDING APPS';
      const LINE2  = 'PEOPLE LOVE.';

      // Build character spans, preserving BR and spaces
      function buildLine(text, startIdx) {
        return text.split('').map((ch, i) => {
          if (ch === ' ') {
            return `<span class="sc-char" data-idx="${startIdx + i}">&nbsp;</span>`;
          }
          return `<span class="sc-char" data-final="${ch}" data-idx="${startIdx + i}">${ch}</span>`;
        }).join('');
      }

      // Inject spans
      el.innerHTML = buildLine(LINE1, 0) + '<br>' + buildLine(LINE2, LINE1.length);

      const spans = Array.from(el.querySelectorAll('.sc-char[data-final]'));

      // — Phase 1: flicker random glyphs every 45ms for 1400ms —
      const flickerTimer = setInterval(() => {
        spans.forEach(span => {
          if (!span.dataset.resolved) {
            span.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            span.classList.add('scrambling');
          }
        });
      }, 45);

      // — Phase 2: resolve char-by-char after 1400ms —
      setTimeout(() => {
        clearInterval(flickerTimer);
        spans.forEach((span, i) => {
          setTimeout(() => {
            span.textContent = span.dataset.final;
            span.classList.remove('scrambling');
            span.classList.add('resolving');
            span.dataset.resolved = 'true';
            setTimeout(() => span.classList.remove('resolving'), 500);
          }, i * 48); // 48ms stagger per character
        });
      }, 1400);
    })();

    // 3. ═══ PREMIUM 3-LAYER CURSOR ═══
    (function () {
      // Skip on touch devices
      if (window.matchMedia('(pointer: coarse)').matches) return;

      const dot = document.getElementById('cursor-dot');
      const ring = document.getElementById('cursor-ring');
      const glow = document.getElementById('cursor-glow');

      let mX = 0, mY = 0;
      let rX = 0, rY = 0;
      let gX = 0, gY = 0;

      // ── Track mouse ──
      document.addEventListener('mousemove', (e) => {
        mX = e.clientX;
        mY = e.clientY;
        dot.style.left = mX + 'px';
        dot.style.top = mY + 'px';
      });

      // ── RAF loop for ring + glow lag ──
      (function animate() {
        rX += (mX - rX) * 0.10;
        rY += (mY - rY) * 0.10;
        gX += (mX - gX) * 0.06;
        gY += (mY - gY) * 0.06;

        ring.style.left = rX + 'px';
        ring.style.top = rY + 'px';
        glow.style.left = gX + 'px';
        glow.style.top = gY + 'px';
        requestAnimationFrame(animate);
      })();

      // ── Click ripple burst ──
      document.addEventListener('pointerdown', (e) => {
        dot.classList.add('clicking');
        ring.classList.add('clicking');
        const ripple = document.createElement('div');
        ripple.className = 'cursor-ripple';
        ripple.style.left = e.clientX + 'px';
        ripple.style.top = e.clientY + 'px';
        document.body.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
      document.addEventListener('pointerup', () => {
        dot.classList.remove('clicking');
        ring.classList.remove('clicking');
      });

      // ── Hide when leaving window ──
      document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
        glow.style.opacity = '0';
      });
      document.addEventListener('mouseenter', () => {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        glow.style.opacity = '1';
      });

      // ── Interactive element hover states ──
      const btnEls = document.querySelectorAll('a, button, .proj-card, .quick-pill, .nav-link, #chat-btn');
      btnEls.forEach(el => {
        el.addEventListener('mouseenter', () => {
          dot.classList.add('hover');
          ring.classList.add('hover');
          glow.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
          dot.classList.remove('hover');
          ring.classList.remove('hover');
          glow.classList.remove('hover');
        });
      });

      // ── Input / textarea: typing cursor mode ──
      const inputEls = document.querySelectorAll('input, textarea');
      inputEls.forEach(el => {
        el.addEventListener('mouseenter', () => {
          dot.classList.add('typing');
          ring.style.opacity = '0.3';
        });
        el.addEventListener('mouseleave', () => {
          dot.classList.remove('typing');
          ring.style.opacity = '1';
        });
      });
    })();

    // 4. 3D Tilt Cards
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -8;
        const rotateY = (x - centerX) / centerX * 8;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

        const glare = card.querySelector('.tilt-glare');
        if (glare) {
          glare.style.opacity = '1';
          glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(188, 1, 0, 0.12), transparent 60%)`;
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        const glare = card.querySelector('.tilt-glare');
        if (glare) glare.style.opacity = '0';
        card.style.transition = 'transform 0.5s ease';
        setTimeout(() => card.style.transition = 'transform 0.1s ease', 500);
      });

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease';
      });
    });

    // 5. Magnetic Buttons
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });

    // 6. Scroll Reveal Animations
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
      revealObserver.observe(el);
    });

    // 7. Counter & Skill Bar Animation
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
          entry.target.dataset.counted = 'true';
          const target = parseInt(entry.target.dataset.target);
          const fillBar = entry.target.closest('div').nextElementSibling.querySelector('.skill-fill');
          const duration = 1500;
          const startTime = performance.now();

          function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = progress * (2 - progress); // easeOutQuad

            entry.target.textContent = Math.round(target * eased);

            if (fillBar) {
              fillBar.style.width = (target * eased) + '%';
            }

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          }
          requestAnimationFrame(animate);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

    // 6. Hero Title Parallax
    const heroTitle = document.querySelector('.cursor-blink');
    window.addEventListener('scroll', () => {
      const scrollY = window.pageYOffset;
      if (heroTitle && scrollY < window.innerHeight) {
        heroTitle.style.transform = `translateY(${scrollY * 0.15}px)`;
      }
    });

    // 7. Navbar Scroll Transition
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      if (navbar) {
        if (currentScroll > 100) {
          navbar.style.background = 'rgba(249, 249, 249, 0.95)';
          navbar.style.backdropFilter = 'blur(12px)';
          navbar.style.borderBottomColor = '#bc0100';
        } else {
          navbar.style.background = '#f9f9f9';
          navbar.style.backdropFilter = 'none';
          navbar.style.borderBottomColor = '#1a1c1c';
        }
      }
    });

    // ========== 8. DEADPOOL EYE TRACKING INTERACTION ==========
    let targetEyeX = 0;
    let targetEyeY = 0;
    let currentEyeX = 0;
    let currentEyeY = 0;

    window.addEventListener('mousemove', (e) => {
      const avatarEl = document.getElementById('lottie-avatar');
      if (!avatarEl) return;

      const rect = avatarEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.hypot(dx, dy);

      const maxLimit = 5.5; // maximum pixel movement of the eyes
      const angle = Math.atan2(dy, dx);
      // scale movement based on distance to mouse
      const strength = Math.min(maxLimit, dist * 0.015);

      targetEyeX = Math.cos(angle) * strength;
      targetEyeY = Math.sin(angle) * strength;
    });

    function updateEyeTracking() {
      requestAnimationFrame(updateEyeTracking);

      // Lerp for butter-smooth transition
      currentEyeX += (targetEyeX - currentEyeX) * 0.15;
      currentEyeY += (targetEyeY - currentEyeY) * 0.15;

      const leftEyePath = document.querySelector('g[aria-label="Ellipse 28"] path');
      const rightEyePath = document.querySelector('g[aria-label="Ellipse 30"] path');

      if (leftEyePath) {
        leftEyePath.style.transform = `translate(${currentEyeX}px, ${currentEyeY}px)`;
        leftEyePath.style.transformBox = 'fill-box';
        leftEyePath.style.transformOrigin = 'center';
      }
      if (rightEyePath) {
        rightEyePath.style.transform = `translate(${currentEyeX}px, ${currentEyeY}px)`;
        rightEyePath.style.transformBox = 'fill-box';
        rightEyePath.style.transformOrigin = 'center';
      }
    }
    // Initialize eye tracking loop
    updateEyeTracking();
    // ========== 9. FORM EMAIL DISPATCH & VALIDATION ==========
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameEl = document.getElementById('contact-name');
        const emailEl = document.getElementById('contact-email');
        const msgEl = document.getElementById('contact-message');

        const params = {
          from_name: nameEl ? nameEl.value.trim() : '',
          from_email: emailEl ? emailEl.value.trim() : '',
          message: msgEl ? msgEl.value.trim() : '',
        };

        emailjs.send("service_0lzhg1w", "template_enwx6lc", params)
          .then(() => {
            alert("Message sent!");
            showFormAlert("Message sent! 🚀", "#4caf50");
            contactForm.reset();
          })
          .catch((err) => {
            console.error("EmailJS Error:", err);
            alert("Failed. Try again.");
            showFormAlert("Failed. Try again.", "#bc0100");
          });
      });
    }

    function showFormAlert(message, bgColor) {
      const oldAlert = document.getElementById('form-custom-alert');
      if (oldAlert) oldAlert.remove();

      const alertContainer = document.createElement('div');
      alertContainer.id = 'form-custom-alert';
      alertContainer.style.position = 'fixed';
      alertContainer.style.bottom = '24px';
      alertContainer.style.left = '50%';
      alertContainer.style.transform = 'translateX(-50%) translateY(100px)';
      alertContainer.style.backgroundColor = '#1a1c1c';
      alertContainer.style.color = '#fff';
      alertContainer.style.padding = '14px 24px';
      alertContainer.style.fontFamily = 'Inter';
      alertContainer.style.fontSize = '14px';
      alertContainer.style.fontWeight = '600';
      alertContainer.style.borderLeft = `6px solid ${bgColor}`;
      alertContainer.style.borderTop = `2px solid #1a1c1c`;
      alertContainer.style.borderRight = `2px solid #1a1c1c`;
      alertContainer.style.borderBottom = `2px solid #1a1c1c`;
      alertContainer.style.boxShadow = '0 8px 30px rgba(0,0,0,0.15)';
      alertContainer.style.zIndex = '99999';
      alertContainer.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      alertContainer.style.letterSpacing = '0.03em';
      alertContainer.style.textTransform = 'uppercase';

      alertContainer.innerText = message;
      document.body.appendChild(alertContainer);

      requestAnimationFrame(() => {
        alertContainer.style.transform = 'translateX(-50%) translateY(0)';
      });

      setTimeout(() => {
        alertContainer.style.transform = 'translateX(-50%) translateY(120px)';
        setTimeout(() => {
          alertContainer.remove();
        }, 400);
      }, 5000);
    }

    // Initialize Lottie
    lottie.loadAnimation({
      container: document.getElementById('lottie-avatar'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'Captain Deadpool.json'
    });

    // ═══ PREMIUM LOADING SCREEN JS ═══
    (function initLoader() {
      const screen = document.getElementById('loading-screen');
      const bar = document.getElementById('loader-bar');
      const pct = document.getElementById('loader-pct');
      const letters = screen.querySelectorAll('.loader-logo span');
      let progress = 0;

      // Animate letters in using GSAP
      gsap.to(letters, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power3.out',
        delay: 0.1
      });

      const ticker = setInterval(() => {
        progress += Math.random() * 18;
        if (progress >= 100) {
          progress = 100;
          clearInterval(ticker);
        }
        bar.style.width = progress + '%';
        pct.textContent = Math.round(progress) + '%';
        if (progress === 100) {
          setTimeout(() => {
            gsap.to(screen, {
              opacity: 0,
              duration: 0.7,
              ease: 'expo.inOut',
              onComplete: () => {
                screen.style.display = 'none';
              }
            });
          }, 300);
        }
      }, 80);
    })();

    // ═══ BINARY CODER HERO PARTICLES JS ═══
    (function initBinaryParticles() {
      const canvas = document.getElementById('hero-canvas');
      const heroEl = document.querySelector('#hero');
      if (!canvas || !heroEl) return;

      const ctx = canvas.getContext('2d');
      const COUNT = 340;
      let mouseX = 0, mouseY = 0;
      let w, h;

      function resize() {
        w = canvas.width = heroEl.offsetWidth;
        h = canvas.height = heroEl.offsetHeight;
      }
      resize();
      window.addEventListener('resize', resize);

      document.addEventListener('mousemove', e => {
        mouseX = (e.clientX / window.innerWidth - 0.5);
        mouseY = (e.clientY / window.innerHeight - 0.5);
      });

      // Build 340 binary particle objects
      const particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * 1.2 - 0.1,       // normalized 0-1 (slight overflow)
        y: Math.random(),
        char: Math.random() > 0.5 ? '1' : '0',
        size: Math.random() * 10 + 8,        // 8–18px
        speed: Math.random() * 0.00015 + 0.00005, // very slow drift
        opacity: Math.random() * 0.45 + 0.1,
        parallaxDepth: Math.random() * 40 + 10,  // px shift on mouse
        drift: (Math.random() - 0.5) * 0.00008,  // slight horizontal drift
        flipTimer: Math.random() * 180,       // frames until next bit flip
        flipInterval: Math.floor(Math.random() * 120) + 60,
      }));

      let frame = 0;
      (function animate() {
        requestAnimationFrame(animate);
        frame++;

        ctx.clearRect(0, 0, w, h);

        for (const p of particles) {
          // Slowly drift down and sideways
          p.y += p.speed;
          p.x += p.drift;

          // Wrap around
          if (p.y > 1.05) { p.y = -0.05; p.x = Math.random() * 1.2 - 0.1; }
          if (p.x > 1.1)  p.x = -0.1;
          if (p.x < -0.1) p.x = 1.1;

          // Randomly flip between 0 and 1
          p.flipTimer--;
          if (p.flipTimer <= 0) {
            p.char = p.char === '0' ? '1' : '0';
            p.flipTimer = p.flipInterval + Math.floor(Math.random() * 60);
          }

          // Pulse opacity
          const pulse = 0.08 * Math.sin(frame * 0.02 + p.parallaxDepth);
          const alpha = Math.min(1, Math.max(0, p.opacity + pulse));

          // Mouse parallax offset
          const ox = mouseX * p.parallaxDepth;
          const oy = mouseY * p.parallaxDepth;

          const px = p.x * w + ox;
          const py = p.y * h + oy;

          ctx.save();
          ctx.globalAlpha = alpha;
          ctx.fillStyle = '#bc0100';
          ctx.font = `${p.size}px 'DM Mono', monospace`;
          ctx.fillText(p.char, px, py);
          ctx.restore();
        }
      })();
    })();

    // ═══ HERO TITLE 3D PARALLAX EFFECT ═══
    (function () {
      const heroTitle = document.getElementById('hero-scramble');
      let mouseX = 0, mouseY = 0;

      window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) - 0.5;
        mouseY = (e.clientY / window.innerHeight) - 0.5;

        if (heroTitle) {
          heroTitle.style.transform = `perspective(1000px) rotateY(${mouseX * 10}deg) rotateX(${-mouseY * 10}deg) translateZ(20px)`;
          heroTitle.style.textShadow = `${-mouseX * 30}px ${-mouseY * 30}px 40px rgba(188, 1, 0, 0.35)`;
          heroTitle.style.transition = 'transform 0.1s ease-out, text-shadow 0.1s ease-out';
        }
      });
    })();



    // ═══ INTERACTIVE ABOUT SECTION TABS ═══
    window.switchAboutTab = function (tab) {
      const expTab = document.getElementById('about-tab-exp');
      const eduTab = document.getElementById('about-tab-edu');
      const expTimeline = document.getElementById('about-exp-timeline');
      const eduTimeline = document.getElementById('about-edu-timeline');

      if (!expTab || !eduTab || !expTimeline || !eduTimeline) return;

      if (tab === 'experience') {
        // Update tabs active state
        expTab.classList.add('text-primary', 'border-b-4', 'border-primary');
        expTab.classList.remove('text-secondary');
        eduTab.classList.remove('text-primary', 'border-b-4', 'border-primary');
        eduTab.classList.add('text-secondary');

        // Stagger fade-out education timeline, then fade-in experience
        gsap.to(eduTimeline.querySelectorAll('.stagger-item'), {
          opacity: 0,
          y: 15,
          duration: 0.2,
          stagger: 0.05,
          onComplete: () => {
            eduTimeline.classList.add('hidden');
            expTimeline.classList.remove('hidden');
            gsap.fromTo(expTimeline.querySelectorAll('.stagger-item'), 
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'expo.out' }
            );
          }
        });
      } else {
        // Update tabs active state
        eduTab.classList.add('text-primary', 'border-b-4', 'border-primary');
        eduTab.classList.remove('text-secondary');
        expTab.classList.remove('text-primary', 'border-b-4', 'border-primary');
        expTab.classList.add('text-secondary');

        // Stagger fade-out experience timeline, then fade-in education
        gsap.to(expTimeline.querySelectorAll('.stagger-item'), {
          opacity: 0,
          y: 15,
          duration: 0.2,
          stagger: 0.05,
          onComplete: () => {
            expTimeline.classList.add('hidden');
            eduTimeline.classList.remove('hidden');
            gsap.fromTo(eduTimeline.querySelectorAll('.stagger-item'), 
              { opacity: 0, y: 15 },
              { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'expo.out' }
            );
          }
        });
      }
    };

    // ═══ INTERACTIVE DEADPOOL SPEECH BUBBLE ═══
    (function initDeadpoolSpeech() {
      const avatar = document.getElementById('lottie-avatar');
      const bubble = document.getElementById('deadpool-bubble');
      const bubbleText = document.getElementById('deadpool-bubble-text');
      if (!avatar || !bubble) return;

      const quotes = [
        "Hey there, bub! Yes, I build banking apps. No, I won't wire you a million bucks.",
        "Swift is great, but have you tried Chimichangas? Highly recommend.",
        "My banking code is 100% secure. My mouth? Not so much.",
        "UIKit is awesome, but MVC stands for Massive Vexing Conflicts, right?",
        "I compile on the first try. Just kidding, I'm a developer, not a wizard.",
        "Maximum Effort! (And by effort, I mean StackOverflow searches).",
        "Don't click me too hard, you'll scratch the suit!",
        "Yes, my code has zero force-unwraps. Don't check the git logs though.",
        "Bugs are just undocumented features I added for extra flavor."
      ];

      let lastIndex = -1;
      function showRandomQuote() {
        let index = Math.floor(Math.random() * quotes.length);
        while (index === lastIndex) {
          index = Math.floor(Math.random() * quotes.length);
        }
        lastIndex = index;

        // Change text inside bubble
        if (bubbleText) {
          bubbleText.textContent = quotes[index];
        }

        // Add bubble show class
        bubble.classList.add('bubble-active');

        // GSAP shake and bubble bounce
        gsap.fromTo(bubble, 
          { scale: 0.85, rotation: -3 },
          { scale: 1, rotation: 0, duration: 0.45, ease: 'elastic.out(1.2, 0.4)' }
        );
      }

      // Show on hover
      avatar.addEventListener('mouseenter', () => {
        showRandomQuote();
      });

      // Hide on mouse leave
      avatar.addEventListener('mouseleave', () => {
        bubble.classList.remove('bubble-active');
      });

      // Change on click
      avatar.addEventListener('click', () => {
        showRandomQuote();
      });
    })();
  