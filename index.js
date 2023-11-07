class producto {
    constructor(id, nombre, precio) {
        this.id = id
        this.nombre = nombre
        this.precio = precio
    }
}

const mesa = new producto(1, "MESA", 500)
const silla = new producto(2, "SILLA", 100)
const escritorio = new producto(3, "ESCRITORIO", 300)
const placard = new producto(4, "PLACARD", 500)
const cama = new producto(5, "CAMA", 1000)

const arrayProductos = [mesa, silla, escritorio, placard, cama]

let arrayCarrito = []

let contenedorProductos = document.querySelector('#catalogo')

arrayProductos.forEach(prod => {
    let lista = document.createElement('li')
    lista.className = 'producto'
    lista.innerHTML = `

    <h3>${prod.nombre}</h3>
    <p>$${prod.precio}</p> 
    <button class="btnAgregarCarrito botonesProductos" data-id='${prod.id}'>Agregar al carrito</button>
    `
    contenedorProductos.appendChild(lista)

})

let tarj = document.querySelector('#tarjetas')

const listaProductos = document.querySelector('#catalogo');

listaProductos.addEventListener('click', (e) => {
    if (e.target.classList.contains('btnAgregarCarrito')) {

        Toastify({

            text: "Producto agregado",

            duration: 3000

        }).showToast();

        const productoElegido = e.target.dataset.id;

        agregarCarrito(productoElegido)
    }
}
)

if (localStorage.getItem("carrito") !== null) {
    let tjsonArrayCarrito = localStorage.getItem("carrito")
    arrayCarrito = JSON.parse(tjsonArrayCarrito)
}

function agregarCarrito(productoElegido) {

    productoAgregado = arrayProductos.find((p) => p.id == productoElegido)

    if (arrayCarrito.some(producto => producto.id == productoElegido)) {
        const index = arrayCarrito.findIndex(producto => producto.id == productoElegido);
        console.log(productoElegido)
        console.log(arrayCarrito[index].id)
        arrayCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        arrayCarrito.push(productoAgregado);
    }

    let jsonArrayCarrito = JSON.stringify(arrayCarrito)

    localStorage.setItem("carrito", jsonArrayCarrito)
}