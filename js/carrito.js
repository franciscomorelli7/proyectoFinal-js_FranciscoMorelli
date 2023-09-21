let carrito = localStorage.getItem('carrito')
carrito = JSON.parse(carrito)

//DOM
const carritoVacio = document.querySelector("#carritoVacio")
const vaciar = document.querySelector('#vaciar')
const contenedorCarrito = document.querySelector("#contenedorCarrito")
const productosInfo = document.querySelector('#containerProductos')
const accionesCarrito = document.querySelector("#accionesCarrito")
const finalizar = document.querySelector('#finalizar')

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

vaciar.addEventListener("click",vaciarCarrito)

function vaciarCarrito() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Estas seguro?',
        text: "Su carrito va a ser vaciado",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Vaciar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            'Vaciado',
            'Su carrito fue vaciado correctamente',
            'success'
          )
            carrito = []; 
            guardarCarritoEnLocalStorage(); 
            productosEnCarrito(); 
        } else if (
          
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Su carrito no ha sido vaciado',
            'error'
          )
        }
      })
}


function finalizarCompra (){

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Estas seguro?',
        text: "Su compra va a ser confirmada",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Finalizar',
        cancelButtonText: 'Seguir comprando',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Tu compra se realizo con exito. Gracias por confiar en nostros!',
                showConfirmButton: false,
                timer: 4500
              })
            carrito = []; 
            guardarCarritoEnLocalStorage(); 
            productosEnCarrito(); 
        } else if (
         
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelada',
            'Su compra fue cancelada.',
            'error'
          )
        }
      })
      
}
finalizar.addEventListener("click",finalizarCompra)






