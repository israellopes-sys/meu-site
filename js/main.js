const form = document.getElementById('formCadastro');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const senha = document.getElementById('senha').value;

        fetch('http://localhost:3000/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, email, senha })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            alert('Cadastro feito de verdade!');
        })
        .catch(err => {
            console.error(err);
            alert('Erro ao conectar com o servidor');
        });
    });
}