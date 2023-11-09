document.addEventListener('DOMContentLoaded', main);

async function main() {
    await getData()
}

async function getData() {
    const URL = `productos.json`
    const res = await fetch(URL)
    if (!res.ok) throw new Error(`error je`)
    const data = await res.json();
    showData(data)
}

function setItemId(id) {
    localStorage.setItem('tshirtID', JSON.stringify(id));
    location.href = 'producto.html'
}


function showData(productDataArray) {
    const prodContainer = document.getElementById('prod-container');

    let template = ``

    for (let prod of productDataArray) {
        const { name, image, price, id } = prod
        template += `
        <div class="producto" onclick='setItemId(${id})'>
                <a href="producto.html">
                    <img class="producto__imagen" src='img/${image} ' alt="imagen camisa">
                    <div class="producto__informacion">
                        <p class="producto__nombre">${name} </p>
                        <p class="producto__precio">$${price} </p>
                    </div>
                </a>
        </div>
        `
    }

    prodContainer.innerHTML = template
}