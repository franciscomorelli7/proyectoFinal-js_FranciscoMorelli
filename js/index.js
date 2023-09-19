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
  actualizarContadorCarrito();
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarContadorCarrito() {
  contadorCarrito.textContent = carrito.length;
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

// Función para mostrar los productos en el carrito
function mostrarProductosEnCarrito() {
  const carritoLista = document.querySelector("#carritoLista");
  carritoLista.innerHTML = ""; // Limpiar la lista antes de mostrar los productos

  const productosAgrupados = agruparProductosPorNombre(carrito);

  productosAgrupados.forEach(producto => {
      const li = document.createElement("li");
      const cantidad = producto.cantidad;
      const botonEliminar = document.createElement("button");
      botonEliminar.textContent = "Eliminar";
      botonEliminar.addEventListener("click", () => eliminarProductoDelCarrito(producto.id));
      
      li.textContent = `${producto.nombre} x ${cantidad} - $${producto.precio * cantidad}`;
      li.appendChild(botonEliminar);
      carritoLista.appendChild(li);
  });
}

// Función para agrupar productos en el carrito por nombre y contar la cantidad
function agruparProductosPorNombre(carrito) {
  const productosAgrupados = [];

  carrito.forEach(producto => {
      const existente = productosAgrupados.find(p => p.id === producto.id);
      if (existente) {
          existente.cantidad++;
      } else {
          productosAgrupados.push({ id: producto.id, nombre: producto.nombre, precio: producto.precio, cantidad: 1 });
      }
  });

  return productosAgrupados;
}

// Función para eliminar un producto del carrito
function eliminarProductoDelCarrito(productoId) {
  carrito = carrito.filter(producto => producto.id !== productoId);
  actualizarContadorCarrito();
  cargarCarritoLocalStorage();
  mostrarProductosEnCarrito();
}

// Evento para vaciar el carrito
const botonVaciarCarrito = document.querySelector("#vaciar-carrito");
botonVaciarCarrito.addEventListener("click", () => {
  carrito = [];
  actualizarContadorCarrito();
  cargarCarritoLocalStorage();
  mostrarProductosEnCarrito();
});

// Evento para finalizar la compra (puedes personalizar esta función según tus necesidades)
const botonFinalizarCompra = document.querySelector("#finalizar-compra");
botonFinalizarCompra.addEventListener("click", () => {
  // Agrega aquí la lógica para finalizar la compra
  alert("Compra finalizada. Gracias por tu pedido!");
  carrito = [];
  actualizarContadorCarrito();
  cargarCarritoLocalStorage();
  mostrarProductosEnCarrito();
});















