'use strict'

window.onload = async () => {
    console.log("paged loaded")

    let result = await fetch("data.json");
    let data = await result.json();
    let klas;

    vulKlasgroepenOp(data);

    document.getElementById("klasgroep").addEventListener("change" , (event) => {
        klas = event.target.value;
        vulLeerlingenOp(data, klas);
        document.getElementById("leerling").innerHTML = null;
    })

    document.getElementById("leerlingen").addEventListener("change", (event) => {
        let leerling = event.target.value;
        document.getElementById("leerling").innerText = data[klas][leerling];
    })

}

let vulKlasgroepenOp = (klasgroepen) => {
    let select = document.getElementById("klasgroep");
    for(let klas in klasgroepen) {
        let option = document.createElement("option");
        option.innerText = klas;
        select.appendChild(option)
    }
}

let vulLeerlingenOp = (klasgroepen, klas) => {
    let select = document.getElementById("leerlingen");
    select.innerHTML = null;
    let firstOption = document.createElement("option");
    firstOption.innerText = "Kies een leerling";
    select.appendChild(firstOption);

    for(let leerling in klasgroepen[klas]) {
        let option = document.createElement("option");
        option.innerText = klasgroepen[klas][leerling]
        option.value = leerling;
        select.appendChild(option);
    }
}