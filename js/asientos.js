class AsientosHandler {
    constructor() {
        this.seleccionado = 0;
        this.entrada = 12;
        this.butacasSeleccionadasArray = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderizarData();
        this.renderizarTextoAsientos();
    }

    setupEventListeners() {
        document.getElementById('alerta-confirmar').addEventListener('click', () => this.confirmarCompra());
        document.getElementById('alerta-continuar').addEventListener('click', () => this.cerrarModal());
        document.getElementById('btn-atras').addEventListener('click', () => this.abrirModal());
        document.querySelectorAll('.asiento-box').forEach(asiento => {
            asiento.addEventListener('click', (event) => this.toggleAsiento(event.currentTarget));
        });
        document.getElementById('btn-continuar').addEventListener('click', () => this.continuarCompra());
    }

    confirmarCompra() {
        try {
            const dataCine = JSON.parse(localStorage.getItem('dataCine'));
            localStorage.removeItem('dataCompra');
            window.location.replace(`${dataCine.url}`);
        } catch (error) {
            alert('No se encontraron datos en LocalStorage');
            console.log(error);
        }
    }

    cerrarModal() {
        document.getElementById('modal-alert-salir').classList.add('remove');
    }

    abrirModal() {
        document.getElementById('modal-alert-salir').classList.remove('remove');
    }

    renderizarData() {
        const dataCine = JSON.parse(localStorage.getItem('dataCine'));
        const horaSeleccionado = localStorage.getItem('horarioSeleccionado');
        const tipoCine = localStorage.getItem('tipoCine');

        const hoy = new Date();
        const formatear = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short', year: 'numeric' });
        const fechaActualFormateada = `Hoy, ${formatear.format(hoy)}`;

        document.getElementById('img-pelicula').src = `${dataCine.poster}`;
        document.getElementById('titulo').textContent = `${dataCine.titulo}`;
        document.getElementById('tipo-pelicula').textContent = `${tipoCine} Entrada Regular`;
        document.getElementById('fecha-actual').textContent = `📅 ${fechaActualFormateada}`;
        document.getElementById('hora').textContent = `⏱️ ${horaSeleccionado}`;
        document.getElementById('sala').textContent = `🔴 SALA ${dataCine.sala}`;
    }

    toggleAsiento(asiento) {
        const totalPagar = document.getElementById('total-pagar');
        const totalEntradas = document.getElementById('total-entrada');
        const butacasSeleccionadas = document.getElementById('butacas-seleccionadas');
        const butaca = asiento.getAttribute('data-asiento');

        if (asiento.classList.toggle('box-select')) {
            this.seleccionado++;
            this.butacasSeleccionadasArray.push(butaca);
            asiento.querySelector('.emoji-asiento').textContent = '🧍‍♂️🪑';
        } else {
            this.seleccionado--;
            const index = this.butacasSeleccionadasArray.indexOf(butaca);
            asiento.querySelector('.emoji-asiento').textContent = '🪑';
            if (index > -1) {
                this.butacasSeleccionadasArray.splice(index, 1);
            }
        }

        totalPagar.textContent = `${this.seleccionado * this.entrada}.00`;
        totalEntradas.textContent = this.seleccionado;
        butacasSeleccionadas.textContent = this.butacasSeleccionadasArray.join(', ');

        const btnContinuar = document.getElementById('btn-continuar');
        if (this.seleccionado > 0) {
            btnContinuar.classList.remove('bloquear');
            btnContinuar.disabled = false;
            btnContinuar.style.cursor = 'pointer';
        } else {
            btnContinuar.classList.add('bloquear');
            btnContinuar.disabled = true;
        }
    }

    
    continuarCompra() {
        window.location.href = 'pago.html';
    }


    renderizarTextoAsientos() {
            document.querySelectorAll('.asiento-box').forEach(asiento => {
                const codigo = asiento.getAttribute('data-asiento');
                asiento.innerHTML = `<span class="emoji-asiento">🪑</span><span class="asiento-codigo">${codigo}</span>`;
            });
        }

}

        





// Inicialización de la página de Asientos
const asientosHandler = new AsientosHandler();


