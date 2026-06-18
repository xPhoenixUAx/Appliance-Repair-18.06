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
          <a href="services.html"><i class="fa-solid fa-grid-2" aria-hidden="true"></i>All Services</a>
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
          <ul class="footer-contact-list">
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
    const groupDescriptions = {
      Laundry: "Washer and dryer issues often need quick sorting because leaks, heat problems, and vent restrictions can affect daily routines and safety.",
      Kitchen: "Cooking, cooling, and cleanup appliances are grouped here so the request can start with the right symptoms, model details, and urgency.",
      Compact: "Smaller appliances may need a practical repair-versus-replace review before time is spent on parts, diagnostics, or scheduling."
    };
    mount.innerHTML = Object.entries(groups).map(([group, items]) => `
      <section class="directory-group reveal">
        <div>
          <span class="eyebrow">${group}</span>
          <h2>${group} Repair Services</h2>
          <p>${groupDescriptions[group] || "Review the appliance type, common symptoms, and practical next steps before sending the request."}</p>
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
          <div class="service-process-grid">${service.process.map((step, index) => `<div class="service-process-step reveal"><span>${String(index + 1).padStart(2, "0")}</span><p>${step}</p></div>`).join("")}</div>
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
          ${service.faqs.map(([q, a]) => `<details><summary>${q}</summary><div class="accordion-panel"><p>${a}</p></div></details>`).join("")}
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
      const setMenuOpen = (open) => {
        panel.classList.toggle("open", open);
        document.body.classList.toggle("menu-open", open);
        toggle.setAttribute("aria-expanded", String(open));
      };
      toggle.addEventListener("click", () => {
        setMenuOpen(!panel.classList.contains("open"));
      });
      $$("a", panel).forEach((link) => {
        link.addEventListener("click", () => setMenuOpen(false));
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") setMenuOpen(false);
      });
      window.addEventListener("resize", () => {
        if (window.matchMedia("(min-width: 981px)").matches) setMenuOpen(false);
      });
    }

    const mobileServices = $(".mobile-services");
    const serviceList = $(".mobile-service-list");
    if (mobileServices && serviceList) {
      serviceList.style.height = "0px";
      mobileServices.addEventListener("click", () => {
        const open = serviceList.classList.toggle("open");
        mobileServices.setAttribute("aria-expanded", String(open));
        serviceList.style.height = open ? `${serviceList.scrollHeight}px` : "0px";
      });
    }

    const testimonial = $("[data-testimonial-slider]");
    if (testimonial) {
      const track = $(".testimonial-track", testimonial);
      const dotsMount = $(".testimonial-dots", testimonial);
      const originalSlides = $$(".testimonial-card", track);
      let index = 1;
      let timer = null;
      const speed = 5200;

      if (track && dotsMount && originalSlides.length > 1) {
        const firstClone = originalSlides[0].cloneNode(true);
        const lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);
        firstClone.setAttribute("aria-hidden", "true");
        lastClone.setAttribute("aria-hidden", "true");
        track.prepend(lastClone);
        track.append(firstClone);
        const slides = $$(".testimonial-card", track);

        const setTransform = (withTransition = true) => {
          track.style.transition = withTransition ? "transform 0.58s ease" : "none";
          track.style.transform = `translateX(-${index * 100}%)`;
        };
        const activeDot = () => {
          const realIndex = (index - 1 + originalSlides.length) % originalSlides.length;
          $$("button", dotsMount).forEach((button, dotIndex) => {
            button.classList.toggle("active", dotIndex === realIndex);
            button.setAttribute("aria-selected", String(dotIndex === realIndex));
          });
        };
        const goTo = (nextIndex) => {
          index = nextIndex;
          setTransform(true);
          activeDot();
        };
        const next = () => goTo(index + 1);
        const stop = () => {
          if (timer) window.clearInterval(timer);
          timer = null;
        };
        const start = () => {
          stop();
          timer = window.setInterval(next, speed);
        };

        originalSlides.forEach((_, dotIndex) => {
          const button = document.createElement("button");
          button.type = "button";
          button.setAttribute("aria-label", `Show testimonial ${dotIndex + 1}`);
          button.setAttribute("role", "tab");
          button.addEventListener("click", () => {
            goTo(dotIndex + 1);
            start();
          });
          dotsMount.appendChild(button);
        });

        track.addEventListener("transitionend", () => {
          if (index === slides.length - 1) {
            index = 1;
            setTransform(false);
          } else if (index === 0) {
            index = originalSlides.length;
            setTransform(false);
          }
          activeDot();
        });

        testimonial.addEventListener("mouseenter", stop);
        testimonial.addEventListener("mouseleave", start);
        testimonial.addEventListener("focusin", stop);
        testimonial.addEventListener("focusout", start);
        setTransform(false);
        activeDot();
        start();
      }
    }

    const accordionItems = $$(".faq-accordion details, .faq-list details");
    const closeAccordion = (details) => {
      const panel = $(".accordion-panel", details);
      const summary = $("summary", details);
      if (!panel || !details.open) return;
      panel.style.height = `${panel.scrollHeight}px`;
      details.classList.remove("is-open");
      summary && summary.setAttribute("aria-expanded", "false");
      requestAnimationFrame(() => {
        panel.style.height = "0px";
        panel.style.opacity = "0";
      });
      window.setTimeout(() => {
        if (!details.classList.contains("is-open")) details.open = false;
      }, 320);
    };
    const openAccordion = (details) => {
      const panel = $(".accordion-panel", details);
      const summary = $("summary", details);
      if (!panel) return;
      accordionItems.forEach((other) => {
        if (other !== details) closeAccordion(other);
      });
      details.open = true;
      details.classList.add("is-open");
      summary && summary.setAttribute("aria-expanded", "true");
      panel.style.height = "0px";
      panel.style.opacity = "0";
      requestAnimationFrame(() => {
        panel.style.height = `${panel.scrollHeight}px`;
        panel.style.opacity = "1";
      });
      window.setTimeout(() => {
        if (details.classList.contains("is-open")) panel.style.height = "auto";
      }, 320);
    };
    accordionItems.forEach((details) => {
      const summary = $("summary", details);
      let panel = $(".accordion-panel", details);
      if (!panel) {
        panel = document.createElement("div");
        panel.className = "accordion-panel";
        Array.from(details.childNodes).forEach((node) => {
          if (node !== summary) panel.appendChild(node);
        });
        details.appendChild(panel);
      }
      details.classList.add("smooth-accordion");
      summary && summary.setAttribute("aria-expanded", details.open ? "true" : "false");
      if (details.open) {
        details.classList.add("is-open");
        panel.style.height = "auto";
        panel.style.opacity = "1";
      } else {
        panel.style.height = "0px";
        panel.style.opacity = "0";
      }
      summary && summary.addEventListener("click", (event) => {
        event.preventDefault();
        if (details.open && details.classList.contains("is-open")) {
          closeAccordion(details);
        } else {
          openAccordion(details);
        }
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
      let lastSubmitButton = null;
      const getLeadModal = () => {
        let modal = $("#lead-confirmation-modal");
        if (modal) return modal;
        modal = document.createElement("div");
        modal.className = "lead-modal";
        modal.id = "lead-confirmation-modal";
        modal.setAttribute("role", "dialog");
        modal.setAttribute("aria-modal", "true");
        modal.setAttribute("aria-labelledby", "lead-modal-title");
        modal.setAttribute("aria-hidden", "true");
        modal.innerHTML = `
          <div class="lead-modal-card" role="document">
            <button class="lead-modal-close" type="button" aria-label="Close confirmation"><i class="fa-solid fa-xmark" aria-hidden="true"></i></button>
            <span class="lead-modal-icon"><i class="fa-solid fa-check" aria-hidden="true"></i></span>
            <span class="eyebrow">Request received</span>
            <h2 id="lead-modal-title">Thank you for reaching out.</h2>
            <p data-lead-modal-message></p>
            <div class="lead-modal-actions">
              <button class="btn btn-red" type="button" data-lead-modal-ok>Done</button>
              <a class="lead-modal-link" href="services.html">Review services</a>
            </div>
          </div>
        `;
        document.body.appendChild(modal);
        return modal;
      };
      const closeLeadModal = () => {
        const modal = $("#lead-confirmation-modal");
        if (!modal) return;
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
        if (lastSubmitButton) lastSubmitButton.focus();
      };
      const openLeadModal = () => {
        const modal = getLeadModal();
        const message = $("[data-lead-modal-message]", modal);
        if (message) message.textContent = config.formSuccess;
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
        const closeButton = $(".lead-modal-close", modal);
        closeButton && closeButton.focus();
      };
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        lastSubmitButton = form.querySelector('[type="submit"]');
        const message = $("#form-success");
        if (message) {
          message.hidden = true;
        }
        form.reset();
        openLeadModal();
      });
      document.addEventListener("click", (event) => {
        const modal = $("#lead-confirmation-modal.open");
        if (!modal) return;
        if (event.target === modal || event.target.closest("[data-lead-modal-ok], .lead-modal-close")) closeLeadModal();
      });
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeLeadModal();
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
