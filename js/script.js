class Slider {
    constructor(selector, interval = 3000) {
        this.slides = document.querySelectorAll(`${selector} .slide`);
        this.currentSlide = 0;
        this.interval = interval;
        this.start();
    }

    showSlide(index) {
        this.slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.showSlide(this.currentSlide);
    }

    start() {
        this.showSlide(this.currentSlide);
        setInterval(() => this.nextSlide(), this.interval);
    }
}

// Inicialización
const slider = new Slider('.slider');


// Menú hamburguesa
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open'); // 🔥 Esto es lo que hace que el slider se mueva
});

class CineramaLogin {
  constructor() {
    this.modal = document.getElementById("loginModal");
    this.emailForm = document.getElementById("loginForm");
    this.verifyForm = document.getElementById("verifyForm");
    this.logo = document.getElementById("logo-cinerama");

    this.backendUrl = "https://backend-cinerama.onrender.com";


    this.inicializarEventos();
  }

  inicializarEventos() {
    if (this.logo) {
      this.logo.addEventListener("click", () => this.abrirModal());
    }

    if (this.emailForm) {
      this.emailForm.addEventListener("submit", (e) => this.enviarCodigo(e));
    }

    if (this.verifyForm) {
      this.verifyForm.addEventListener("submit", (e) => this.verificarCodigo(e));
    }
  }

  abrirModal() {
    this.modal.style.display = "block";
  }

  cerrarModal() {
    this.modal.style.display = "none";
  }

  async enviarCodigo(e) {
    e.preventDefault();

    try {
        const response = await fetch(`${this.backendUrl}/api/login/send-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
        });

        if (response.ok) {
        alert("Código enviado al correo");
        this.emailForm.style.display = "none";
        this.verifyForm.style.display = "block";
        } else {
        alert("Error al enviar el código");
        }
    } catch (error) {
        console.error(error);
        alert("Error en la conexión con el servidor");
    }
  }
}

// Instanciar al final de tu script
document.addEventListener("DOMContentLoaded", () => {
  new CineramaLogin();
});

