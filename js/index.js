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
const botonAgregar = document.querySelectorAll(".botonAgregarProducto")
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


function agregarAlCarrito(producto) {
  carrito.push(producto);
  actualizarContadorCarrito()
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarContadorCarrito() {
  contadorCarrito.innerText = carrito.length;
}
 
containerDeProductos.addEventListener("click", (event) => {
  if (event.target.classList.contains("botonAgregarProducto")) {
      const productoId = event.target.id;
      const productoSeleccionado = productos.find(producto => producto.id === productoId);
      if (productoSeleccionado) {
          agregarAlCarrito(productoSeleccionado);
      }
  }
});

function cargarCarritoLocalStorage() {
  let carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
      carrito = JSON.parse(carritoGuardado);
  }
}
cargarCarritoLocalStorage()



//Botones carrito



















