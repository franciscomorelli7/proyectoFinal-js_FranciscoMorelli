let productos = [];

fetch("./js/productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        productosEnVenta(productos);
    })

const containerDeProductos = document.querySelector("#productos")
const categories = document.querySelectorAll(".categorias")
const botonTodos = document.querySelector("#todosLosProductos")
const botonCarrito = document.querySelector("#carrito")

let carrito = [];
const contadorCarrito = document.querySelector('#cart-count')

const productosEnVenta = (cargarProducto) => {
    containerDeProductos.innerHTML = " "

    cargarProducto.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("product", "col-2")
        div.innerHTML =
            `<div class="elementoProducto ">
                <img class="imagenProducto" src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre} </h3>
                <p>$${producto.precio}</p>
                <button class="botonAgregarProducto btn" id="${producto.id}">Agregar</button>
            </div>
`;
        containerDeProductos.append(div);
    });
    actualizarContadorCarrito()
    agregar()
    
}

productosEnVenta(productos)


categories.forEach(categoria => {
    categoria.addEventListener("click", () => {
        const categoriaSeleccionada = categoria.textContent;
        mostrarProductosPorCategoria(categoriaSeleccionada);
    });
});

function mostrarProductosPorCategoria(categoria) {
    const productosFiltrados = productos.filter(producto => producto.categoria === categoria);
    productosEnVenta(productosFiltrados);
}


botonTodos.addEventListener("click", () => {
    mostrarTodosLosProductos();
});
function mostrarTodosLosProductos() {
    productosEnVenta(productos);
}
//Agregar productos al carrito

function agregarAlCarrito(evento) {
    const idBoton= evento.target.id;
    const productoAgregado = productos.find (producto => producto.id === idBoton);
    if(carrito.some(producto=> producto.id === idBoton)){
       const index = carrito.findIndex (producto => producto.id === idBoton)
       carrito[index].cantidad++;
    }else{
        productoAgregado.cantidad = 1;
        carrito.push(productoAgregado);
    }
    actualizarContadorCarrito()
  localStorage.setItem("carrito", JSON.stringify(carrito));
}



//actualizar contador
function actualizarContadorCarrito() {
  contadorCarrito.innerText = carrito.length;
}


function agregar(){
let botonAgregar = document.querySelectorAll(".botonAgregarProducto")
    botonAgregar.forEach(btn=>{
        btn.addEventListener("click",agregarAlCarrito)
    })
}



function cargarCarritoLocalStorage() {
  let carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
      carrito = JSON.parse(carritoGuardado);
  }
}
cargarCarritoLocalStorage()























