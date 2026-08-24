export async function requisicaoAutenticada(url, opcoes = {}) {

    const token = localStorage.getItem('token');

    if (!token) {

        localStorage.removeItem('usuarioLogado');

        window.location.href = 'login.html';

        return;

    }

    const headers = {
        ...opcoes.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    };

    const resposta = await fetch(url, {
        ...opcoes,
        headers
    });

    if (resposta.status === 401) {

        localStorage.removeItem('token');
        localStorage.removeItem('usuarioLogado');

        window.location.href = 'login.html';

        return;

    }

    return await resposta.json();
}