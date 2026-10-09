(() => {
  const c = window.TRAVEL_CONFIG;
  const digits = value => String(value || "").replace(/\D/g, "");
  const whatsApp = digits(c.WHATSAPP_NUMBER);
  document.querySelectorAll('[data-config="name"]').forEach(el => el.textContent = c.name);
  document.querySelectorAll('[data-logo]').forEach(el => el.src = c.logo || "assets/shree-aakash-logo.png");
  const phoneNumbers = c.phoneNumbers || [{ display: c.phoneDisplay || "[ADD PHONE NUMBER]", tel: c.phoneTel || "" }];
  document.querySelectorAll('[data-phone-list]').forEach(list => {
    phoneNumbers.forEach(phone => {
      const item = document.createElement("span");
      item.className = "footer-contact-item";
      item.innerHTML = `<span class="footer-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.14 4.18 2 2 0 0 1 4.13 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.76a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92Z"></path></svg></span><span>${phone.display}</span>`;
      list.append(item);
    });
  });
  document.querySelectorAll('[data-phone-display]').forEach(el => el.textContent = phoneNumbers.map(phone => phone.display).join(" · "));
  document.querySelectorAll('[data-email-display]').forEach(el => el.textContent = c.email || "[ADD EMAIL ADDRESS]");
  document.querySelectorAll('[data-area-display]').forEach(el => el.textContent = c.serviceArea || "[ADD SERVICE AREA]");
  document.querySelectorAll('[data-address-display]').forEach(el => el.textContent = c.address || "[ADD BUSINESS ADDRESS]");
  document.querySelectorAll('[data-instagram-display]').forEach(el => el.textContent = c.instagramHandle || "[ADD INSTAGRAM HANDLE]");
  document.querySelectorAll('[data-phone-link]').forEach(el => { const phone = phoneNumbers[0]; if (phone?.tel) { el.href = `tel:${phone.tel}`; } else { el.href = "#contact"; el.setAttribute("aria-label", "Phone number to be added by the owner"); } });
  document.querySelectorAll('[data-email-link]').forEach(el => { if (c.email && !c.email.startsWith("[")) el.href = `mailto:${c.email}`; else el.href = "#contact"; });
  document.querySelectorAll('[data-whatsapp-link]').forEach(el => { if (whatsApp) el.href = `https://wa.me/${whatsApp}?text=${encodeURIComponent(c.whatsappMessage || "Hello, I’d like to plan a trip.")}`; else { el.href = "#contact"; el.setAttribute("aria-label", "WhatsApp number to be added by the owner"); } });
  document.querySelectorAll('[data-instagram-link]').forEach(el => { if (c.instagramUrl) { el.href = c.instagramUrl; el.target = "_blank"; el.rel = "noopener noreferrer"; } else el.href = "#contact"; });
  document.querySelectorAll('[data-google-reviews]').forEach(el => { el.href = c.googleReviewsUrl; el.target = "_blank"; el.rel = "noopener noreferrer"; });
  document.querySelectorAll('[data-directions]').forEach(el => { el.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(c.mapQuery || c.address)}`; el.target = "_blank"; el.rel = "noopener noreferrer"; });
  document.querySelectorAll('[data-rating]').forEach(el => el.textContent = c.googleRating || "[UPDATE RATING]");
  document.querySelectorAll('[data-review-count]').forEach(el => el.textContent = c.googleReviewCount || "[UPDATE COUNT]");
  const map = document.querySelector('[data-map]'); if (map) map.src = `https://maps.google.com/maps?q=${encodeURIComponent(c.mapQuery || c.address)}&output=embed`;
  const hero = document.querySelector(".hero-image"); if (hero) hero.style.backgroundImage = `url("${c.heroImage}")`;
  const serviceGrid = document.getElementById("service-grid");
  if (serviceGrid) serviceGrid.innerHTML = c.services.map((s, i) => `<article class="service-card"><span class="service-icon" aria-hidden="true">${s.icon}</span><span class="service-count">${String(i + 1).padStart(2, "0")}</span><h3>${s.title}</h3><p>${s.text}</p><details class="service-details"><summary>What to have ready</summary><p>${s.ready}</p></details><a href="${s.url || 'services.html#service-' + (i + 1)}" aria-label="Ask about ${s.title}">Learn more <span aria-hidden="true">↗</span></a></article>`).join("");
  const destinationGrid = document.getElementById("destination-grid");
  if (destinationGrid) {
    const featured = [...c.destinations.filter(d => d.type === "domestic").slice(0, 3), ...c.destinations.filter(d => d.type === "international").slice(0, 3)];
    destinationGrid.innerHTML = featured.map(d => `<article class="destination-card"><a href="destinations.html" aria-label="Explore ${d.name}"><img src="${d.image}" alt="${d.alt}" loading="lazy"><span class="destination-overlay"></span><span class="destination-content"><small>${d.region}</small><strong>${d.name}</strong><span>${d.caption}</span></span><span class="destination-arrow" aria-hidden="true">↗</span></a></article>`).join("");
  }
  const photoCredit = d => d.credit ? `<a class="photo-credit" href="${d.credit.url}" target="_blank" rel="noopener noreferrer">Photo: ${d.credit.author} · ${d.credit.license}</a>` : "";
  const tourLabels = { domestic: "INDIA · TRAVEL IDEA", gujarat: "GUJARAT · TRAVEL IDEA", international: "AROUND THE WORLD · TRAVEL IDEA" };
  const renderTourCards = type => (c.tourPackages?.[type] || []).map(d => `<article class="tour-card"><a href="index.html#contact" aria-label="Ask about a trip to ${d.name}"><img src="${d.image}" alt="${d.alt}" loading="lazy"><span class="tour-caption"><span><small>${tourLabels[type]}</small><strong>${d.name}</strong><em>${d.description}</em></span><span class="tour-arrow" aria-hidden="true">↗</span></span></a>${photoCredit(d)}</article>`).join("");
  document.querySelectorAll("[data-tour-group]").forEach(grid => { grid.innerHTML = renderTourCards(grid.dataset.tourGroup); });
  document.querySelectorAll("[data-package-group]").forEach(grid => {
    const cards = (c.tourPackages?.[grid.dataset.packageGroup] || []).map(d => {
      const url = `https://wa.me/${whatsApp}?text=${encodeURIComponent(`Hi, I'm interested in the ${d.name} tour package.`)}`;
      return `<article class="tour-card package-card"><a href="${url}" target="_blank" rel="noopener noreferrer" aria-label="Book now: ${d.name} tour package on WhatsApp"><img src="${d.image}" alt="${d.alt}" loading="lazy"><span class="tour-caption"><span><strong>${d.name}</strong><em>${d.description}</em><b class="package-book">Book Now ↗</b></span></span></a>${photoCredit(d)}</article>`;
    }).join("");
    grid.innerHTML = cards;
  });
  // Keep destination tiles visually complete if a remote photo is unavailable.
  document.querySelectorAll(".destination-card img, .tour-card img").forEach(image => {
    image.addEventListener("error", () => {
      image.src = "assets/destination-fallback.svg";
      image.classList.add("image-fallback");
    }, { once: true });
  });
  const airlineTrack = document.querySelector(".airline-track");
  if (airlineTrack) {
    const items = (c.airlines || []).map(a => `<span class="airline-item"><img src="assets/airlines/${a.file}" alt="${a.name} logo" loading="lazy"><span>${a.name}</span></span>`).join("");
    airlineTrack.innerHTML = `<div class="airline-group">${items}</div><div class="airline-group" aria-hidden="true">${items}</div>`;
  }
  const serviceDetailList = document.getElementById("service-detail-list");
  if (serviceDetailList) serviceDetailList.innerHTML = c.services.map((s, i) => `<article class="service-detail-card" id="service-${i + 1}"><span class="service-icon" aria-hidden="true">${s.icon}</span><div><small>0${i + 1} · TRAVEL SERVICE</small><h2>${s.title}</h2><p>${s.text}</p><h3>To help us get started</h3><p>${s.ready}</p><a class="text-link" href="index.html#contact">Enquire about ${s.title} <span>↗</span></a></div></article>`).join("");
  const year = document.getElementById("year"); if (year) year.textContent = new Date().getFullYear();
  const reviewList = c.googleReviews || [];
  const carousel = document.querySelector(".review-carousel");
  if (carousel) {
    let current = 0;
    const renderReview = () => {
      if (!reviewList.length) return;
      const review = reviewList[current];
      const article = document.createElement("article"); article.className = "review-slide is-active";
      const quote = document.createElement("span"); quote.className = "quote-mark"; quote.setAttribute("aria-hidden", "true"); quote.textContent = "“";
      const body = document.createElement("div");
      const stars = document.createElement("span"); stars.className = "rating-stars review-stars"; stars.setAttribute("aria-label", `${review.rating || 5} out of 5 stars`); stars.textContent = "★".repeat(Math.max(1, Math.min(5, Number(review.rating) || 5)));
      const text = document.createElement("p"); text.textContent = review.text;
      const byline = document.createElement("small"); byline.textContent = `${review.author || "Google reviewer"}${review.date ? ` · ${review.date}` : ""}`;
      body.append(stars, text, byline); article.append(quote, body); carousel.replaceChildren(article);
      const fill = document.querySelector(".review-progress-fill"); if (fill) fill.style.width = `${((current + 1) / reviewList.length) * 100}%`;
    };
    const move = direction => { if (!reviewList.length) return; current = (current + direction + reviewList.length) % reviewList.length; renderReview(); };
    const previous = document.querySelector(".review-prev"), next = document.querySelector(".review-next");
    if (previous) { previous.disabled = !reviewList.length; previous.addEventListener("click", () => move(-1)); }
    if (next) { next.disabled = !reviewList.length; next.addEventListener("click", () => move(1)); }
    renderReview();
    if (reviewList.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) window.setInterval(() => move(1), 6500);
  }
  const toggle = document.querySelector(".menu-toggle"), nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => { const open = toggle.getAttribute("aria-expanded") !== "true"; toggle.setAttribute("aria-expanded", open); toggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation"); nav.classList.toggle("is-open", open); });
    nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => { toggle.setAttribute("aria-expanded", "false"); toggle.setAttribute("aria-label", "Open navigation"); nav.classList.remove("is-open"); }));
  }
  document.querySelectorAll(".nav-dropdown-toggle").forEach(button => button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    document.querySelectorAll(".nav-dropdown-toggle").forEach(other => other.setAttribute("aria-expanded", "false"));
    button.setAttribute("aria-expanded", String(!expanded));
  }));
  document.querySelectorAll(".nav-dropdown-menu a").forEach(a => a.addEventListener("click", () => {
    document.querySelectorAll(".nav-dropdown-toggle").forEach(button => button.setAttribute("aria-expanded", "false"));
    if (nav) nav.classList.remove("is-open");
    if (toggle) toggle.setAttribute("aria-expanded", "false");
  }));
})();
