document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURACIÓN ---
    const numeroWhatsApp = '5493456533273'; 

    // --- ELEMENTOS DEL DOM ---
    const productosContainer = document.getElementById('productos-container');
    const carritoContador = document.getElementById('carrito-contador');
    // Elementos del Modal
    const modalOverlay = document.getElementById('modal-overlay');
    const modalCarritoContainer = document.getElementById('modal-carrito-container');
    const abrirCarritoBtn = document.getElementById('abrir-carrito-btn');
    const cerrarModalBtn = document.getElementById('cerrar-modal');
    
    let carrito = [];
    let productos = [];

    // --- FUNCIONES ---

    async function cargarProductos() {
        try {
            const response = await fetch('productos.json');
            productos = await response.json();
            mostrarProductos();
        } catch (error) {
            console.error("Error al cargar los productos:", error);
        }
    }

    function mostrarProductos() {
        productosContainer.innerHTML = '';
        productos.forEach(producto => {
            const card = document.createElement('div');
            card.className = 'producto-card';
            card.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p class="precio">$${producto.precio.toFixed(2)}</p>
                <div class="producto-acciones">
                    <input type="number" class="input-cantidad" value="1" min="1" data-id="${producto.id}">
                    <button class="agregar-carrito" data-id="${producto.id}">Agregar al Pedido</button>
                </div>
            `;
            productosContainer.appendChild(card);
        });
    }

    // *** ¡BUG CORREGIDO AQUÍ! ***
    function agregarAlCarrito(e) {
        if (e.target.classList.contains('agregar-carrito')) {
            const id = parseInt(e.target.dataset.id);
            const cantidadInput = document.querySelector(`.input-cantidad[data-id="${id}"]`);
            const cantidad = parseInt(cantidadInput.value);
            
            const itemEnCarrito = carrito.find(item => item.id === id);

            if (itemEnCarrito) {
                // Si el producto ya está, solo suma la cantidad
                itemEnCarrito.cantidad += cantidad;
            } else {
                // Si es nuevo, lo añade al carrito
                const productoSeleccionado = productos.find(p => p.id === id);
                carrito.push({ ...productoSeleccionado, cantidad });
            }
            actualizarContadorCarrito();
            // Ya no llamamos a actualizarCarrito() aquí, se llamará al abrir el modal
        }
    }

    // *** ¡NUEVA FUNCIÓN! ***
    function actualizarContadorCarrito() {
        const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
        carritoContador.textContent = totalItems;
        
        if (totalItems > 0) {
            carritoContador.classList.add('visible');
        } else {
            carritoContador.classList.remove('visible');
        }
    }

    // *** FUNCIÓN MODIFICADA para renderizar dentro del modal ***
    function actualizarVistaCarritoEnModal() {
        modalCarritoContainer.innerHTML = ''; 

        if (carrito.length === 0) {
            modalCarritoContainer.innerHTML = '<p>Aún no has agregado productos a tu pedido.</p>';
            return;
        }

        const lista = document.createElement('ul');
        let total = 0;

        carrito.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${item.cantidad} x ${item.nombre}</span>
                <span>$${(item.precio * item.cantidad).toFixed(2)}</span>
            `;
            lista.appendChild(li);
            total += item.precio * item.cantidad;
        });

        modalCarritoContainer.appendChild(lista);

        const totalElement = document.createElement('p');
        totalElement.id = 'total-pedido';
        totalElement.textContent = `Total: $${total.toFixed(2)}`;
        modalCarritoContainer.appendChild(totalElement);

        const botonConfirmar = document.createElement('button');
        botonConfirmar.id = 'confirmar-pedido';
        botonConfirmar.textContent = 'Confirmar Pedido por WhatsApp';
        modalCarritoContainer.appendChild(botonConfirmar);
    }
    
    function enviarPedidoPorWhatsApp() {
        // ... (esta función se mantiene igual)
        let mensaje = '¡Hola! Quisiera hacer el siguiente pedido:\n\n';
        carrito.forEach(item => {
            mensaje += `- ${item.cantidad} ${item.unidad} de *${item.nombre}*\n`;
        });
        const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
        mensaje += `\n*Total estimado: $${total.toFixed(2)}*`;

        const mensajeCodificado = encodeURIComponent(mensaje);
        const urlWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`;

        window.open(urlWhatsApp, '_blank');
    }

    // --- LÓGICA DEL MODAL ---
    function abrirModal() {
        actualizarVistaCarritoEnModal();
        modalOverlay.classList.add('visible');
    }

    function cerrarModal() {
        modalOverlay.classList.remove('visible');
    }

    // --- EVENT LISTENERS ---
    productosContainer.addEventListener('click', agregarAlCarrito);
    abrirCarritoBtn.addEventListener('click', abrirModal);
    cerrarModalBtn.addEventListener('click', cerrarModal);
    
    // Cerrar modal al hacer clic en el fondo oscuro
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            cerrarModal();
        }
    });

    // Event listener para el botón de confirmar dentro del modal
    modalCarritoContainer.addEventListener('click', (e) => {
        if (e.target.id === 'confirmar-pedido') {
            enviarPedidoPorWhatsApp();
        }
    });

    // --- INICIALIZACIÓN ---
    cargarProductos();
});
