const elementoProjeto = document.querySelector('#elemento-projeto');

const listaProjetos = [
    { id: 1, titulo: "Projeto Base" },
    { id: 2, titulo: "Número Secreto" },
    { id: 3, titulo: "Sorteador de Números" },
    { id: 4, titulo: "Aluguel de Jogos" },
    { id: 5, titulo: "Carrinho de Compras" },
    { id: 6, titulo: "Compra de Ingressos" },
    { id: 7, titulo: "Amigo Secreto" }
];

function exibirElementoProjetoNaTela() {
    listaProjetos.forEach((projeto) => {
        elementoProjeto.innerHTML += `
        <div class="projeto modelo__vertical modelo__centralizado" title="${projeto.titulo}">
            <h2 class="conteudo__subtitulo">
                ${encurtarCaracteresTitulo(projeto.titulo)}
            </h2>
            <span class="conteudo__tag fundo-sucesso">
                ${criarTagTitulo(projeto.titulo)}
            </span>
            <a href="${criarTagTitulo(projeto.titulo)}/" target="_blank" class="conteudo__botao fundo-adicionar">
                Acessar
            </a>
        </div>
        `;
    });
}

function criarTagTitulo(titulo) {

    if (titulo.includes('de')) {
        titulo = titulo.replace('de', '');
    }

    titulo = titulo.toLowerCase();
    titulo = titulo.replace(/\s+/g, '-');
    titulo = titulo.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    return titulo;
}

function encurtarCaracteresTitulo(titulo) {
    const indiceInicialTitulo = 0;
    const indiceLimiteTitulo = 10;

    if (titulo.length > 12) {
        return titulo.substring(indiceInicialTitulo, indiceLimiteTitulo).concat('...');
    } else {
        return titulo;
    }
}

exibirElementoProjetoNaTela();