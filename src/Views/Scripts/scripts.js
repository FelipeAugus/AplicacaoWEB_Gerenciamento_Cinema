// FILME
function carregaFilmes() {
    const filmes = makeRequest({url: 'filmes', params: {'rota': 'SELECT'}})

    const table = document.getElementById('corpo-tabela');

    filmes.forEach(filme => {
        console.log(filme);
        const linha = table.insertRow();

        // const colunaImg = linha.insertCell();
        // colunaImg.appendChild(document.createTextNode(filme.imagem_filme))

        const colunaNome = linha.insertCell();
        colunaNome.appendChild(document.createTextNode(filme.nome))

        const colunaDuracao = linha.insertCell();
        colunaDuracao.appendChild(document.createTextNode(filme.tempo_minutos_filme))

        // const colunaBtn = linha.insertCell();
        // colunaBtn.innerHTML = `<button class="btn btn-danger" onclick="removeFilme(${filme.id_filme})">DEL</button>`;
    });
}

function cadastraFilme(event) {
        event.preventDefault();
        const nome = document.querySelector("#nome").value;
        const duracao = document.querySelector("#duracao").value;
        if(!nome || !duracao){
            alert("Preencha todos campos");
            return
        }
        const ret = makeRequest({url: 'filmes', params: {'rota': 'INSERT', 
                                nome: nome, tempo_minutos_filme: duracao}})    

        if(ret[1]){
            console.log(ret)
            alert(`Inserido com sucesso || nome:${nome} || duracao: ${duracao}||`)
        } else {
            console.log(ret)
            alert(`Filme atualizado no banco || nome:${nome} || duracao: ${duracao}||`)
        }
            
        document.location.reload(true);
}

// SESSAO 
function setaFormSessao() {
    const filmes = makeRequest({url: 'filmes', params: {'rota': 'SELECT'}})
    const filmesSelect = document.getElementById('filmes');
    filmes.forEach(filme => {
        const option = document.createElement('option');
        option.value = filme.id_filme;
        option.text = filme.nome;

        filmesSelect.add(option);
    });
    
    
    const salas = makeRequest({url: 'salas', params: {'rota': 'SELECT'}})
    const salasSelect = document.getElementById('salas');
    salas.forEach(sala => {
        const option = document.createElement('option');
        option.value = sala.id_sala;
        option.text = sala.numero_sala;

        salasSelect.add(option);
    });
    carregaSessoes();
}

const mapSala = []
const mapSalaFimSessao = []
function carregaSessoes() {
    const sessoes = makeRequest({url: 'viewSessoesGroup', params: {}})[0]

    const table = document.getElementById('corpo-tabela');
    sessoes.forEach(sessao => {
        console.log(sessao);
        const linha = table.insertRow();

        const sala = linha.insertCell();
        sala.appendChild(document.createTextNode(sessao.numero_sala))

        const filme = linha.insertCell();
        filme.appendChild(document.createTextNode(sessao.nome_filme))

        const fimSessao = linha.insertCell();
        fimSessao.appendChild(document.createTextNode(sessao.fim_da_ultima_sessao.slice(0, -8)))

        
        mapSala.push(sessao.numero_sala)
        mapSalaFimSessao.push(sessao.fim_da_ultima_sessao)
    });
    
}

function cadastraSessao(event) {
    event.preventDefault();
    const horario = document.querySelector("#hora").value;
    const filme = document.querySelector("#filmes").value;
    const sala = document.querySelector("#salas").value;
    
    if(!horario || filme=='0' || sala=='0'){
        alert("Preencha todos campos");
        return
    }

    // ToDo Verificar data menor que a atual do sistema
    console.log(`${horario}  ${filme}  ${sala}`)
    const ret = makeRequest({url: 'criaSessao', params: {
        idSala: sala,
        idFilme: filme,
        dthrInicio: horario.replace("T", " "),
    }})
    console.log(ret);
    if(ret[0] = 'SUCESSO'){
        console.log(ret)
        alert(`Inserido com sucesso || idSala:${sala} || idFilme: ${filme}|| dthrInicio: ${horario}`)
        document.location.reload(true);
    }
}

// INGRESSOS
let mapQuantIngressos;
function setaFormIngresso() {
    mapQuantIngressos = new Map();
    const ingressos = makeRequest({url: 'viewIngressos', params: {}})[0]
    const ingressosSelect = document.getElementById('ingressos');
    ingressos.forEach(ingresso => {
        const option = document.createElement('option');
        option.value = ingresso.id_produto;
        
        const nome = ingresso.nome_produto;
        option.text = nome.substr(9);

        ingressosSelect.add(option);

        mapQuantIngressos.set(ingresso.id_produto, ingresso.quantidade);
    });
}

function venderIngresso(event) {
    event.preventDefault();
    const ingressoIdProduto = document.querySelector("#ingressos").value;

    if(ingressoIdProduto=='0'){
        alert("Selecione um ingresso");
        return
    }
    const quant = mapQuantIngressos.get(Number(ingressoIdProduto));

    console.log(`${ingressoIdProduto} ${quant-1}`)

    const ret = makeRequest({url: 'produtos_quantidade', params: {
        'rota': 'UPDATE',
        id: ingressoIdProduto,
        quantidade: quant-1
    }})

    console.log(ret);
    if(ret[0] = 'SUCESSO'){
        alert(`Venda realizada com sucesso || Ingressos restantes: ${quant-1}`)
        document.location.reload(true);
    }
}

// VENDAS
function setaFormCaixa() {
    const produtos = makeRequest({url: 'viewProdutos', params: {}})[0]
    const produtosSelect = document.getElementById('produtos');
    produtos.forEach(produto => {
        const option = document.createElement('option');
        option.value = produto.id_produto;
        option.text = produto.nome_produto;

        produtosSelect.add(option);
    });
}

function vender(event) {
    event.preventDefault();
    const idProduto = document.querySelector("#produtos").value;
    const quantidade = document.querySelector("#quantidade").value;
    if(idProduto=='0' || !quantidade){
        alert("Preencha todos campos");
        return
    }
    const ret = makeRequest({url: 'realizaVenda', params: {
        idProduto: idProduto,
        quantidade: quantidade,
        idCaixa: 1,
    }})
    console.log(ret);
    if(ret[0] = 'SUCESSO'){
        console.log(ret)
        alert(`Venda realizada !`)
        document.location.reload(true);
    }
}

// RELATORIO
function setaFormRelatorio() {
    const filmes = makeRequest({url: 'filmes', params: {'rota': 'SELECT'}})
    const filmesDiv = document.getElementById('filmes');
    filmes.forEach(filme => {
        addCheckBox(filmesDiv, filme.nome, filme.id_filme);
    });
    
    const salas = makeRequest({url: 'salas', params: {'rota': 'SELECT'}})
    const salasDiv = document.getElementById('salas');
    salas.forEach(sala => {
        addCheckBox(salasDiv, sala.numero_sala, sala.id_sala);
    });

    function addCheckBox(divContainer, label, value) {
        const divCheck = document.createElement('div');
        divCheck.className = 'col-sm';
        const className = divContainer.id;
        divCheck.innerHTML = `<input type="checkbox" class="checkbox-${className.replace(" ", "_")}" name="${label}" value="${value}">
                            <label for="${label}">${label}</label>`;
        divContainer.appendChild(divCheck);
    }
}

function limpaFiltros(event) {
    event.preventDefault();

    const salas = Array.from(document.getElementsByClassName("checkbox-salas"));
    salas.forEach(sala => { sala.checked = false; })

    const filmes = Array.from(document.getElementsByClassName("checkbox-filmes"));
    filmes.forEach(filme => { filme.checked = false; } );
}

function executaQuery(event) {
    event.preventDefault();

    const salas = Array.from(document.getElementsByClassName("checkbox-salas"));
    const salasCheck = [];
    salas.forEach(sala => { if(sala.checked) { salasCheck.push(sala.value); }});

    const filmes = Array.from(document.getElementsByClassName("checkbox-filmes"));
    const filmesCheck = [];
    filmes.forEach(filme => { if(filme.checked) { filmesCheck.push(filme.value); }});
    
    const sessoes = makeRequest({url: 'viewSessoes', params: {
        id_sala: salasCheck,
        id_filme: filmesCheck
      }});

    const table = document.getElementById('corpo-tabela');
    table.innerHTML = "";
    console.log(sessoes)
    sessoes.forEach(sessao => {
        console.log(sessao);
        const linha = table.insertRow();

        const numeroSala = linha.insertCell();
        numeroSala.appendChild(document.createTextNode(sessao.numero_sala));

        const nomeFilme = linha.insertCell();
        nomeFilme.appendChild(document.createTextNode(sessao.nome_filme));

        const tempoFilme = linha.insertCell();
        tempoFilme.appendChild(document.createTextNode(sessao.tempo_minutos_filme));

        const fimSessao = linha.insertCell();
        fimSessao.appendChild(document.createTextNode(sessao.fim_da_sessao.slice(0, -8).replace("T", " ")));
    });

    table.classList.add("mb-5")
}

function imprimiRelatorio() {
    const minhaTabela = document.getElementById('tabela');

    var pdf = new jsPDF('p', 'px');   
    pdf.setFont("helvetica");
    pdf.setFontType("bold");
    pdf.setFontSize(16);
    pdf.text(200, 25, "RELATÓRIO");
    const margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 522
    };

    pdf.fromHTML(
        minhaTabela, margins.left,margins.top, {'width': margins.width}, 
        function (dispose) { pdf.save('RelatorioSessoes.pdf'); }, margins);

}
// UTEIS
function makeRequest(req) {
    const url = req.url;
    const params = req.params || null;

    if (window.XMLHttpRequest) {
        httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE
        alert('A APLICAÇÃO NÃO É COMPATIVEL COM SEU NAVEGADOR');
        return false;
    }

    if (!httpRequest) {
        alert('ERROR :( Não foi possível criar uma instancia XMLHTTP');
        return false;
    }

    // httpRequest.onreadystatechange = alertContents;
    httpRequest.open('POST', url, false);
    
    httpRequest.setRequestHeader('Content-Type', 'application/json');
    try {
        httpRequest.send(JSON.stringify(params));
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                return JSON.parse(httpRequest.responseText);
            }
        }
    } catch (error) {
        alert('Ocorreu um problema com a requisição, STATUS REQUISIÇÃO '+String.toString(httpRequest.status)); 
    }
}
