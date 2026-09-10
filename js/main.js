// EmailJS — public key
emailjs.init("Ik_cPwTLCWk7VOyfN");

// Shared motion flag
const REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ═══ REM-BASED ADAPTIVE GRID (scale-up above 1920px) ═══
(function () {
  const FONT_BASE = 16, BASE_W = 1920, COEF = 0.6666;
  function applyAdaptiveGrid() {
    const w = window.innerWidth;
    const reduction = ((BASE_W - w) / BASE_W) * 100 * COEF;
    const size = FONT_BASE - (FONT_BASE * reduction) / 100;
    if (size > FONT_BASE) document.documentElement.style.fontSize = size + 'px';
    else document.documentElement.style.removeProperty('font-size'); // let the vw media queries drive
  }
  applyAdaptiveGrid();
  window.addEventListener('resize', applyAdaptiveGrid);
})();

const SYSTEM_PROMPT = `You are an AI assistant for Shahadat Hossen's iOS developer portfolio website.
Answer ONLY questions about this developer. Be concise, friendly, and professional.
Keep answers under 3 sentences. Use ONLY the facts listed below.

DEVELOPER FACTS:
- Name: Shahadat Hossen — Junior iOS Developer
- Location: Dhaka Cantonment, Bangladesh
- Email: ios.shahadathossen@gmail.com | Phone: 01815-933780
- Current Role: Junior iOS Developer at CIBL (Feb 2026 – Present)
  - NBLiPower: iOS banking app for National Bank Ltd. (account management, fund transfers, NPSB, bill pay, recharge)
  - Trust Money: Trust Bank's iOS banking app with 50+ features (FDR/DPS, bKash/Nagad, real-time alerts)
  - i-Banking: Meghna Bank's iOS digital banking app (multi-account view, card control, PIN reset, bKash/Nagad/Meghna Pay)
- Previous: Jr iOS Developer at AppExits (Jan 2025 – Jan 2026)
  - Shipped: AIVideoGencut, Math Solver, Momo, Summarise AI, Collage Studio
- Intern at AppExits (Jul 2024 – Dec 2024) — demo apps: ChatBuddy, ExpanseX
- Languages (coding): Swift, C, C++, OOP, DSA
- Design Patterns: MVC, MVVM
- Frameworks: UIKit, SwiftUI, Combine, Foundation, Alamofire, Firebase, AVFoundation, PhotosUI, VisionKit, MessageKit, Speech, PencilKit, PDFKit, AutoLayout
- Domain: Fintech / mobile banking
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
  if (msg.includes("meghna") || msg.includes("i-banking") || msg.includes("ibanking")) {
    reply = "Shahadat developed Meghna Bank's i-Banking iOS app at CIBL! It features multi-account management, instant fund transfers across all banks & wallets (bKash, Nagad, Meghna Pay), biometric Face ID login, and full card lifecycle control (PIN reset, card block).";
  } else if (msg.includes("trust") || msg.includes("trust money") || msg.includes("trust bank")) {
    reply = "Trust-Money is Trust Bank's production mobile banking iOS app built by Shahadat at CIBL. It includes 50+ banking features, FDR/DPS modules, bKash/Nagad wallet integration, and real-time alerts.";
  } else if (msg.includes("nbl") || msg.includes("national bank") || msg.includes("nblipower")) {
    reply = "NBL iPower (NBL Apps) is the official iOS banking app for National Bank Ltd. built with Swift & UIKit, supporting fund transfers, NPSB instant payments, bill payments, and PDF statement exports.";
  } else if (msg.includes("project") || msg.includes("work") || msg.includes("build") || msg.includes("shipped") || msg.includes("banking")) {
    reply = "Shahadat has built 3 flagship iOS banking apps at CIBL: Meghna Bank (i-Banking), Trust Bank (Trust-Money), and National Bank Ltd. (NBL iPower). He also shipped AIVideoGencut and Collage Studio at AppExits!";
  } else if (msg.includes("skill") || msg.includes("expert") || msg.includes("stack") || msg.includes("language") || msg.includes("framework") || msg.includes("database") || msg.includes("swift") || msg.includes("swiftui") || msg.includes("uikit") || msg.includes("combine") || msg.includes("mvvm") || msg.includes("mvc")) {
    reply = "Shahadat works in Swift with both UIKit and SwiftUI, Combine for reactive data flow, and clean MVC / MVVM architecture. Also Alamofire, CoreData, REST APIs, and biometric security — all applied to banking-grade fintech apps.";
  } else if (msg.includes("hire") || msg.includes("available") || msg.includes("opportunity") || msg.includes("job") || msg.includes("offer")) {
    reply = "Yes, Shahadat is open to new opportunities! You can contact him at ios.shahadathossen@gmail.com or call 01815-933780.";
  } else if (msg.includes("contact") || msg.includes("email") || msg.includes("phone") || msg.includes("call") || msg.includes("address") || msg.includes("location")) {
    reply = "You can reach Shahadat directly at ios.shahadathossen@gmail.com or 01815-933780. He is based in Dhaka Cantonment, Bangladesh.";
  } else if (msg.includes("experience") || msg.includes("role") || msg.includes("current") || msg.includes("cibl") || msg.includes("appexits")) {
    reply = "Shahadat is currently a Junior iOS Developer at CIBL (Feb 2026 – Present) building banking applications for Meghna Bank, Trust Bank, and National Bank Ltd. Previously, he shipped multiple apps at AppExits.";
  } else if (msg.includes("education") || msg.includes("study") || msg.includes("college") || msg.includes("university") || msg.includes("degree") || msg.includes("diploma")) {
    reply = "Shahadat is pursuing a BSc in CSE at Northern University of Bangladesh and holds a Diploma in CST (CGPA 3.62) from Brahmanbaria Polytechnic Institute.";
  } else if (msg.includes("who") || msg.includes("about") || msg.includes("name") || msg.includes("yourself")) {
    reply = "Shahadat Hossen is a dedicated Junior iOS Developer specializing in UIKit, Swift, MVC architecture, and secure Fintech banking apps.";
  } else if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey") || msg.includes("welcome")) {
    reply = "Hello! I am Shahadat's portfolio assistant. Ask me anything about his banking apps (Meghna Bank, Trust Money, NBL), skills, or availability! 👋";
  } else {
    reply = "I can answer questions regarding Shahadat Hossen's iOS portfolio, banking projects (Meghna Bank, Trust Bank, NBL), skills, and contact details!";
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
    card.style.display = (tag === 'all' || tags.includes(tag)) ? 'flex' : 'none';
  });
}

// ═══ APP STORE SHOWCASE MODAL ENGINE ═══
const APPS_DATA = {
  meghna: {
    title: "i-Banking",
    subtitle: "Meghna Bank Mobile Banking",
    dev: "Meghna Bank Ltd.",
    age: "4+",
    rating: "4+ Rating",
    category: "Finance",
    size: "142.5 MB",
    themeGradient: "linear-gradient(135deg, #2e0854 0%, #6d28d9 60%, #9333ea 100%)",
    accentColor: "#9333ea",
    iconSvg: `<svg viewBox="0 0 256 256" class="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="meghna-modal-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#6f2897"/>
          <stop offset="60%" stop-color="#5a227e"/>
          <stop offset="100%" stop-color="#461466"/>
        </linearGradient>
      </defs>
      <path d="M51 206 C55 174 59 128 44 95 C64 104 76 117 81 136 C71 161 60 188 51 206 Z" fill="url(#meghna-modal-grad)"/>
      <path d="M58 207 C70 176 80 122 77 48 C100 68 118 91 123 119 C104 151 79 183 58 207 Z" fill="url(#meghna-modal-grad)"/>
      <path d="M66 209 C92 177 121 122 128 59 C161 89 194 133 213 209 C159 194 107 196 66 209 Z" fill="url(#meghna-modal-grad)"/>
    </svg>`,
    tagline: "All Your Accounts In One Place &middot; Bank Anytime, Anywhere",
    desc: "Designed and engineered the native iOS banking application for Meghna Bank Ltd. (i-Banking) delivering a unified digital branch experience with high security, instant payments, and seamless card lifecycle control.",
    screens: [
      {
        headline: "All Your Accounts In One Place",
        badge: "ACCOUNTS",
        icon: "credit_card",
        desc: "Unified balances across savings, current, FDR, and Platinum credit cards with real-time analytics."
      },
      {
        headline: "Bank Anytime, Anywhere",
        badge: "SECURE ACCESS",
        icon: "lock",
        desc: "Biometric Face ID & Touch ID authentication with 256-bit encrypted token exchange."
      },
      {
        headline: "Manage Your Cards With Ease",
        badge: "CARD CONTROL",
        icon: "tune",
        desc: "Instant card activation, spend limit management, and transaction breakdowns."
      },
      {
        headline: "Send Money in Seconds",
        badge: "FUND TRANSFER",
        icon: "send_money",
        desc: "Direct transfers to all Bangladesh banks (BEFTN/NPSB) and MFS wallets (bKash, Nagad, Meghna Pay)."
      },
      {
        headline: "Complete Control Of Your Cards",
        badge: "CARD SERVICES",
        icon: "security",
        desc: "Reset card PIN, temporary block/unblock, card-to-account transfer, and bill payments in one tap."
      }
    ],
    techStack: ["Swift 5", "UIKit", "REST API", "MVC Architecture", "Biometric Keychain", "Card Control SDK", "Alamofire", "NPSB / BEFTN Engine"]
  },
  trust: {
    title: "Trust-Money",
    subtitle: "Trust Bank Mobile Banking",
    dev: "Trust Bank LTD",
    age: "4+",
    rating: "3.2 ★ (206)",
    category: "Finance",
    size: "116.1 MB",
    themeGradient: "linear-gradient(135deg, #044e3b 0%, #059669 60%, #10b981 100%)",
    accentColor: "#10b981",
    iconSvg: `<svg viewBox="0 0 256 256" class="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="80" y="64" width="110" height="98" rx="4" fill="#006837"/>
      <circle cx="122" cy="102" r="62" fill="#a6192e"/>
      <circle cx="132" cy="110" r="44" fill="#ffffff"/>
      <path d="M92 98 L166 98 L166 102 L92 102 Z" fill="#006837"/>
      <path d="M149 84 L124 84 L106 136 C100 153 131 153 170 124 L166 120 C133 141 117 139 125 121 L132 102 L156 102 Z" fill="#006837"/>
      <text x="128" y="206" font-family="'Inter', -apple-system, sans-serif" font-style="italic" font-weight="900" font-size="31" fill="#006837" text-anchor="middle" letter-spacing="-0.5">Trust Money</text>
    </svg>`,
    tagline: "Safe. Simple. Smart. &middot; Trusted by Millions of People",
    desc: "Built Trust Bank's mobile banking platform on iOS featuring 50+ banking services, automated deposit schemes (FDR/DPS), multi-wallet integrations, and real-time transaction processing.",
    screens: [
      {
        headline: "Safe. Simple. Smart.",
        badge: "SECURITY",
        icon: "verified_user",
        desc: "Fast biometric authentication, multi-factor OTP verification, and hardened iOS Keychain encryption."
      },
      {
        headline: "Trusted by Millions of People",
        badge: "FINANCIAL INCLUSION",
        icon: "group",
        desc: "Reliable mobile banking serving personal and business accounts nationwide."
      },
      {
        headline: "A Refreshed Modern Look",
        badge: "MODERN UI",
        icon: "smartphone",
        desc: "Intuitive login, user request center, nearby ATM branch locator, and customer service portal."
      },
      {
        headline: "Smarter App Menu",
        badge: "50+ SERVICES",
        icon: "apps",
        desc: "Fund transfers, MFS wallet integrations (bKash & Nagad), credit card settlements, and utility payments."
      },
      {
        headline: "That Suits You",
        badge: "PERSONALIZED",
        icon: "qr_code_scanner",
        desc: "Dynamic QR code payments, personalized merchant offers, and transaction alerts."
      }
    ],
    techStack: ["Swift", "UIKit", "Alamofire", "CoreData", "REST API", "MVC", "Security Hardening", "MFS Wallet Engine"]
  },
  nbl: {
    title: "NBL Apps (NBL iPower)",
    subtitle: "National Bank Limited Mobile Banking",
    dev: "National Bank Limited",
    age: "4+",
    rating: "2.5 ★ (8)",
    category: "Finance",
    size: "54.1 MB",
    themeGradient: "linear-gradient(135deg, #052e16 0%, #15803d 60%, #22c55e 100%)",
    accentColor: "#22c55e",
    iconSvg: `<svg viewBox="0 0 256 256" class="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="nbl-modal-orange" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ff9d1e"/>
          <stop offset="100%" stop-color="#ea580c"/>
        </linearGradient>
        <linearGradient id="nbl-modal-green-tl" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#009639"/>
          <stop offset="60%" stop-color="#007a2f"/>
          <stop offset="100%" stop-color="#005822"/>
        </linearGradient>
        <linearGradient id="nbl-modal-green-tr" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#009639"/>
          <stop offset="60%" stop-color="#007a2f"/>
          <stop offset="100%" stop-color="#005822"/>
        </linearGradient>
        <linearGradient id="nbl-modal-gloss-l" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.65"/>
          <stop offset="60%" stop-color="#ffffff" stop-opacity="0.12"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </linearGradient>
        <linearGradient id="nbl-modal-gloss-r" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.65"/>
          <stop offset="60%" stop-color="#ffffff" stop-opacity="0.12"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <path d="M0 0 L108 30 C118 33 124 43 124 53 L124 116 L109 110 L109 56 C109 51 104 46 99 44 L15 20 L15 82 L0 76 Z" fill="url(#nbl-modal-orange)"/>
      <path d="M0 84 C38 103 80 115 120 118 L120 186 C82 182 40 169 0 148 Z" fill="url(#nbl-modal-green-tl)"/>
      <path d="M12 94 C46 111 82 121 114 124 C106 138 88 152 56 148 C30 144 16 122 12 94 Z" fill="url(#nbl-modal-gloss-l)"/>
      <path d="M256 84 C218 103 176 115 136 118 L136 186 C174 182 216 169 256 148 Z" fill="url(#nbl-modal-green-tr)"/>
      <path d="M244 94 C210 111 174 121 142 124 C150 138 168 152 200 148 C226 144 240 122 244 94 Z" fill="url(#nbl-modal-gloss-r)"/>
      <path d="M0 154 C38 173 80 185 120 188 L120 256 C82 252 40 239 0 218 Z" fill="url(#nbl-modal-green-tl)"/>
      <path d="M12 164 C46 181 82 191 114 194 C106 208 88 222 56 218 C30 214 16 192 12 164 Z" fill="url(#nbl-modal-gloss-l)"/>
      <path d="M256 154 C218 173 176 185 136 188 L136 256 C174 252 216 239 256 218 Z" fill="url(#nbl-modal-green-tr)"/>
      <path d="M244 164 C210 181 174 191 142 194 C150 208 168 222 200 218 C226 214 240 192 244 164 Z" fill="url(#nbl-modal-gloss-r)"/>
    </svg>`,
    tagline: "Welcome to NBL iPower &middot; Your Bank, Always With You",
    desc: "Engineered National Bank Limited's iOS mobile banking application, streamlining core transactions, NPSB payment routes, bill pay settlements, and instant account statement generation.",
    screens: [
      {
        headline: "Welcome to NBL iPower",
        badge: "SECURE ACCESS",
        icon: "login",
        desc: "Single-tap login with biometric Face/Touch ID and fast self-service registration."
      },
      {
        headline: "Forgot Your Password?",
        badge: "SAFE RESET",
        icon: "lock_reset",
        desc: "Self-recovery via OTP SMS, OTP Email, and automated security question validation."
      },
      {
        headline: "Your Bank, Always With You",
        badge: "24/7 BANKING",
        icon: "sync_alt",
        desc: "24/7 instant NPSB fund transfers, mobile recharge, and utility bill settlements."
      },
      {
        headline: "Everything In One Place",
        badge: "PORTFOLIO",
        icon: "account_balance",
        desc: "Complete portfolio view, linked cards, beneficiary management, and biometric security."
      },
      {
        headline: "Account Statement",
        badge: "EXPORT",
        icon: "description",
        desc: "Instant statement downloads in PDF format, date range customization, and direct email delivery."
      }
    ],
    techStack: ["Swift", "UIKit", "REST API", "MVC Architecture", "NPSB Routing", "PDF Generation", "AutoLayout", "Biometrics"]
  },
  aivideo: {
    title: "AIVideoGencut",
    subtitle: "AI-Powered Video Editor",
    dev: "AppExits",
    age: "4+",
    rating: "4.8 ★ (1.2k)",
    category: "Photo & Video",
    size: "62.4 MB",
    themeGradient: "linear-gradient(135deg, #3f0713 0%, #be123c 60%, #f43f5e 100%)",
    accentColor: "#f43f5e",
    iconSvg: `<svg viewBox="0 0 48 48" class="w-full h-full" fill="none"><rect width="48" height="48" rx="12" fill="#be123c"/><path d="M16 16H32V32H16V16Z" fill="#ffffff"/><circle cx="24" cy="24" r="5" fill="#be123c"/></svg>`,
    tagline: "Smart AI Cuts &middot; VisionKit &amp; AVFoundation",
    desc: "Built a high-performance native iOS video editing studio with AI auto-enhancement, scene detection, real-time filters, and hardware-accelerated video export pipeline.",
    screens: [
      {
        headline: "AI Scene Detection",
        badge: "VISIONKIT",
        icon: "auto_fix_high",
        desc: "Automatic keyframe detection and smart cropping using Apple VisionKit framework."
      },
      {
        headline: "Multi-Track Timeline",
        badge: "AVFOUNDATION",
        icon: "tune",
        desc: "Custom compositing engine supporting seamless video overlays, audio tracks, and transitions."
      },
      {
        headline: "4K Hardware Export",
        badge: "HIGH PERFORMANCE",
        icon: "bolt",
        desc: "Optimized GPU rendering pipeline achieving ultra-fast 4K ProRes and H.264 video exports."
      }
    ],
    techStack: ["Swift", "AVFoundation", "VisionKit", "CoreImage", "UIKit", "Metal Shaders"]
  },
  collage: {
    title: "Collage Studio",
    subtitle: "Creative Photo Editor &amp; Collage Maker",
    dev: "AppExits",
    age: "4+",
    rating: "4.7 ★ (850)",
    category: "Graphics & Design",
    size: "48.0 MB",
    themeGradient: "linear-gradient(135deg, #17124a 0%, #4338ca 60%, #38bdf8 100%)",
    accentColor: "#38bdf8",
    iconSvg: `<svg viewBox="0 0 48 48" class="w-full h-full" fill="none"><rect width="48" height="48" rx="12" fill="#4338ca"/><rect x="14" y="14" width="9" height="9" rx="2" fill="#ffffff"/><rect x="25" y="14" width="9" height="9" rx="2" fill="#38bdf8"/><rect x="14" y="25" width="20" height="9" rx="2" fill="#ffffff"/></svg>`,
    tagline: "Dynamic Grid Layouts &middot; Cloudinary Media Sync",
    desc: "Crafted a photo collage engine featuring dynamic grid snapping, custom stickers, rich text overlays, and seamless Cloudinary cloud synchronization.",
    screens: [
      {
        headline: "100+ Grid Templates",
        badge: "LAYOUTS",
        icon: "grid_view",
        desc: "Adaptive aspect ratios for Instagram stories, posts, and print collages."
      },
      {
        headline: "PhotosUI Integration",
        badge: "HIGH-RES",
        icon: "photo_library",
        desc: "Native modern photo picker with zero latency asset loading and CoreImage filters."
      },
      {
        headline: "Cloud Asset Pipeline",
        badge: "CLOUDINARY",
        icon: "cloud_sync",
        desc: "Instant cloud backup, asset CDN compression, and social media sharing."
      }
    ],
    techStack: ["Swift", "UIKit", "PhotosUI", "CoreImage", "Cloudinary SDK", "AutoLayout"]
  }
};

function openAppModal(appKey) {
  const data = APPS_DATA[appKey];
  if (!data) return;

  const content = document.getElementById('modal-app-content');
  if (!content) return;

  let screensHtml = data.screens.map((sc, i) => `
    <div class="device-card-frame p-4 flex flex-col justify-between" style="min-height: 280px; background: radial-gradient(120% 120% at 50% 0%, rgba(255,255,255,0.07) 0%, #13171f 100%);">
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="text-[9px] font-mono px-2 py-0.5 rounded uppercase font-bold text-white/90" style="background: ${data.accentColor}33; border: 1px solid ${data.accentColor}66;">${sc.badge}</span>
          <span class="material-symbols-outlined text-slate-400 text-[18px]">${sc.icon}</span>
        </div>
        <h4 class="text-sm font-bold text-white mb-2 leading-snug">${sc.headline}</h4>
        <p class="text-xs text-slate-300 leading-relaxed">${sc.desc}</p>
      </div>
      <div class="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] text-slate-400 font-mono">
        <span>iOS Native View</span>
        <span class="text-white font-bold">0${i + 1}</span>
      </div>
    </div>
  `).join('');

  let techPillsHtml = data.techStack.map(t => `
    <span class="px-2.5 py-1 text-xs font-mono rounded bg-white/10 text-slate-200 border border-white/10">${t}</span>
  `).join('');

  content.innerHTML = `
    <!-- App Store Header Banner -->
    <div class="p-6 rounded-2xl relative overflow-hidden" style="background: ${data.themeGradient}; box-shadow: 0 10px 30px rgba(0,0,0,0.4);">
      <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-1.5 shadow-2xl flex-shrink-0">
            ${data.iconSvg}
          </div>
          <div>
            <h2 class="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight leading-tight">${data.title}</h2>
            <p class="text-sm text-white/90 font-medium">${data.subtitle}</p>
            <p class="text-xs text-white/70 font-mono mt-1">${data.dev} &middot; Designed for iPhone & iPad</p>
          </div>
        </div>
        <div class="flex sm:flex-col items-center sm:items-end gap-2">
          <span class="px-5 py-2 rounded-full bg-white text-slate-900 font-bold text-xs uppercase tracking-wider shadow-lg">PRODUCTION APP</span>
        </div>
      </div>
    </div>

    <!-- Key Metrics Bar -->
    <div class="grid grid-cols-3 sm:grid-cols-6 gap-2 p-3 bg-white/5 rounded-xl border border-white/10 text-center">
      <div class="p-2 border-r border-white/10">
        <div class="text-[10px] uppercase font-mono text-slate-400">Rating</div>
        <div class="text-sm font-bold text-white mt-0.5">${data.rating}</div>
      </div>
      <div class="p-2 border-r border-white/10">
        <div class="text-[10px] uppercase font-mono text-slate-400">Age</div>
        <div class="text-sm font-bold text-white mt-0.5">${data.age}</div>
      </div>
      <div class="p-2 border-r border-white/10">
        <div class="text-[10px] uppercase font-mono text-slate-400">Category</div>
        <div class="text-sm font-bold text-white mt-0.5">${data.category}</div>
      </div>
      <div class="p-2 border-r border-white/10">
        <div class="text-[10px] uppercase font-mono text-slate-400">Developer</div>
        <div class="text-xs font-bold text-white mt-0.5 truncate">${data.dev}</div>
      </div>
      <div class="p-2 border-r border-white/10">
        <div class="text-[10px] uppercase font-mono text-slate-400">Language</div>
        <div class="text-sm font-bold text-white mt-0.5">EN</div>
      </div>
      <div class="p-2">
        <div class="text-[10px] uppercase font-mono text-slate-400">Size</div>
        <div class="text-sm font-bold text-white mt-0.5">${data.size}</div>
      </div>
    </div>

    <!-- Description & Tagline -->
    <div>
      <h3 class="text-lg font-bold text-white mb-2 uppercase font-sans">${data.tagline}</h3>
      <p class="text-slate-300 text-sm leading-relaxed">${data.desc}</p>
    </div>

    <!-- Screenshots Horizontal Showcase -->
    <div>
      <div class="flex items-center justify-between mb-3">
        <h4 class="text-xs font-bold uppercase font-mono text-slate-400 tracking-wider">App Screen Previews &amp; UI Architecture</h4>
        <span class="text-[11px] font-mono text-slate-400">Scroll horizontally &rarr;</span>
      </div>
      <div class="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
        ${screensHtml}
      </div>
    </div>

    <!-- Architecture & Tech Stack -->
    <div class="p-4 bg-white/5 rounded-xl border border-white/10">
      <h4 class="text-xs font-bold uppercase font-mono text-slate-400 tracking-wider mb-2">Native iOS Implementation &amp; Technologies</h4>
      <div class="flex flex-wrap gap-2">
        ${techPillsHtml}
      </div>
    </div>
  `;

  const modal = document.getElementById('appstore-modal');
  modal.style.display = 'flex';
  setTimeout(() => modal.classList.add('active'), 10);
  document.body.style.overflow = 'hidden';
}

function closeAppModal() {
  const modal = document.getElementById('appstore-modal');
  if (!modal) return;
  modal.classList.remove('active');
  setTimeout(() => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }, 250);
}

// Escape key to close modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeAppModal();
});

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

// 1. In-page anchor navigation is handled by the Lenis module in index.html
//    (lenis.scrollTo on every a[href^="#"] click).

// 2. Scroll Text Reveal — word-by-word heading reveal
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

  if (REDUCE_MOTION) {
    heading.querySelectorAll('.reveal-word').forEach(w => {
      w.style.transform = 'translateY(0)';
      w.style.opacity = '1';
    });
    return;
  }

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

  el.innerHTML = buildLine(LINE1, 0) + '<br>' + buildLine(LINE2, LINE1.length);

  const spans = Array.from(el.querySelectorAll('.sc-char[data-final]'));

  if (REDUCE_MOTION) {
    spans.forEach(span => { span.textContent = span.dataset.final; });
    return;
  }

  // — Phase 1: flicker random glyphs every 45ms —
  const flickerTimer = setInterval(() => {
    spans.forEach(span => {
      if (!span.dataset.resolved) {
        span.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        span.classList.add('scrambling');
      }
    });
  }, 45);

  // — Phase 2: resolve char-by-char once the preloader wipes away —
  let resolved = false;
  function resolve() {
    if (resolved) return;
    resolved = true;
    clearInterval(flickerTimer);
    spans.forEach((span, i) => {
      setTimeout(() => {
        span.textContent = span.dataset.final;
        span.classList.remove('scrambling');
        span.classList.add('resolving');
        span.dataset.resolved = 'true';
        setTimeout(() => span.classList.remove('resolving'), 500);
      }, i * 48);
    });
  }
  window.addEventListener('preloader:done', resolve, { once: true });
  setTimeout(resolve, 3200); // failsafe if the preloader event never fires
})();

// ═══ BINARY CODER HERO PARTICLES ═══
(function initBinaryParticles() {
  const canvas = document.getElementById('hero-canvas');
  const heroEl = document.querySelector('#hero');
  if (!canvas || !heroEl || REDUCE_MOTION) return;

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

  const particles = Array.from({ length: COUNT }, () => ({
    x: Math.random() * 1.2 - 0.1,
    y: Math.random(),
    char: Math.random() > 0.5 ? '1' : '0',
    size: Math.random() * 10 + 8,
    speed: Math.random() * 0.00015 + 0.00005,
    opacity: Math.random() * 0.45 + 0.1,
    parallaxDepth: Math.random() * 40 + 10,
    drift: (Math.random() - 0.5) * 0.00008,
    flipTimer: Math.random() * 180,
    flipInterval: Math.floor(Math.random() * 120) + 60,
  }));

  let frame = 0;
  (function animate() {
    requestAnimationFrame(animate);
    frame++;
    ctx.clearRect(0, 0, w, h);

    for (const p of particles) {
      p.y += p.speed;
      p.x += p.drift;
      if (p.y > 1.05) { p.y = -0.05; p.x = Math.random() * 1.2 - 0.1; }
      if (p.x > 1.1)  p.x = -0.1;
      if (p.x < -0.1) p.x = 1.1;

      p.flipTimer--;
      if (p.flipTimer <= 0) {
        p.char = p.char === '0' ? '1' : '0';
        p.flipTimer = p.flipInterval + Math.floor(Math.random() * 60);
      }

      const pulse = 0.08 * Math.sin(frame * 0.02 + p.parallaxDepth);
      const alpha = Math.min(1, Math.max(0, p.opacity + pulse));
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

// ═══ PRELOADER — count 0→100, then wipe upward ═══
(function initLoader() {
  const screen = document.getElementById('loading-screen');
  if (!screen) return;

  const brand = screen.querySelector('.loader-brand');
  const countEl = screen.querySelector('.loader-count .num');

  const release = () => {
    screen.classList.add('hidden');
    screen.setAttribute('aria-hidden', 'true');
    if (window.lenis) window.lenis.start();
  };

  // Reduced motion → skip the intro entirely
  if (REDUCE_MOTION) {
    screen.style.display = 'none';
    release();
    return;
  }

  if (window.lenis) window.lenis.stop();
  window.scrollTo(0, 0);

  const DURATION = 2000;
  const t0 = performance.now();

  function tick(now) {
    const p = Math.min((now - t0) / DURATION, 1);
    if (countEl) countEl.textContent = Math.round(p * 100);
    if (p < 1) { requestAnimationFrame(tick); return; }

    // Fade the labels, pause, then wipe the whole screen up
    if (brand) brand.style.opacity = '0';
    const countWrap = screen.querySelector('.loader-count');
    if (countWrap) countWrap.style.opacity = '0';

    setTimeout(() => {
      screen.classList.add('wipe');                 // 0.65s cubic-bezier(0.22,1,0.36,1)
      window.dispatchEvent(new Event('preloader:done')); // cue the hero scramble to resolve
      screen.addEventListener('transitionend', release, { once: true });
      setTimeout(release, 900);                     // failsafe
    }, 200 + 300);
  }
  requestAnimationFrame(tick);

  // Hard failsafe — never leave scroll locked
  setTimeout(() => { if (window.lenis) window.lenis.start(); }, 6000);
})();

// ═══ DEADPOOL AVATAR — magnetic 3D tilt + click bounce ═══
// Pairs with the existing eye-tracking + speech bubble: the whole avatar leans
// toward the pointer, and gives a little squash-and-spring on click.
(function initAvatarInteraction() {
  const wrap = document.querySelector('#about .reveal-left');
  const avatar = document.getElementById('lottie-avatar');
  if (!wrap || !avatar || REDUCE_MOTION) return;
  if (window.matchMedia('(pointer: coarse)').matches) return;

  let tX = 0, tY = 0, cX = 0, cY = 0, hovering = false, raf = null;

  function loop() {
    cX += (tX - cX) * 0.12;
    cY += (tY - cY) * 0.12;
    avatar.style.transform =
      `perspective(900px) rotateX(${(-cY).toFixed(2)}deg) rotateY(${cX.toFixed(2)}deg) scale(${hovering ? 1.03 : 1})`;
    if (Math.abs(tX - cX) > 0.01 || Math.abs(tY - cY) > 0.01) raf = requestAnimationFrame(loop);
    else raf = null;
  }
  function kick() { if (!raf) raf = requestAnimationFrame(loop); }

  wrap.addEventListener('mousemove', (e) => {
    const r = wrap.getBoundingClientRect();
    tX = ((e.clientX - r.left) / r.width - 0.5) * 16;   // ±8deg
    tY = ((e.clientY - r.top) / r.height - 0.5) * 16;
    kick();
  });
  const TILT_TRANSITION = 'filter 0.5s cubic-bezier(0.16, 1, 0.3, 1)'; // keep the B&W→color fade, drop transform easing (rAF handles it)

  wrap.addEventListener('mouseenter', () => {
    hovering = true;
    avatar.style.transition = TILT_TRANSITION;
    kick();
  });
  wrap.addEventListener('mouseleave', () => {
    hovering = false; tX = 0; tY = 0;
    kick();
  });

  avatar.addEventListener('pointerdown', () => {
    avatar.style.transition = 'transform 0.12s ease';
    avatar.style.transform += ' scale(0.94)';
    setTimeout(() => {
      avatar.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
      kick();
      setTimeout(() => { avatar.style.transition = hovering ? TILT_TRANSITION : ''; }, 500);
    }, 120);
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
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.08, ease: 'power2.out' }
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
          { opacity: 1, y: 0, duration: 0.3, stagger: 0.08, ease: 'power2.out' }
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

// ═══ REVEAL SAFETY NET ═══
// IntersectionObserver notifications can lag badly right after a smooth (Lenis)
// scroll jump. This sweep guarantees any reveal element / heading line within
// reach of the viewport ends up visible, while the observers still provide the
// nicer staggered timing whenever they fire in time.
(function initRevealSafetyNet() {
  const BLOCK_SEL = '.fade-in, .reveal, .reveal-left, .reveal-right, .stagger-item';
  let scheduled = false;

  function sweep() {
    scheduled = false;
    const vh = window.innerHeight;
    const near = (el) => {
      const r = el.getBoundingClientRect();
      return r.top < vh * 1.15 && r.bottom > -vh * 0.15;
    };

    document.querySelectorAll(BLOCK_SEL).forEach(el => {
      if (!el.classList.contains('visible') && near(el)) el.classList.add('visible');
    });

    document.querySelectorAll('h1:not([data-no-reveal]), h2').forEach(h => {
      const words = h.querySelectorAll('.reveal-word');
      if (!words.length || !near(h)) return;
      let pending = false;
      words.forEach(w => {
        if (w.style.opacity !== '1') {
          w.style.transform = 'translateY(0)';
          w.style.opacity = '1';
          pending = true;
        }
      });
      void pending;
    });
  }

  function onScroll() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(sweep);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  sweep();
  [200, 600, 1200, 2600].forEach(t => setTimeout(sweep, t));
})();
