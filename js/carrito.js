let carrito = localStorage.getItem('carrito')
carrito = JSON.parse(carrito)

//DOM
const carritoVacio = document.querySelector("#carritoVacio")
const vaciar = document.querySelector('#vaciar')
const contenedorCarrito = document.querySelector("#contenedorCarrito")
const productosInfo = document.querySelector('#containerProductos')
const accionesCarrito = document.querySelector("#accionesCarrito")

const productosEnCarrito = () =>{

    if (carrito && carrito.length > 0){
        carritoVacio.classList.add('desactivado')
        contenedorCarrito.classList.remove('desactivado')
        productosInfo.classList.remove('desactivado')
        accionesCarrito.classList.remove('desactivado')

        contenedorCarrito.innerHTML = " "
        carrito.forEach(producto => {
            const div = document.createElement('div')
            div.classList.add("row", "justify-content-center")
            div.innerHTML= `
            <div class="col-2 border fs-5 text-center"><img class="imagenesCarrito " src="${producto.imagen}" alt="${producto.nombre}"></div>
            <div class="col-2 border fs-5 text-center">${producto.nombre}</div>
            <div class="col-2 border fs-5 text-center">${producto.cantidad}</div>
            <div class="col-2 border fs-5 text-center">$${producto.precio*producto.cantidad}</div>
            `
            contenedorCarrito.append(div)
        });
    }else{
        carritoVacio.classList.remove('desactivado')
        contenedorCarrito.classList.add('desactivado')
        productosInfo.classList.add('desactivado')
        accionesCarrito.classList.add('desactivado')

    }
        
}   
productosEnCarrito()

function guardarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

vaciar.addEventListener("click", () => {
    const confirmacion = confirm("¿Estás seguro de que deseas vaciar el carrito?");
    if (confirmacion) {
        vaciarCarrito();
    }
});
function vaciarCarrito() {
    carrito = []; 
    productosEnCarrito(); 
    guardarCarritoEnLocalStorage(); 
    
}








