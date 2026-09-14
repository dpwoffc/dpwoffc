const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector(".theme-icon");

const savedTheme = localStorage.getItem("dpwoffc-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
const initialTheme = savedTheme || preferredTheme;

document.documentElement.dataset.theme = initialTheme;

const updateThemeButton = () => {
  const light = document.documentElement.dataset.theme === "light";
  if (themeIcon) themeIcon.textContent = light ? "☾" : "☼";
  themeToggle?.setAttribute("aria-label", light ? "Aktifkan tema gelap" : "Aktifkan tema terang");
  themeToggle?.setAttribute("title", light ? "Tema gelap" : "Tema terang");
};

updateThemeButton();

themeToggle?.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  localStorage.setItem("dpwoffc-theme", next);
  updateThemeButton();
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const sections = [...document.querySelectorAll("main section[id]")];
const links = [...document.querySelectorAll(".nav-links a")];

const updateActiveLink = () => {
  const y = window.scrollY + 130;
  let current = "home";

  for (const section of sections) {
    if (y >= section.offsetTop) current = section.id;
  }

  links.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
  });
};

window.addEventListener("scroll", updateActiveLink, { passive: true });
updateActiveLink();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();
