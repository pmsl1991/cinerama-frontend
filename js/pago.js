// Clase para manejar el formulario de pago
class PagoFormHandler {
    constructor() {
        this.radios = document.querySelectorAll('input[name="metodo"]');
        this.billeterasDetalle = document.getElementById("billeteras-detalle");
        this.btnPagar = document.getElementById("btn-pagar");

        this.init();
    }

    init() {
        this.radios.forEach(radio => {
            radio.addEventListener("change", () => this.toggleBilleterasDetalle(radio));
        });

        this.btnPagar.addEventListener("click", (e) => this.procesarPago(e));
    }

    async procesarPago(e) {
        e.preventDefault();

        const metodoSeleccionado = document.querySelector('input[name="metodo"]:checked');
        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;

        if (!nombre || !correo || !metodoSeleccionado) {
            alert("Por favor complete todos los campos y seleccione un método de pago.");
            return;
        }

        // Armar el objeto de datos
        const datos = {
            nombre,
            correo,
            metodo_pago: metodoSeleccionado.value,
            tipo_documento: null,
            numero_documento: null,
            numero_celular: null,
            billetera_usada: null
        };

        // Si es billetera, añadir los campos
        if (metodoSeleccionado.value === "billetera") {
            const tipoDoc = document.getElementById("tipo-doc").value;
            const numeroDoc = document.getElementById("numero-doc").value;
            const telefono = document.getElementById("telefono").value;
            const billeteraUsada = document.getElementById("billetera-usada").value;

            if (!tipoDoc || !numeroDoc || !telefono || !billeteraUsada) {
                alert("Por favor complete los datos de la billetera.");
                return;
            }

            datos.tipo_documento = tipoDoc;
            datos.numero_documento = numeroDoc;
            datos.numero_celular = telefono;
            datos.billetera_usada = billeteraUsada;
        }

        // Enviar al backend
        try {
            const response = await fetch("http://localhost:3000/api/pagos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(datos)
            });

            const resultado = await response.json();
            alert(resultado.mensaje);

            // Limpiar el formulario (opcional)
            document.getElementById("form-pago").reset();
            this.billeterasDetalle.style.display = "none";

            // También limpiar la billetera seleccionada
            const billeteras = document.querySelectorAll('.opcion-pago');
            billeteras.forEach(i => i.classList.remove('seleccionada'));
            document.getElementById("billetera-usada").value = '';

        } catch (error) {
            console.error("Error al enviar el pago:", error);
            alert("Error al enviar el pago.");
        }
    }

    toggleBilleterasDetalle(radio) {
        if (radio.value === "billetera") {
            this.billeterasDetalle.style.display = "block";
        } else {
            this.billeterasDetalle.style.display = "none";
        }
    }
}


// Clase para manejar selección de billetera
class BilleteraSelector {
    constructor() {
        this.billeteras = document.querySelectorAll('.opcion-pago');
        this.inputBilletera = document.getElementById('billetera-usada');

        this.init();
    }

    init() {
        this.billeteras.forEach(img => {
            img.addEventListener('click', () => this.seleccionarBilletera(img));
        });
    }

    seleccionarBilletera(img) {
        const billeteraSeleccionada = img.getAttribute('data-billetera');
        this.inputBilletera.value = billeteraSeleccionada;

        // Marcar visualmente la selección (opcional)
        this.billeteras.forEach(i => i.classList.remove('seleccionada'));
        img.classList.add('seleccionada');

        // Mostrar solo el QR correspondiente
        document.getElementById("yapeImagenContainer").style.display = "none";
        document.getElementById("plinImagenContainer").style.display = "none";
        if (billeteraSeleccionada === "Yape") {
            document.getElementById("yapeImagenContainer").style.display = "block";
        } else if (billeteraSeleccionada === "Plin") {
            document.getElementById("plinImagenContainer").style.display = "block";
        }

    }
}

document.addEventListener("DOMContentLoaded", () => {
    new PagoFormHandler();
    new BilleteraSelector(); // inicializamos la clase para seleccionar billetera
});

