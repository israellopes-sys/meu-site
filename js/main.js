import { buscarDados } from "./api.js";

const container = document.getElementById("cards-container");

async function carregar() {
    const dados = await buscarDados();

    dados.forEach(item => {
        const div = document.createElement("div");
        div.className = "col-md-4";

        div.innerHTML = `
            <div class="card">
                <img src="${item.imagem}" class="card-img-top">
                <div class="card-body">
                    <h5>${item.titulo}</h5>
                    <p>${item.descricao}</p>
                    <button class="btn btn-primary">Saiba mais</button>
                </div>
            </div>
        `;

        div.querySelector("button").addEventListener("click", () => {
            alert("ID: " + item.id);
        });

        container.appendChild(div);
    });
}

carregar();