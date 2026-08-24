(function () {

    const usuarioRaw =
        localStorage.getItem('usuarioLogado');

    const token =
        localStorage.getItem('token');

    if (!usuarioRaw || !token) {
        return;
    }

    let usuario = null;

    try {

        usuario = JSON.parse(usuarioRaw);

    } catch (erro) {

        console.error(
            'Erro ao carregar usuário:',
            erro
        );

        return;
    }


    const caminho =
        window.location.pathname;

    const paginaAtual =
        caminho.split('/').pop() || 'home.html';


    const isHome =
        paginaAtual === 'home.html' ||
        paginaAtual === '';

    const isUsuarios =
        paginaAtual === 'usuarios.html';


    const header =
        document.getElementById(
            'global-header'
        );


    if (!header) {
        return;
    }


    header.innerHTML = `

        <header class="global-header">

            <div class="global-header-inner">

                <a
                    href="home.html"
                    class="global-brand"
                    aria-label="Ir para a página inicial"
                >

                    <span class="global-brand-icon">
                        <i class="fa-solid fa-music"></i>
                    </span>

                    <span class="global-brand-text">
                        MPB
                        <strong>Interativa</strong>
                    </span>

                </a>


                <nav
                    class="global-nav"
                    id="globalNav"
                >

                    <a
                        href="home.html"
                        class="global-nav-link ${isHome ? 'active' : ''}"
                    >
                        <i class="fa-solid fa-house"></i>
                        Início
                    </a>

                    <a
                        href="home.html#colecao"
                        class="global-nav-link"
                    >
                        <i class="fa-solid fa-compact-disc"></i>
                        Músicas
                    </a>

                    <a
                        href="usuarios.html"
                        class="global-nav-link ${isUsuarios ? 'active' : ''}"
                    >
                        <i class="fa-solid fa-users"></i>
                        Usuários
                    </a>

                </nav>


                <div class="global-user-area">

                    <a
                        href="perfil.html"
                        class="global-user"
                        title="Meu perfil"
                    >

                        <span class="global-user-avatar">
                            <i class="fa-solid fa-user"></i>
                        </span>

                        <span class="global-user-name">
                            ${usuario.nome}
                        </span>

                    </a>


                    <button
                        id="globalLogout"
                        class="global-logout"
                        type="button"
                        title="Sair"
                        aria-label="Sair"
                    >

                        <i class="fa-solid fa-arrow-right-from-bracket"></i>

                    </button>


                    <button
                        id="globalMenuToggle"
                        class="global-menu-toggle"
                        type="button"
                        aria-label="Abrir menu"
                        aria-expanded="false"
                    >

                        <i class="fa-solid fa-bars"></i>

                    </button>

                </div>

            </div>

        </header>

    `;


    // =====================================================
    // LOGOUT
    // =====================================================

    const logout =
        document.getElementById(
            'globalLogout'
        );


    logout.addEventListener(
        'click',
        function () {

            localStorage.removeItem(
                'token'
            );

            localStorage.removeItem(
                'usuarioLogado'
            );

            window.location.href =
                'login.html';

        }
    );


    // =====================================================
    // MENU MOBILE
    // =====================================================

    const menuToggle =
        document.getElementById(
            'globalMenuToggle'
        );

    const nav =
        document.getElementById(
            'globalNav'
        );


    menuToggle.addEventListener(
        'click',
        function () {

            const aberto =
                nav.classList.toggle(
                    'open'
                );


            this.setAttribute(
                'aria-expanded',
                String(aberto)
            );


            this.innerHTML = aberto
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';

        }
    );


    // Fechar menu depois de clicar em um link

    nav
        .querySelectorAll(
            '.global-nav-link'
        )
        .forEach(
            link => {

                link.addEventListener(
                    'click',
                    () => {

                        nav.classList.remove(
                            'open'
                        );

                        menuToggle.setAttribute(
                            'aria-expanded',
                            'false'
                        );

                        menuToggle.innerHTML =
                            '<i class="fa-solid fa-bars"></i>';

                    }
                );

            }
        );

})();