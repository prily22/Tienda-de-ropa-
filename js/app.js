
const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const botonVaciar = document.getElementById('vaciar-carrito')
const finCompra = document.getElementById('fin-compra')

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');

const selecTalles = document.getElementById('selecTalles')
const buscador = document.getElementById('search')

let traerRopa =[]
async function traerProducto() {
    const products = await fetch('products.json',{mode: "no-cors"})
    if(products)traerRopa=products.json()
    console.log(products)
    }
    
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
    traerProducto()
    actualizarCarrito();
  }
});

botonVaciar.addEventListener('click', () => {
    carrito = []
  actualizarCarrito();
});

//filtro
selecTalles.addEventListener('change',()=>{
    console.log(selecTalles.value);
    if(selecTalles.value == 'all'){
        mostrarProductos(stockProductos)
    }else{
        let arrayNuevo = stockProductos.filter(elemento => elemento.talle === selecTalles.value)
        console.log(arrayNuevo);
        mostrarProductos(arrayNuevo)
    }
})

//logica Ecommerce
function mostrarProductos(array){
    contenedorProductos.innerHTML = ""
    console.log(traerRopa)
    traerRopa.forEach((producto) => {
    let div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML= `
                    <div class="card">
                    <div class="card-image">
                        <img src="${el.img}">
                        <span class="card-title">${el.nombre}</span>
                        <a id="boton${el.id}" class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add_shopping_cart</i></a>
                    </div>
                    <div class="card-content">
                        <p>${el.desc}</p>
                        <p>Talle: ${el.talle}</p>
                        <p> $${el.precio}</p>
                    </div>
                </div> `

    contenedorProductos.appendChild(div)
    
    let btnAgregar = document.getElementById(`boton${el.id}`)
    // console.log(btnAgregar);
    btnAgregar.addEventListener('click',()=>{
        agregarAlCarrito(el.id);
    })

  })


}

function agregarAlCarrito(id) {
    let productoAgregar = stockProductos.find(obj=> obj.id === id)
    carritoDeCompras.push(productoAgregar)
    mostrarCarrito(productoAgregar)
    actualizarCarrito()
}

function mostrarCarrito(productoAgregar) {

   let div = document.createElement('div')
    div.setAttribute('class', 'productoEnCarrito')
    div.innerHTML=`<p>${productoAgregar.nombre}</p>
                    <p>Precio: $${productoAgregar.precio}</p>
                    <button id="eliminar${productoAgregar.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`
    contenedorCarrito.appendChild(div)

    let btnEliminar = document.getElementById(`eliminar${productoAgregar.id}`)
    btnEliminar.addEventListener('click',()=>{
        btnEliminar.parentElement.remove()
        carritoDeCompras = carritoDeCompras.filter(elemento => elemento.id !== productoAgregar.id)
        console.log(carritoDeCompras);
        actualizarCarrito()
    })
}


function  actualizarCarrito (){
    contadorCarrito.innerText = carritoDeCompras.length
    precioTotal.innerText = carritoDeCompras.reduce((acc,el)=> acc + el.precio, 0 )   //acumulador     
}     
mostrarProductos()




