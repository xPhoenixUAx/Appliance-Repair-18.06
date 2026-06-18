(function () {
  const config = window.SITE_CONFIG || {};
  const services = window.SERVICES || [];
  const year = new Date().getFullYear();

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  function serviceUrl(slug) {
    return `${slug}.html`;
  }

  function icon(name) {
    return `<i class="${name}" aria-hidden="true"></i>`;
  }

  function groupedServices() {
    return services.reduce((groups, service) => {
      const key = service.category || "Services";
      groups[key] = groups[key] || [];
      groups[key].push(service);
      return groups;
    }, {});
  }

  function hydrateConfig() {
    if (document.title.includes("Appliance Care Connect")) {
      document.title = document.title.replaceAll("Appliance Care Connect", config.companyName || "Appliance Repair");
    }

    $$("[data-company-name]").forEach((el) => (el.textContent = config.companyName));
    $$("[data-logo-text]").forEach((el) => (el.textContent = config.logoText || config.companyName));
    $$("[data-company-legal-name]").forEach((el) => (el.textContent = config.companyLegalName));
    $$("[data-company-id]").forEach((el) => (el.textContent = config.companyId));
    $$("[data-company-address]").forEach((el) => (el.textContent = `${config.addressLine1}, ${config.addressLine2}`));
    $$("[data-phone-text]").forEach((el) => (el.textContent = config.phoneDisplay));
    $$("[data-phone-label]").forEach((el) => (el.textContent = config.phoneButtonLabel));
    $$("[data-email-text]").forEach((el) => (el.textContent = config.email));
    $$("[data-website]").forEach((el) => (el.textContent = config.website));
    $$("[data-cta-primary]").forEach((el) => (el.textContent = config.ctaPrimary));
    $$("[data-cta-secondary]").forEach((el) => (el.textContent = config.ctaSecondary));
    $$("[data-footer-text-primary]").forEach((el) => (el.textContent = config.footerTextPrimary));
    $$("[data-footer-text-secondary]").forEach((el) => (el.textContent = config.footerTextSecondary));
    $$("[data-disclaimer-short]").forEach((el) => (el.textContent = config.disclaimerShort));
    $$("[data-disclaimer-full]").forEach((el) => (el.textContent = config.disclaimerFull));
    $$("[data-footer-disclaimer]").forEach((el) => (el.textContent = config.footerDisclaimer));
    $$("[data-service-area]").forEach((el) => (el.textContent = config.serviceArea));
    $$("[data-business-hours]").forEach((el) => (el.textContent = config.businessHours));
    $$("[data-copyright-line]").forEach((el) => (el.textContent = `© ${year} ${config.companyName}. ${config.copyrightLine}`));
    $$("[data-footer-company-line]").forEach((el) => (el.textContent = `${config.companyName} - ${config.addressLine1}, ${config.addressLine2} - ${config.companyId}`));
    $$("[data-year]").forEach((el) => (el.textContent = year));
    $$("[data-phone-link]").forEach((el) => el.setAttribute("href", `tel:${config.phone}`));
    $$("[data-email-link]").forEach((el) => el.setAttribute("href", `mailto:${config.email}`));
    $$("[data-website-link]").forEach((el) => el.setAttribute("href", `https://${config.website}`));
  }

  function buildHeader() {
    const mount = $("#site-header");
    if (!mount) return;
    const groups = groupedServices();
    const dropdown = Object.entries(groups).map(([group, items]) => `
      <div class="service-menu-group">
        <strong>${group}</strong>
        <div class="service-menu-items">
          ${items.map((item) => `<a href="${serviceUrl(item.slug)}">${icon(item.icon)}<span>${item.title}</span></a>`).join("")}
        </div>
      </div>
    `).join("");

    mount.innerHTML = `
      <div class="topline">
        <div class="container topline-inner">
          <a class="top-phone" data-phone-link href="#"> <span data-phone-label></span> <strong data-phone-text></strong></a>
          <div class="top-meta">
            <a data-email-link href="#"><i class="fa-regular fa-envelope" aria-hidden="true"></i><span data-email-text></span></a>
            <span><i class="fa-regular fa-clock" aria-hidden="true"></i><span data-business-hours></span></span>
          </div>
        </div>
      </div>
      <div class="nav-shell">
        <div class="container nav-inner">
          <a class="brand" href="index.html" aria-label="Home">
            <span class="brand-mark"><i class="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i></span>
            <span class="brand-text" data-logo-text></span>
          </a>
          <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false">
            <span></span><span></span><span></span>
          </button>
          <nav class="main-nav" aria-label="Main navigation">
            <a href="index.html">Home</a>
            <div class="nav-dropdown">
              <a href="services.html" class="dropdown-trigger">Services</a>
              <div class="services-dropdown">${dropdown}</div>
            </div>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
            <a class="nav-quote" href="contact.html"><span data-cta-primary></span><i class="fa-solid fa-arrow-right" aria-hidden="true"></i></a>
          </nav>
        </div>
      </div>
      <div class="mobile-panel">
        <a href="index.html">Home</a>
        <button class="mobile-services" type="button" aria-expanded="false">Services <i class="fa-solid fa-chevron-down" aria-hidden="true"></i></button>
        <div class="mobile-service-list">
          ${services.map((item) => `<a href="${serviceUrl(item.slug)}">${icon(item.icon)}${item.title}</a>`).join("")}
        </div>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
        <a class="mobile-call" data-phone-link href="#"><i class="fa-solid fa-phone" aria-hidden="true"></i><span data-phone-text></span></a>
      </div>
    `;
  }

  function buildFooter() {
    const mount = $("#site-footer");
    if (!mount) return;
    mount.innerHTML = `
      <div class="container footer-grid">
        <div>
          <a class="brand footer-brand" href="index.html">
            <span class="brand-mark"><i class="fa-solid fa-screwdriver-wrench" aria-hidden="true"></i></span>
            <span class="brand-text" data-logo-text></span>
          </a>
          <p data-footer-text-primary></p>
          <p class="footer-company-line" data-footer-company-line></p>
        </div>
        <div>
          <h3>Services</h3>
          <ul>${services.slice(0, 6).map((s) => `<li><a href="${serviceUrl(s.slug)}">${s.title}</a></li>`).join("")}</ul>
        </div>
        <div>
          <h3>Contact</h3>
          <ul>
            <li><a data-phone-link href="#"><i class="fa-solid fa-phone" aria-hidden="true"></i><span data-phone-text></span></a></li>
            <li><a data-email-link href="#"><i class="fa-regular fa-envelope" aria-hidden="true"></i><span data-email-text></span></a></li>
            <li><a data-website-link href="#"><i class="fa-solid fa-globe" aria-hidden="true"></i><span data-website></span></a></li>
            <li><i class="fa-solid fa-location-dot" aria-hidden="true"></i><span data-company-address></span></li>
          </ul>
        </div>
        <div>
          <h3>Legal pages</h3>
          <ul>
            <li><a href="privacy.html">Privacy Policy</a></li>
            <li><a href="terms.html">Terms & Conditions</a></li>
            <li><a href="cookie-policy.html">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      <div class="container footer-disclaimer">
        <p data-footer-disclaimer></p>
        <p data-copyright-line></p>
      </div>
    `;
  }

  function buildServiceCards() {
    $$("[data-services-grid]").forEach((mount) => {
      mount.innerHTML = services.map((service) => `
        <a class="service-card reveal" href="${serviceUrl(service.slug)}">
          <span class="service-thumb" style="--thumb:url('${service.image}')" aria-hidden="true"></span>
          <span class="box-icon">${icon(service.icon)}</span>
          <span>
            <strong>${service.title}</strong>
            <small>${service.short}</small>
          </span>
        </a>
      `).join("");
    });
  }

  function buildServiceDirectory() {
    const mount = $("[data-service-directory]");
    if (!mount) return;
    const groups = groupedServices();
    mount.innerHTML = Object.entries(groups).map(([group, items]) => `
      <section class="directory-group reveal">
        <div>
          <span class="eyebrow">${group}</span>
          <h2>${group} Repair Services</h2>
        </div>
        <div class="directory-links">
          ${items.map((service) => `
            <a href="${serviceUrl(service.slug)}">
              <span class="directory-thumb" style="--thumb:url('${service.image}')" aria-hidden="true"></span>
              ${icon(service.icon)}
              <span><strong>${service.title}</strong><small>${service.short}</small></span>
              <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </a>
          `).join("")}
        </div>
      </section>
    `).join("");
  }

  function buildServicePage() {
    const mount = $("[data-service-page]");
    if (!mount) return;
    const slug = document.body.dataset.serviceSlug;
    const service = services.find((item) => item.slug === slug) || services[0];
    document.title = `${service.title} | ${config.companyName}`;
    const related = service.related.map((slug) => services.find((item) => item.slug === slug)).filter(Boolean);
    const list = (items, className = "check-list") => `<ul class="${className}">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
    mount.innerHTML = `
      <section class="page-hero service-hero" style="--hero-image:url('${service.image}')">
        <div class="container page-hero-inner">
          <span class="eyebrow">${service.eyebrow}</span>
          <h1>${service.title}</h1>
          <p>${service.intro}</p>
          <a class="btn btn-red" href="contact.html">${config.ctaSecondary}</a>
        </div>
      </section>
      <section class="section">
        <div class="container service-intro-layout">
          <div class="service-copy reveal">
            <span class="eyebrow">Service overview</span>
            <h2>What this repair request covers</h2>
            <p>${service.overview}</p>
            <p>${service.intro}</p>
          </div>
          <div class="service-detail-photo reveal" style="--service-detail:url('${service.detailImage}')" aria-label="${service.title} diagnostic detail image"></div>
        </div>
      </section>
      <section class="section muted">
        <div class="container rich-grid">
          <div class="info-card reveal">
            <span class="eyebrow">Common symptoms</span>
            <h2>Signs this service may fit</h2>
            ${list(service.symptoms)}
          </div>
          <div class="content-panel reveal">
            <span class="eyebrow">What is included</span>
            <h2>Practical repair support for the whole issue</h2>
            ${list(service.included)}
          </div>
          <div class="info-card reveal">
            <span class="eyebrow">Likely causes</span>
            <h2>What may be behind the problem</h2>
            ${list(service.causes)}
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container detail-grid">
          <div class="content-panel blue-panel reveal">
            <span class="eyebrow">Diagnostic checklist</span>
            <h2>What a provider may inspect</h2>
            ${list(service.diagnostics, "plain-list")}
          </div>
          <div class="content-panel reveal">
            <span class="eyebrow">Good fit when</span>
            <h2>Common situations we can route</h2>
            ${list(service.bestFor)}
          </div>
        </div>
      </section>
      <section class="section muted">
        <div class="container">
          <div class="section-head">
            <span class="eyebrow">Service flow</span>
            <h2>How the repair request moves forward</h2>
          </div>
          <div class="process-grid">${service.process.map((step, index) => `<div class="process-card reveal"><span>${index + 1}</span><p>${step}</p></div>`).join("")}</div>
        </div>
      </section>
      <section class="section">
        <div class="container detail-grid">
          <div>
            <span class="eyebrow">Appliance types</span>
            <h2>Equipment this service may cover</h2>
            <div class="pill-list">${service.options.map((item) => `<span>${item}</span>`).join("")}</div>
          </div>
          <div>
            <span class="eyebrow">Before the visit</span>
            <h2>Details that help</h2>
            ${list(service.details)}
          </div>
        </div>
      </section>
      <section class="section muted">
        <div class="container rich-grid">
          <div class="info-card danger-card reveal">
            <span class="eyebrow">Urgent signs</span>
            <h2>Do not ignore these conditions</h2>
            ${list(service.urgency)}
          </div>
          <div class="info-card reveal">
            <span class="eyebrow">Cost factors</span>
            <h2>What can affect repair scope</h2>
            ${list(service.costFactors)}
          </div>
          <div class="info-card reveal">
            <span class="eyebrow">Limits</span>
            <h2>What to confirm before hiring</h2>
            ${list(service.limits)}
          </div>
        </div>
      </section>
      <section class="section muted">
        <div class="container faq-list">
          <div class="section-head">
            <span class="eyebrow">Questions</span>
            <h2>${service.title} FAQ</h2>
          </div>
          ${service.faqs.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}
        </div>
      </section>
      <section class="service-cta-band">
        <div class="container service-cta-inner">
          <div>
            <span class="eyebrow">Ready to describe the issue?</span>
            <h2>Send the appliance type, symptoms, and timing.</h2>
            <p>Use the contact form to share what changed, any error codes, whether there is leaking, heat, noise, or safety concern, and the best way to reach you.</p>
          </div>
          <a class="btn btn-red" href="contact.html">${config.ctaPrimary}</a>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <div class="section-head">
            <span class="eyebrow">Related services</span>
            <h2>More appliance repair help</h2>
          </div>
          <div class="services-grid compact">${related.map((item) => `<a class="service-card" href="${serviceUrl(item.slug)}"><span class="service-thumb" style="--thumb:url('${item.image}')" aria-hidden="true"></span><span class="box-icon">${icon(item.icon)}</span><span><strong>${item.title}</strong><small>${item.short}</small></span></a>`).join("")}</div>
        </div>
      </section>
    `;
  }

  function initInteractions() {
    const header = $("#site-header");
    const updateSticky = () => header && header.classList.toggle("is-sticky", window.scrollY > 70);
    updateSticky();
    window.addEventListener("scroll", updateSticky, { passive: true });

    const toggle = $(".menu-toggle");
    const panel = $(".mobile-panel");
    if (toggle && panel) {
      toggle.addEventListener("click", () => {
        const open = panel.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
      });
    }

    const mobileServices = $(".mobile-services");
    const serviceList = $(".mobile-service-list");
    if (mobileServices && serviceList) {
      mobileServices.addEventListener("click", () => {
        const open = serviceList.classList.toggle("open");
        mobileServices.setAttribute("aria-expanded", String(open));
      });
    }

    $$(".faq-accordion details, .faq-list details").forEach((details) => {
      details.addEventListener("toggle", () => {
        if (!details.open) return;
        $$(".faq-accordion details, .faq-list details").forEach((other) => {
          if (other !== details) other.open = false;
        });
      });
    });

    const cookie = $(".cookie-banner");
    const key = `${(config.companyName || "site").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-cookie-choice`;
    if (cookie && !localStorage.getItem(key)) {
      cookie.classList.add("show");
      document.body.classList.add("cookie-open");
    }
    $$("[data-cookie-choice]").forEach((button) => {
      button.addEventListener("click", () => {
        localStorage.setItem(key, button.dataset.cookieChoice);
        cookie && cookie.classList.remove("show");
        document.body.classList.remove("cookie-open");
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.16 });
    $$(".reveal").forEach((el) => observer.observe(el));

    const form = $("#lead-form");
    if (form) {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const message = $("#form-success");
        if (message) {
          message.textContent = config.formSuccess.replace(config.companyName, config.companyName).replace(config.email, config.email);
          message.hidden = false;
        }
        form.reset();
      });
    }
  }

  function fillServiceSelect() {
    const select = $("#service-select");
    if (!select) return;
    select.innerHTML = `<option value="">Select a service</option>` + services.map((service) => `<option value="${service.slug}">${service.title}</option>`).join("");
  }

  function init() {
    buildHeader();
    buildFooter();
    buildServiceCards();
    buildServiceDirectory();
    buildServicePage();
    fillServiceSelect();
    hydrateConfig();
    initInteractions();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
