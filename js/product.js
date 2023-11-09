document.addEventListener('DOMContentLoaded', main);

async function main() {
    await filterData()
}

async function getData() {
    const URL = `productos.json`
    const res = await fetch(URL)
    if (!res.ok) throw new Error(`error je`)
    const data = await res.json();
    return data
}

async function filterData() {
    const lsDataID = JSON.parse(localStorage.getItem('tshirtID'));
    const data = await getData()
    const tshirtData = data.filter(elem => elem.id === lsDataID)
    showData(tshirtData)
}

function showData(tshirtData) {
    const dataContainer = document.getElementById('prod-container')
    dataContainer.innerHTML = dataTemplate(tshirtData)
    handleFormSubmit()
}

function dataTemplate(data) {
    return data.map(elem => (
        `
        <h1>${elem.name}</h1>

        <div class="camisa">
            <img class="camisa__imagen" src="/img/${elem.image}" alt="Imagen del producto">

            <div class="camisa__contenido">
                <p class="camisa__parrafo">${elem.description}</p>

                <form class="formulario" id="tshirt-form">
                    <select class="formulario__campo">
                        <option disabled selected>--Selecionar talla-- </option>
                        <option>Chica </option>
                        <option>Mediana </option>
                        <option>Grande </option>
                    </select>
                    <input class="formulario__campo" type="number" placeholder="Cantidad" min="1">
                    <input class="formulario__submit" type="submit" onclick="alert('agregado al carrito inexistente je')" value="Agregar al carrito">
                </form>
            </div>
        </div>
        `
    ));
}

function handleFormSubmit() {
    const form = document.getElementById('tshirt-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault()
    })
}