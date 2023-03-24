////////// RESPONSIVE MENU ////////// 
const openMenu = document.querySelector(".open-menu");
const closeMenu = document.querySelector(".close-menu");
const navbar = document.querySelector("nav .navbar");
const navLinks = document.querySelectorAll(".navbar a");

openMenu.addEventListener('click', () => {
  navbar.classList.add("active");
});

closeMenu.addEventListener('click', () => {
  navbar.classList.remove("active");
});

navLinks.forEach((e) => {
  e.addEventListener('click', () => {
    navbar.classList.remove("active");
  })
});

////////// CV //////////
const cv = document.getElementById("cv");
const modalCV = document.getElementById("modal-cv");
const closeModalCV = document.getElementById("close-modal-cv");
const downloadCV = document.getElementById("download-cv");

cv.addEventListener("click", () => {
  modalCV.classList.add("active");
})

closeModalCV.addEventListener("click", () => {
  modalCV.classList.remove("active");
})

downloadCV.addEventListener("click", () => {
  modalCV.classList.remove("active");
  navbar.classList.remove("active");
})

////////// ACTIVE LINK WITH SCROLL //////////
const navlinks = document.querySelectorAll('.nav-link')
const sections = document.querySelectorAll('section')

function activeLinks() {
  let len = sections.length;
  while (--len && window.scrollY + 97 < sections[len].offsetTop) { }
  navlinks.forEach(link => link.classList.remove("active"));
  navlinks[len].classList.add("active");
}

activeLinks();
window.addEventListener("scroll", activeLinks);

////////// SCROLL TO TOP //////////
const scrollTopBtn = document.querySelector(".scrollToTop-Btn");

window.addEventListener("scroll", function () {
  scrollTopBtn.classList.toggle("active", window.scrollY > 500);
});

////////// CONTACT //////////
const contactSection = document.getElementById("contact");
const form = document.getElementById("form");
const inputs = document.querySelectorAll("#form input");

const inputName = document.getElementById("input-name");
const inputEmail = document.getElementById("input-email");
const textarea = document.getElementById("textarea");

const alertName = document.getElementById("alert-name");
const alertEmail = document.getElementById("alert-email");
const alertMessage = document.getElementById("alert-message");

const modalContact = document.getElementById("modal-contact");
const modalContactLoader = document.getElementById("modal-contact-loader");
const modalContactSuccess = document.getElementById("modal-contact-success");
const modalContactError = document.getElementById("modal-contact-error");
const closeModalContact = document.querySelectorAll(".close-modal-contact");

/* Regular Expressions */
const expName = /^[\S][\DÀ-ÿ\s]{1,30}$/
const expEmail = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{4,63}\.){1,125}(com|net|org|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)\b$/i;
const expMessage = /^[\S][0-9a-zA-ZÀ-ÿ\s\,.¡!¿?]{3,1000}$/

const campos = {
  nombre: false,
  correo: false,
  mensaje: false
}

/* Validate Regular Expressions */
function validateRegularExpressions(e) {
  switch (e.target.id) {

    case "input-name":
      if (expName.test(e.target.value)) {
        alertName.classList.remove("active");
        campos.nombre = true;
      }
      else {
        alertName.classList.add("active");
        campos.nombre = false;
      }
      break;

    case "input-email":
      if (expEmail.test(e.target.value)) {
        alertEmail.classList.remove("active");
        campos.correo = true;
      }
      else {
        alertEmail.classList.add("active");
        campos.correo = false;
      }
      break;

    case "textarea":
      if (expMessage.test(e.target.value)) {
        alertMessage.classList.remove("active");
        campos.mensaje = true;
      }
      else {
        alertMessage.classList.add("active");
        campos.mensaje = false;
      }
      break;
  }
}

/* Replace white spaces on the input email */
inputEmail.addEventListener("input", () => {
  inputEmail.value = inputEmail.value.replace(/ /g, "");
})

/* Inputs focus, keyup and blur */
inputs.forEach((input) => {
  input.addEventListener('focus', validateRegularExpressions);
  input.addEventListener('keyup', validateRegularExpressions);
  input.addEventListener('blur', validateRegularExpressions);
});

/* Textarea focus, keyup and blur */
textarea.addEventListener('focus', validateRegularExpressions);
textarea.addEventListener('keyup', validateRegularExpressions);
textarea.addEventListener('blur', validateRegularExpressions);

/* Submit */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!campos.nombre) {
    alertName.classList.add('active');
    location.href = "#form";
  }

  if (!campos.correo) {
    alertEmail.classList.add('active');
    location.href = "#form";
  }

  if (!campos.mensaje) {
    alertMessage.classList.add('active');
    location.href = "#form";
  }

  if (campos.nombre && campos.correo && campos.mensaje) {

    modalContact.classList.add("active");

    emailjs.sendForm('service_6amenkj', 'template_7k243fa', '#form', 'H-cHBYlxpsa9ToTKk').then(() => {
      setTimeout(() => {
        modalContactLoader.style.display = "none";
        modalContactSuccess.style.display = "block";
        form.reset();
      }, 3000);
    },

      (error) => {
        setTimeout(() => {
          modalContactLoader.style.display = "none";
          modalContactError.style.display = "block";
          form.reset();
        }, 3000);
        console.log(error);
      })
  }
});

////////// CLOSE MODAL CONTACT //////////
closeModalContact.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.remove("active");
    location.href = "index.html"
  })
});