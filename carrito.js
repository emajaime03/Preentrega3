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
let carritoVacio = document.querySelector('#carrito-vacio')

let precioTotal = 0

const verificarContenido = document.getElementById('seccion-carrito-pago')
actualizarCarrito()

function actualizarCarrito() {

    if (arrayCarrito == null || arrayCarrito.length == 0) {
        verificarContenido.remove()
        listaCarrito.remove()

        let contenedor = document.createElement('div')
        contenedor.className = 'carrito-vacio'
        contenedor.innerHTML = `
        <h3>El carrito está vacio 🙁</h3>
        `
        carritoVacio.appendChild(contenedor)

    }
    else {

        precioTotal = actualizarTotal()

        agregarElementosCarrito(precioTotal)
    }
}

function agregarElementosCarrito(total) {
    arrayCarrito.forEach(producto => {
        let lista = document.createElement('li')
        lista.classList.add('carrito')
        lista.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>CANTIDAD: ${producto.cantidad}</p> 
                <p>$${producto.precio}</p>
            `
        listaCarrito.appendChild(lista)
    });

    let precio = document.createElement('div')
    precio.classList.add('carrito')
    precio.innerHTML = `
                <h3>Total: </h3>
                <p>$${total}</p>
            `
    listaCarrito.appendChild(precio)
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

if (arrayCarrito == null || arrayCarrito.length == 0) {
    verificarContenido.remove()
}

confirmarCompra.addEventListener('click', () => {
    const tarjetaInput = document.querySelector('#tarjetaInput');
    const tarjetaElegida = tarjetaInput.value;

    let tarjeta = arrayTarjetas.find((t) => t.nombre == tarjetaElegida)

    if (tarjeta != undefined) {
        localStorage.removeItem("carrito")
        arrayCarrito = []
        actualizarCarrito()
        Swal.fire({
            title: `Compra realizada`,
            text: `El total de la compra es $${calcularTotal(precioTotal, tarjeta.descuento)}`,
            icon: "success"
        });
    }
    else {
        Swal.fire({
            title: `Esa tarjeta no existe`,
            text: `Intente de nuevo`,
            icon: "error"
        });
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