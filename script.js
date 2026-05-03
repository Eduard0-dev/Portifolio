const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const header = document.getElementById("header");
const revealElements = document.querySelectorAll(".reveal");
const year = document.getElementById("year");
const form = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");
const typingElement = document.getElementById("typing");

const roles = [
  "Desenvolvedor Front e Back-End",
  "Criador de Sites Responsivos",
  "Apaixonado por Tecnologia"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentRole = roles[roleIndex];
  const currentText = currentRole.substring(0, charIndex);

  typingElement.textContent = currentText;

  if (!isDeleting && charIndex < currentRole.length) {
    charIndex++;
    setTimeout(typeEffect, 90);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(typeEffect, 50);
  } else {
    isDeleting = !isDeleting;

    if (!isDeleting) {
      roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeEffect, isDeleting ? 1200 : 300);
  }
}

typeEffect();

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
  setActiveLink();
  revealOnScroll();
});

function setActiveLink() {
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const top = window.scrollY;
    const offset = section.offsetTop - 150;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        const currentLink = document.querySelector(`.nav-link[href="#${id}"]`);
        if (currentLink) currentLink.classList.add("active");
      });
    }
  });
}

function revealOnScroll() {
  const triggerBottom = window.innerHeight * 0.88;

  revealElements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;

    if (elementTop < triggerBottom) {
      element.classList.add("visible");
    }
  });
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formMessage.textContent = "Por favor, preencha todos os campos.";
    formMessage.style.color = "#ff6b6b";
    return;
  }

  formMessage.textContent = "Mensagem enviada com sucesso! Em breve entrarei em contato.";
  formMessage.style.color = "#22c55e";

  form.reset();
});

year.textContent = new Date().getFullYear();

revealOnScroll();
setActiveLink();
