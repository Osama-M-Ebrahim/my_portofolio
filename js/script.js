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

window.onscroll = () => {
  sections.forEach((sec) => {
    let top = window.scrollY;
    let offset = sec.offsetTop - 100;
    let height = sec.offsetHeight;
    let id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      // active navdar links
      navLinks.forEach((links) => {
        links.classList.remove("active");
        document
          .querySelector("header nav a[href*=" + id + "]")
          .classList.add("active");
      });
      // active sections for animation on scroll
      sec.classList.add("show-animate");
    } else {
      sec.classList.remove("show-animate");
    }
  });
  // sticky header
  let header = document.querySelector("header");

  header.classList.toggle("sticky", window.scrollY > 100);

  // remove hoggle icon
  menuIcon.classList.remove("bx-x");
  navbar.classList.remove("active");

  // animation footer on scroll
  let footer = document.querySelector("footer");

  footer.classList.toggle(
    "show-animate",
    this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight,
  );
};
const projectsGrid = document.querySelector("#projects-grid");

const featuredProjects = [
  {
    name: "Home Service",
    description:
      "Private home-services app focused on service booking flows, customer experience, and practical mobile product design. No public GitHub repository was available for this project.",
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
    name: "E-Commerce",
    description:
      "Flutter e-commerce application with responsive shopping experience, REST API integration, Cubit state management, cart flow, and checkout design based on the public Ecommerce_App repository.",
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
      "Islamic mobile app project focused on clean reading experience, content presentation, and user-friendly mobile interactions, based on the public Islami_APP repository.",
    repoUrl: "https://github.com/Osama-M-Ebrahim/Islami_APP",
    language: "Flutter",
    tech: ["Flutter", "Dart", "UI", "Mobile App"],
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
        `<img src="${src}" alt="${project.name} screenshot ${index + 2}" class="project-thumb" />`,
    )
    .join("");

  return `
    <article class="project-card ${project.private ? "project-card--private" : ""}">
      <div class="project-card-header">
        <span class="project-icon"><i class="bx bxl-github"></i></span>
        <span class="project-language">${project.language}</span>
      </div>
      <div class="project-media">
        <img src="${mainImage}" alt="${project.name} main screenshot" class="project-main-image" />
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
