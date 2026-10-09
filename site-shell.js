(() => {
    const header = `<header class="site-header"><div class="container header-inner"><a class="brand" href="index.html#home" aria-label="Shree Aakash Travel Services home"><span class="brand-mark"><img data-logo src="assets/shree-aakash-logo.png" alt=""></span><span class="brand-name"><strong data-config="name">Shree Aakash Travel Services</strong><small>BUSINESS. LEISURE. LIFE.<br class="brand-tagline-break"> WE MOVE IT ALL.</small></span></a><button class="menu-toggle" aria-expanded="false" aria-controls="site-nav" aria-label="Open navigation"><span></span><span></span></button><nav class="site-nav" id="site-nav" aria-label="Main navigation"><a href="index.html#home">Home</a><a href="about.html">About Us</a><div class="nav-dropdown"><button class="nav-dropdown-toggle" aria-expanded="false">Services <span aria-hidden="true">▾</span></button><div class="nav-dropdown-menu"><a href="visa-service.html">Visa Service</a><a href="passport-service.html">Passport Service</a><a href="foreign-exchange.html">Foreign Exchange</a></div></div><div class="nav-dropdown"><button class="nav-dropdown-toggle" aria-expanded="false">Tour Packages <span aria-hidden="true">▾</span></button><div class="nav-dropdown-menu"><a href="domestic-tours.html">Domestic Tours</a><a href="international-tours.html">International Tours</a><a href="gujarat-tours.html">Gujarat Tours</a></div></div><a href="air-tickets.html">Air Tickets</a><a href="index.html#contact">Contact Us</a><a class="button button-small nav-cta" href="index.html#contact">Plan Your Trip <span aria-hidden="true">↗</span></a></nav></div></header>`;
    const footer = `<footer class="site-footer">
      <div class="container footer-main">
        <div class="footer-brand-group">
          <a class="brand footer-brand" href="index.html#home"><span class="brand-mark"><img data-logo src="assets/shree-aakash-logo.png" alt=""></span><span class="brand-name"><strong data-config="name">Shree Aakash Travel Services</strong><small>BUSINESS. LEISURE. LIFE.<br class="brand-tagline-break"> WE MOVE IT ALL.</small></span></a>
          <div class="footer-partner-logos" aria-label="Travel organization logos">
            <a class="footer-partner-link footer-partner-uniglobe" href="https://www.uniglobe.com/" target="_blank" rel="noopener noreferrer" aria-label="Visit Uniglobe Travel website"><img src="assets/uniglobe-logo.png" alt="Uniglobe Travel"></a>
            <a class="footer-partner-link footer-partner-iata" href="https://www.iata.org/" target="_blank" rel="noopener noreferrer" aria-label="Visit IATA website"><img src="assets/iata-agent-logo.png" alt="IATA Accredited Travel Agent"></a>
          </div>
        </div>
        <p class="footer-tagline">Business. Leisure. Life.<br>We move it all.</p>
        <div class="footer-links"><span>QUICK LINKS</span><a href="index.html#home">Home</a><a href="about.html">About Us</a><a href="services.html">Services</a><a href="tour-packages.html">Tour Packages</a><a href="air-tickets.html">Air Tickets</a><a href="index.html#contact">Contact Us</a></div>
        <div class="footer-links footer-contact-links">
          <span>GET IN TOUCH</span>
          <div class="footer-phone-list" data-phone-list></div>
          <a class="footer-contact-item" data-email-link href="index.html#contact"><span class="footer-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m4 7 8 6 8-6"></path></svg></span><span data-email-display>[ADD EMAIL ADDRESS]</span></a>
          <a class="footer-contact-item" data-instagram-link href="index.html#contact"><span class="footer-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle class="icon-fill" cx="17.5" cy="6.5" r="1"></circle></svg></span><span data-instagram-display>[ADD INSTAGRAM HANDLE]</span></a>
          <a class="footer-contact-item" data-directions href="index.html#contact"><span class="footer-contact-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"></path><circle cx="12" cy="10" r="2.5"></circle></svg></span><span>Rajkot, Gujarat · Directions</span></a>
        </div>
      </div>
      <div class="container footer-bottom"><span>© <span id="year"></span> <span data-config="name">Shree Aakash Travel Services</span>. All rights reserved.</span><span>Made for the moments along the way <b>✳</b></span></div>
    </footer>`;
    document.querySelectorAll('[data-site-header]').forEach(x => x.outerHTML = header); document.querySelectorAll('[data-site-footer]').forEach(x => x.outerHTML = footer);
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".site-nav a").forEach(link => {
        if ((link.getAttribute("href") || "").split("#")[0] === currentPage) link.setAttribute("aria-current", "page");
    });
})();
