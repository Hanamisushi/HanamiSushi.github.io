
// Al principio de tu archivo script.js
let isDelivery = false; // Estado inicial del servicio a domicilio

document.addEventListener("DOMContentLoaded", ()=> {


    
  // Inicialización de Swiper
const swiper1 = new Swiper('.mySwiper-1', {
  loop: true,
  navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
  },
  pagination: {
      el: '.swiper-pagination',
      clickable: true,
  },
});

const swiper2 = new Swiper('.mySwiper-2', {
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
  });
  
  const swiper3 = new Swiper('.mySwiper-3', {
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
  });
  




let tabInputs = document.querySelectorAll(".tabInput");

tabInputs.forEach(function(input){

  input.addEventListener('change',function() {
      let id = input.ariaValueMax;
      let thisswiper = document.getElementById('swiper' + id);
      thisswiper.swiper.update();
  })
});
});



  // funciones para ordenar pedidos boton producto

const orders = {};

function openModal(productId) {
    const button = document.querySelector(`button[data-id="${productId}"]`);
    if (!button) {
        alert("No se encontró el producto.");
        return;
    }

    const productName = button.getAttribute('data-name');
    const productPrice = parseFloat(button.getAttribute('data-price'));

    // Configurar el modal con los datos del producto
    document.getElementById('modal-product').textContent = productName;
    document.getElementById('modal-quantity').value = orders[productId]?.quantity || 1;

    const modal = document.getElementById('order-modal');
    modal.setAttribute('data-product-id', productId);
    modal.setAttribute('data-product-price', productPrice);

    modal.classList.add('active');
    document.getElementById('modal-overlay').classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('order-modal');
    const overlay = document.getElementById('modal-overlay');
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

function closeOrderSummary() {
    // Cierra el modal de resumen de compra
    document.getElementById('order-summary').classList.remove('active');
    // Cierra el overlay (fondo oscuro)
    document.getElementById('modal-overlay').classList.remove('active');
}






function confirmOrder() {
    const modal = document.getElementById('order-modal');
    const productId = modal.getAttribute('data-product-id');  // Asegurarse de que usamos el ID correcto del producto
    const price = parseFloat(modal.getAttribute('data-product-price'));  // Obtener el precio
    const quantity = parseInt(document.getElementById('modal-quantity').value, 10);  // Obtener la cantidad

    if (quantity <= 0) {
        alert('La cantidad debe ser mayor a 0');
        return;
    }

    // Guardar o actualizar el pedido del producto
    orders[productId] = { quantity, price };
    updateOrderDisplay(productId);  // Actualizar la visualización
    closeModal();  // Cerrar el modal
}



// Actualizar visualización en el slider
    updateOrderDisplay(productId);
    closeModal();



function updateOrderDisplay(productId) {
    const button = document.querySelector(`button[data-id="${productId}"]`);
    let badge = button.parentElement.querySelector('.badge');

    if (!badge) {
        badge = document.createElement('span');
        badge.className = 'badge';
        button.parentElement.appendChild(badge);
    }

    badge.textContent = orders[productId]?.quantity || 0;
}



function updateOrderDisplay(productId) {
    const button = document.querySelector(`button[data-id="${productId}"]`);
    let badge = button.parentElement.querySelector('.badge');
    let cancelBtn = button.parentElement.querySelector('.cancel-btn');

    // Si no existe el badge (cantidad), creamos uno
    if (!badge) {
        badge = document.createElement('span');
        badge.className = 'badge';
        button.parentElement.insertBefore(badge, button); // Insertamos la cantidad antes del botón
    }

    badge.textContent = orders[productId]?.quantity || 0;

    // botón de cancelación
    if (!cancelBtn) {
        cancelBtn = document.createElement('button');
        cancelBtn.className = 'cancel-btn';
        cancelBtn.textContent = '×'; // Símbolo de la X
        cancelBtn.onclick = (e) => {
            e.stopPropagation(); // Evitar que se ejecute el modal al hacer clic en la X
            cancelOrder(productId);
        };
        button.parentElement.appendChild(cancelBtn); // Lo agregamos después del botón de ordenar
    }
}

function cancelOrder(productId) {
    // Eliminar el pedido del objeto orders
    delete orders[productId];

    // Buscar el producto y eliminar la cantidad y la X
    const button = document.querySelector(`button[data-id="${productId}"]`);
    const badge = button.parentElement.querySelector('.badge');
    const cancelBtn = button.parentElement.querySelector('.cancel-btn');

    // Eliminar la cantidad y la X
    if (badge) badge.remove();
    if (cancelBtn) cancelBtn.remove();
}


function showOrderSummary() {
    // Verificar si hay productos en el carrito
    if (Object.keys(orders).length === 0) {
        alert("Elige un producto");
        return;
    }

    const summaryBody = document.getElementById('order-summary-body');
    const totalDisplay = document.getElementById('order-total');

    summaryBody.innerHTML = ''; // Limpiar contenido previo
    let total = 0;

    // Agregar productos al resumen
    Object.entries(orders).forEach(([product, { quantity, price }]) => {
        const subtotal = quantity * price;
        total += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product}</td>
            <td>${quantity}</td>
            <td>$${price.toFixed(2)}</td>
            <td>$${subtotal.toFixed(2)}</td>
        `;
        summaryBody.appendChild(row);
    });

    // Mostrar el total sin costos adicionales
    totalDisplay.textContent = `$${total.toFixed(2)}`;
    document.getElementById('order-summary').classList.add('active');
    document.getElementById('modal-overlay').classList.add('active');
}





function openDeliveryForm() {
    document.getElementById('delivery-modal').classList.add('active');
    document.getElementById('modal-overlay').classList.add('active');
}


function closeDeliveryForm() {
    document.getElementById('delivery-modal').classList.remove('active');
    document.getElementById('modal-overlay').classList.remove('active');
}



function openPickupModal() {
    let total = 0;

    // Calcular el total de los productos seleccionados
    Object.entries(orders).forEach(([_, { quantity, price }]) => {
        total += quantity * price;
    });

    // Mostrar el total en el modal
    document.getElementById('pickup-total').textContent = `$${total.toFixed(2)}`;

    // Mostrar el modal
    document.getElementById('pickup-modal').classList.add('active');
    document.getElementById('modal-overlay').classList.add('active');
}


function closePickupModal() {
    document.getElementById('pickup-modal').classList.remove('active');
    document.getElementById('modal-overlay').classList.remove('active');
}


function confirmPickup() {
    const name = document.getElementById('pickup-name').value.trim();
    const time = document.getElementById('pickup-time').value.trim();

    if (!name || !time) {
        alert("Por favor, completa todos los campos antes de confirmar el pedido.");
        return;
    }

    // Calcular el total sin el costo adicional de envío
    let total = 0;
    Object.entries(orders).forEach(([product, { quantity, price }]) => {
        total += quantity * price;
    });

    // Generar el resumen de compra
    let orderDetails = "";
    Object.entries(orders).forEach(([product, { quantity, price }]) => {
        const subtotal = quantity * price;
        orderDetails += `\n- ${product} x${quantity} = $${subtotal.toFixed(2)}`;
    });

    // Crear el mensaje para WhatsApp
    const message = `
        *Pedido Recoger en Restaurante*
        \n*Nombre de quien recoge:* ${name}
        \n*Horario de recogida:* ${time}
        \n\n*Resumen de Compra:*
        ${orderDetails}
        \n\n*Total de la Compra:* $${total.toFixed(2)}
    `;

    // Número de WhatsApp
    const phoneNumber = "7491117716";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Abrir WhatsApp con el mensaje preformateado
    window.open(whatsappURL, "_blank");

    // Cerrar el modal tras confirmar
    closePickupModal();
}

function openCashPaymentModal() {
    let total = 0;

    // Calcular el total de los productos seleccionados (sin el costo extra de envío)
    Object.entries(orders).forEach(([_, { quantity, price }]) => {
        total += quantity * price;
    });

    // Mostrar el total en el modal
    document.getElementById('cash-payment-total').textContent = `$${total.toFixed(2)}`;

    // Mostrar el modal
    document.getElementById('cash-payment-modal').classList.add('active');
    document.getElementById('modal-overlay').classList.add('active');
}





function closeCashPaymentModal() {
    document.getElementById('cash-payment-modal').classList.remove('active');
    document.getElementById('modal-overlay').classList.remove('active');
}



function confirmCashPayment() {
    const billAmount = parseFloat(document.getElementById('cash-bill').value.trim());
    let total = 0;

    // Calcular el total de los productos seleccionados
    Object.entries(orders).forEach(([_, { quantity, price }]) => {
        total += quantity * price;
    });

    // Validar si la cantidad del billete es suficiente
    if (isNaN(billAmount) || billAmount < total) {
        alert("La cantidad del billete no es suficiente. Intenta con una cantidad mayor.");
        return;
    }

    // Crear el mensaje para WhatsApp
    const message = `
        *Pedido Pago en Efectivo*
        \n*Total a pagar:* $${total.toFixed(2)}
        \n*Cantidad del billete:* $${billAmount.toFixed(2)}
        \n\nGracias por tu compra.
    `;

    // Número de WhatsApp
    const phoneNumber = "7491117716";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Abrir WhatsApp con el mensaje preformateado
    window.open(whatsappURL, "_blank");

    // Cerrar el modal tras confirmar
    closeCashPaymentModal();
}

function showPromotionDetails(promoId) {
    const modal = document.getElementById('promo-modal');
    const overlay = document.getElementById('modal-overlay');
    const title = document.getElementById('promo-title');
    const description = document.getElementById('promo-description');

    // Configurar los detalles de la promoción
    if (promoId === 'promo1') {
        title.textContent = 'Promoción 1';
        description.textContent = 'Descuento del 20% en rolls seleccionados.';
    } else if (promoId === 'promo2') {
        title.textContent = 'Promoción 2';
        description.textContent = '2x1 en bebidas todos los viernes.';
    }

    // Mostrar el modal
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closePromoModal() {
    const modal = document.getElementById('promo-modal');
    const overlay = document.getElementById('modal-overlay');

    modal.classList.remove('active');
    overlay.classList.remove('active');
}















function openPaymentModal() {
    const summaryBody = document.getElementById('payment-summary-body');
    const totalDisplay = document.getElementById('payment-total');
    const deliveryCost = 30; // Costo fijo de servicio a domicilio

    summaryBody.innerHTML = ''; // Limpiar contenido previo
    let total = 0;

    // Agregar productos al resumen
    Object.entries(orders).forEach(([product, { quantity, price }]) => {
        const subtotal = quantity * price;
        total += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product}</td>
            <td>${quantity}</td>
            <td>$${price.toFixed(2)}</td>
            <td>$${subtotal.toFixed(2)}</td>
        `;
        summaryBody.appendChild(row);
    });

    // Agregar costo de servicio a domicilio
    const deliveryRow = document.createElement('tr');
    deliveryRow.innerHTML = `
        <td colspan="3" style="text-align: right; font-weight: bold;">Costo de servicio a domicilio:</td>
        <td>$${deliveryCost.toFixed(2)}</td>
    `;
    summaryBody.appendChild(deliveryRow);

    total += deliveryCost;

    // Mostrar el total
    totalDisplay.textContent = `$${total.toFixed(2)}`;
    document.getElementById('payment-modal').classList.add('active');
    document.getElementById('modal-overlay').classList.add('active');
}






function closePaymentModal() {
    document.getElementById('payment-modal').classList.remove('active');
    document.getElementById('modal-overlay').classList.remove('active');
}

function selectPaymentMethod(paymentType) {
    // Llamar a la validación antes de continuar
    if (!validateDeliveryForm()) {
        return; // Detener si no se completaron todos los campos
    }

    // Continuar el flujo si todos los campos están llenos
    if (paymentType === 'transferencia') {
        openBankTransferModal(); // Abrir modal de datos bancarios
    } else if (paymentType === 'efectivo') {
        alert("Método de pago seleccionado: Efectivo.");
        // Aquí puedes agregar lógica adicional para el pago en efectivo
    }
}



function openBankTransferModal() {
    let deliveryCost = 0; // Inicializamos el costo de envío
    let total = 0; // Total del pedido
    let totalQuantity = 0; // Cantidad total de productos

    // Calcular el total de los productos seleccionados
    Object.entries(orders).forEach(([_, { quantity, price }]) => {
        total += quantity * price;
        totalQuantity += quantity;
    });

    // Condicionar el costo extra según la cantidad total de productos
    deliveryCost = totalQuantity > 1 ? 30 : 15;

    // Sumar el costo de envío al total
    total += deliveryCost;

    // Actualizar los valores en el modal
    document.getElementById('bank-payment-total').textContent = `$${total.toFixed(2)}`;
    document.querySelector('.payment-summary p:first-child').textContent = `Costo extra por envío: $${deliveryCost}`;

    // Mostrar el modal
    document.getElementById('bank-transfer-modal').classList.add('active');
    document.getElementById('modal-overlay').classList.add('active');
}




function closeBankTransferModal() {
    document.getElementById('bank-transfer-modal').classList.remove('active');
    document.getElementById('modal-overlay').classList.remove('active');
}

function confirmBankTransfer() {
    // Obtener los datos del domicilio
    const name = document.getElementById('delivery-name').value.trim();
    const address = document.getElementById('delivery-address').value.trim();
    const references = document.getElementById('delivery-references').value.trim();

    if (!name || !address || !references) {
        alert("Por favor, completa todos los campos antes de confirmar el pedido.");
        return;
    }

    // Calcular el total y el costo de envío
    let deliveryCost = 0;
    let total = 0;
    let totalQuantity = 0;
    let orderDetails = "";

    // Generar el resumen de compra
    Object.entries(orders).forEach(([product, { quantity, price }]) => {
        const subtotal = quantity * price;
        total += subtotal;
        totalQuantity += quantity;
        orderDetails += `\n- ${product} x${quantity} = $${subtotal.toFixed(2)}`;
    });

    // Determinar el costo extra por envío
    deliveryCost = totalQuantity > 2 ? 30 : 15;
    total += deliveryCost;

    // Crear el mensaje para WhatsApp
    const message = `
        *Pedido a Domicilio*
        \n*Datos del Cliente:*
        \nNombre: ${name}
        \nDirección: ${address}
        \nReferencias: ${references}
        \n\n*Resumen de Compra:*
        ${orderDetails}
        \n\n*Costo de Envío:* $${deliveryCost}
        \n*Total a Pagar:* $${total.toFixed(2)}
    `;

    // URL para enviar el mensaje a WhatsApp
    const phoneNumber = "7491117716";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    // Abrir WhatsApp
    window.open(whatsappURL, "_blank");
}

function validateDeliveryForm() {
    const name = document.getElementById('delivery-name').value.trim();
    const address = document.getElementById('delivery-address').value.trim();
    const references = document.getElementById('delivery-references').value.trim();

    if (!name || !address || !references) {
        alert("Por favor, completa todos los campos antes de continuar.");
        return false; // Detener el flujo si falta algún campo
    }

    return true; // Todos los campos están completos
}

