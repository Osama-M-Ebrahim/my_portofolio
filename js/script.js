// navbar icon

let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// scroll section
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

const header = document.querySelector("header");
const footer = document.querySelector("footer");
const progressBar = document.querySelector("#scroll-progress");

// reveal each section once, when it enters the viewport
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show-animate");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0, rootMargin: "0px 0px -8% 0px" },
);
sections.forEach((sec) => revealObserver.observe(sec));
if (footer) revealObserver.observe(footer);

// active nav link
const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      navLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === "#" + id));
    });
  },
  { rootMargin: "-40% 0px -55% 0px" },
);
sections.forEach((sec) => navObserver.observe(sec));

// sticky header + close mobile menu (passive, one rAF per frame)
let ticking = false;
window.addEventListener(
  "scroll",
  () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      header.classList.toggle("sticky", window.scrollY > 100);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressBar.style.transform = "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";
      menuIcon.classList.remove("bx-x");
      navbar.classList.remove("active");
      ticking = false;
    });
  },
  { passive: true },
);

const projectsGrid = document.querySelector("#projects-grid");

const featuredProjects = [
  {
    name: "Home Service",
    description:
      "Home-services app (Sanei fi Baytak) for booking home maintenance services, covering the customer booking flow and service screens. Private project.",
    repoUrl: null,
    language: "Private Project",
    tech: ["Flutter", "Dart", "UI/UX", "Service Flow"],
    private: true,
    images: [
      "assets/homeService_image/Screenshot 2026-08-08 030953.png",
      "assets/homeService_image/Screenshot 2026-08-08 032108.png",
      "assets/homeService_image/Screenshot 2026-08-08 032150.png",
    ],
  },
  {
    name: "Fresco (E-Commerce)",
    description:
      "Flutter e-commerce app with product browsing, cart and checkout. Built with Cubit state management and REST API integration.",
    repoUrl: "https://github.com/Osama-M-Ebrahim/Ecommerce_App",
    language: "Flutter",
    tech: ["Flutter", "Dart", "BLoC", "REST API"],
    private: false,
    images: [
      "assets/e-commerce_image/home.jpg",
      "assets/e-commerce_image/payment.jpg",
      "assets/e-commerce_image/photo_10_2026-08-04_21-57-43.jpg",
    ],
  },
  {
    name: "Islami App",
    description:
      "Islamic mobile app with Quran, Hadith and Tasbeeh, plus a recitation checker that uses speech-to-text to catch reading mistakes. Team project.",
    repoUrl: "https://github.com/AhmedMohamedHabashi/Islami",
    language: "Flutter",
    tech: ["Flutter", "Dart", "Speech-to-Text", "Quran"],
    private: false,
    images: [
      "assets/aslami_image/Screenshot 2026-08-08 030614.png",
      "assets/aslami_image/Screenshot 2026-08-08 030654.png",
      "assets/aslami_image/Screenshot 2026-08-08 030731.png",
    ],
  },
];

const buildProjectCard = (project) => {
  const tags = project.tech
    .map((tag) => `<span class="project-tag">${tag}</span>`)
    .join("");

  const action = project.repoUrl
    ? `<a href="${project.repoUrl}" class="btn" target="_blank" rel="noreferrer">View Repo</a>`
    : `<span class="project-private">Private Repo</span>`;

  const mainImage = project.images[0];
  const thumbs = project.images
    .slice(1, 3)
    .map(
      (src, index) =>
        `<img src="${src}" alt="${project.name} screenshot ${index + 2}" class="project-thumb" loading="lazy" decoding="async" />`,
    )
    .join("");

  return `
    <article class="project-card ${project.private ? "project-card--private" : ""}">
      <div class="project-card-header">
        <span class="project-icon"><i class="bx bxl-github"></i></span>
        <span class="project-language">${project.language}</span>
      </div>
      <div class="project-media">
        <img src="${mainImage}" alt="${project.name} main screenshot" class="project-main-image" loading="lazy" decoding="async" />
        <div class="project-thumbs">${thumbs}</div>
      </div>
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <div class="project-tags">${tags}</div>
      <div class="project-actions">${action}</div>
    </article>
  `;
};

if (projectsGrid) {
  projectsGrid.innerHTML = featuredProjects.map(buildProjectCard).join("");
}

const form = document.querySelector("form");

if (form) {
  form.onsubmit = (e) => {
    e.preventDefault();

    fetch("https://formspree.io/f/mykozjjb", {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        alert("Thanks for your message! I will get back to you soon.");
        form.reset();
      } else {
        alert("Oops! There was a problem submitting your form");
      }
    });
  };
}
