let listaNumeroSorteado = [];

const elementoMensagemAlerta = document.querySelector('#elemento-mensagem-alerta');
const elementoNumeroSorteado = document.querySelector('#elemento-numero-sorteado');

const numeroMinimo = 1;
const numeroMaximo = 3;

let numeroSecreto = gerarNumeroAleatorio();
let chute;
let tentativa = 1;

function chutar() {
    chute = parseInt(document.querySelector('#chute').value);

    if (!validarCampos(chute)) return;

    if (chute === numeroSecreto) {
        let palavraTentativa = tentativa > 1 ? 'tentativas' : 'tentativa';
        let mensagemSucesso = `Você acertou o número secreto ${numeroSecreto} com ${tentativa} ${palavraTentativa}`;

        exibirMensagemNaTela('h1', 'Acertou!');
        exibirMensagemNaTela('p', mensagemSucesso);

        atualizarNumeroSorteado(chute);

        document.querySelector('#botao-chutar').setAttribute('disabled', true);
        document.querySelector('#botao-reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirMensagemNaTela('p', `O número secreto é menor que ${chute}`);
        } else {
            exibirMensagemNaTela('p', `O número secreto é maior que ${chute}`);
        }

        tentativa++;
    }
}

function atualizarNumeroSorteado(numeroSorteado) {
    const elementoNumeroSorteado = document.querySelector(`#elemento-numero-sorteado-${numeroSecreto}`);
    const elementoNumeroSorteadoClasse = elementoNumeroSorteado.classList;

    elementoNumeroSorteadoClasse.remove('fundo-erro');
    elementoNumeroSorteadoClasse.add('fundo-sucesso');
}

function validarCampos(chute) {
    elementoMensagemAlerta.innerHTML = '';
    document.querySelector('#chute').value = '';

    if (isNaN(chute)) {
        exibirMensagemAlertaNaTela(
            'erro', 'erro', 'Preencha corretamente o campo número' 
        );
        return false;
    }

    if (chute < numeroMinimo || chute > numeroMaximo) {
        exibirMensagemAlertaNaTela(
            'erro', 'erro', `Digite um número entre ${numeroMinimo} e ${numeroMaximo} - Sua opção escolhida: ${chute}`
        );
        return false;
    }

    return true;
}

function exibirMensagemAlertaNaTela(tipoMensagem, corFundo, mensagemAviso) {
    elementoMensagemAlerta.innerHTML = `
        <span class="conteudo__mensagem conteudo__mensagem-${tipoMensagem} conteudo__texto fundo-${corFundo}">
            ${mensagemAviso}.
        </span>
    `;
}

function exibirNumerosSorteadosNaTela() {
    elementoNumeroSorteado.innerHTML = '';

    for (let i = numeroMinimo; i <= numeroMaximo; i++) {
        elementoNumeroSorteado.innerHTML += `
            <div class="conteudo__caixa fundo-erro" id="elemento-numero-sorteado-${i}">
                0${i}
            </div>
        `;
    }
}

function reiniciar() {
    document.querySelector('#botao-chutar').removeAttribute('disabled');
    document.querySelector('#botao-reiniciar').setAttribute('disabled', true);

    exibirMensagemInicialNaTela();

    tentativa = 1;
    numeroSecreto = gerarNumeroAleatorio();
}

function gerarNumeroAleatorio() {
    let numeroAleatorio = parseInt(Math.random() * numeroMaximo + numeroMinimo);

    if (listaNumeroSorteado.length == numeroMaximo) {
        exibirNumerosSorteadosNaTela();
        listaNumeroSorteado = [];
    }

    if (listaNumeroSorteado.includes(numeroAleatorio)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumeroSorteado.push(numeroAleatorio);
        return numeroAleatorio;
    }
}

function exibirMensagemNaTela(tag, texto) {
    const campo = document.querySelector(tag);
    campo.textContent = texto; 
}

function exibirMensagemInicialNaTela() {
    exibirMensagemNaTela('h1', `Número Secreto v1`);
    exibirMensagemNaTela('p', `Digite um número entre ${numeroMinimo} e ${numeroMaximo}`);
}

exibirMensagemInicialNaTela();
exibirNumerosSorteadosNaTela();