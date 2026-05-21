export async function buscarDados() {
    const resposta = await fetch("dados.json");
    return await resposta.json();
}