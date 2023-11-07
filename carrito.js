class tarjeta {
    constructor(id, nombre, descuento) {
        this.id = id
        this.nombre = nombre
        this.descuento = descuento
    }
}

const visa = new tarjeta(1, 'visa', 0.2)
const mastercard = new tarjeta(2, 'mastercard', 0.35)

const arrayTarjetas = [visa, mastercard]

const carritoAlmacenado = localStorage.getItem("carrito")

arrayCarrito = []

arrayCarrito = JSON.parse(carritoAlmacenado)

let listaCarrito = document.querySelector('#carrito')
let flag = 0
actualizarCarrito()

function actualizarCarrito() {

    if (arrayCarrito == null || arrayCarrito.length == 0) {

        let contenedor = document.createElement('div')
        contenedor.className = 'carrito-vacio'
        contenedor.innerHTML = `
        <h3>El carrito está vacio ;(</h3>
        `
        listaCarrito.appendChild(contenedor)
        flag = 1

    }
    else {
        arrayCarrito.forEach(producto => {
            let lista = document.createElement('li')
            lista.classList.add('carrito')
            lista.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>CANTIDAD: ${producto.cantidad}</p> 
                <p>$${producto.precio}</p>                 
                <button class="btnEliminarCarrito botonesProductos" data-id='${producto.id}'>Eliminar del carrito</button>
            `
            listaCarrito.appendChild(lista)
        });
    }
}


// PAGO -------------------------

const listaTarjetas = document.querySelector('#tarjetas')

for (let t of arrayTarjetas) {
    let tarjetas = document.createElement('li')
    tarjetas.className = 'producto'
    tarjetas.innerHTML = `

    <h3>${t.nombre}</h3>
    <p>Descuento: ${t.descuento * 100}%</p>
    `
    listaTarjetas.appendChild(tarjetas)
}

const confirmarCompra = document.getElementById('confirmarCompra')

if (arrayCarrito == null) {
    confirmarCompra.style.display = 'none'
}

confirmarCompra.addEventListener('click', () => {
    const tarjetaInput = document.querySelector('#tarjetaInput');
    const tarjetaElegida = tarjetaInput.value;

    let tarjeta = arrayTarjetas.find((t) => t.nombre == tarjetaElegida)

    if (tarjeta != undefined) {

        let precioTotal = actualizarTotal()
        alert(`El total de la compra es de $${calcularTotal(precioTotal, tarjeta.descuento)}`)
        localStorage.removeItem("carrito")
        arrayCarrito = []
        location.reload()
    }
    else {
        alert('Esa tarjeta no existe')
    }
    tarjetaInput.value = ''
})

function actualizarTotal() {
    const totalCalculado = arrayCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    return totalCalculado
}
function calcularTotal(total, tarjeta) {

    let final = total * tarjeta
    final = total - final

    return final
}

