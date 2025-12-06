const elementoNumeroSorteado = document.querySelector('#elemento-numero-sorteado');
const elementoMensagemAlerta = document.querySelector('#elemento-mensagem-alerta');

function sortear() {
    const opcaoEscolhida = parseInt(document.querySelector('#opcao-escolhida').value);
    const numeroMinimo = parseInt(document.querySelector('#numero-minimo').value);
    const numeroMaximo = parseInt(document.querySelector('#numero-maximo').value);
    const numeroQuantidade = parseInt(document.querySelector('#numero-quantidade').value);

    if (!validarCampos(opcaoEscolhida, numeroMinimo, numeroMaximo, numeroQuantidade)) return;

    let listaNumeroSorteado = [];
    let numeroAleatorio = 0;

    for (let i = 0; i < numeroQuantidade; i++) {
        numeroAleatorio = obterNumeroAleatorio(numeroMinimo, numeroMaximo);
    
        while (listaNumeroSorteado.includes(numeroAleatorio) || !verificarOpcaoEscolhida( numeroAleatorio, opcaoEscolhida)) {
            numeroAleatorio = obterNumeroAleatorio(numeroMinimo, numeroMaximo);
        }

        listaNumeroSorteado.push(numeroAleatorio);
    }

    exibirOperacaoNumeroSorteadoNaTela(numeroMinimo, numeroMaximo, listaNumeroSorteado);
}

function reiniciar() {
    document.querySelector('#botao-reiniciar').setAttribute('disabled', true);

    elementoMensagemAlerta.innerHTML = '';

    limparCampos();
    exibirMensagemNumeroSorteadoInicialNaTela();
}

function limparCampos() {
    document.querySelector('#opcao-escolhida').value = '1';
    document.querySelector('#numero-minimo').value = '';
    document.querySelector('#numero-maximo').value = '';
}

function exibirOperacaoNumeroSorteadoNaTela(numeroMinimo, numeroMaximo, listaNumeroSorteado) {
    listaNumeroSorteado.sort(compareNumeroAleatorioNaLista);

    exibirMensagemAlertaNaTela(
        'sucesso', 
        'sucesso', 
        `Números sorteados: ${listaNumeroSorteado.join(',')}`
    );

    exibirNumeroSorteadoNaTela(numeroMinimo, numeroMaximo, listaNumeroSorteado);

    document.querySelector('#botao-reiniciar').removeAttribute('disabled');
}

function compareNumeroAleatorioNaLista(a, b) {
    return a - b;
}

function verificarOpcaoEscolhida(numeroAleatorio, opcaoEscolhida) {
    if (opcaoEscolhida === 2) {
        return numeroAleatorio % 2 === 0;
    }

    if (opcaoEscolhida === 3) {
        return numeroAleatorio % 2 !== 0;
    }

    return true;
}

function obterNumeroAleatorio(numeroMinimo, numeroMaximo) {
    return parseInt(Math.random() * (numeroMaximo - numeroMinimo + 1) + numeroMinimo);
}

function validarCampos(opcaoEscolhida, numeroMinimo, numeroMaximo, numeroQuantidade) {
    document.querySelector('#numero-quantidade').value = '';

    const diferencaNumeroMinimoMaximo = numeroMaximo - numeroMinimo + 1;

    if (isNaN(opcaoEscolhida) || isNaN(numeroMinimo) || isNaN(numeroMaximo) || isNaN(numeroQuantidade)) {
        exibirMensagemAlertaNaTela(
            'erro', 'erro', 'Preencha corretamente todos os campos com números inteiros'
        );
        return false;
    }

    if (opcaoEscolhida === 1 && numeroQuantidade > diferencaNumeroMinimoMaximo) {
        exibirMensagemAlertaNaTela(
            'erro', 'erro', `A quantidade deve ser até (${diferencaNumeroMinimoMaximo}) - Você escolheu o número [${numeroQuantidade}]`
        );
        return false;
    }

    if (!validarNumeroParImpar(opcaoEscolhida, numeroQuantidade, diferencaNumeroMinimoMaximo) ) return;

    return true;
}

function validarNumeroParImpar(opcaoEscolhida, numeroQuantidade, diferencaNumeroMinimoMaximo) {
    const numeroDivisivelPorDois = parseInt(diferencaNumeroMinimoMaximo / 2);

    if (opcaoEscolhida !== 1 && numeroQuantidade > numeroDivisivelPorDois) {
        exibirMensagemAlertaNaTela(
            'erro', 'erro', `A quantidade deve ser até (${numeroDivisivelPorDois}) - Você escolheu o número [${numeroQuantidade}]`
        );
        return false;
    }

    return true;
}

function exibirMensagemAlertaNaTela(tipoMessagem, corFundo, mensagemAviso) {
    elementoMensagemAlerta.innerHTML = `
        <span class="conteudo__mensagem conteudo__mensagem-${tipoMessagem} fundo-${corFundo} conteudo__texto">
            ${mensagemAviso}.
        </span>
    `;
}

function exibirNumeroSorteadoNaTela(numeroMinimo, numeroMaximo, listaNumeroSorteado) {
    elementoNumeroSorteado.innerHTML = '';

    let checarNumeroNaLista = 'erro';

    for (let i = numeroMinimo; i <= numeroMaximo; i++) {
        checarNumeroNaLista = listaNumeroSorteado.includes(i) ? 'sucesso' : 'erro';

        elementoNumeroSorteado.innerHTML += `
            <div class="conteudo__caixa fundo-${checarNumeroNaLista}">
                ${i}
            </div>
        `;
    }
}

function exibirMensagemNumeroSorteadoInicialNaTela() {
    elementoNumeroSorteado.innerHTML = `
        <p class="conteudo__texto conteudo__destaque">
            Nenhum número foi sorteado :)
        </p>
    `;
}

exibirMensagemNumeroSorteadoInicialNaTela();