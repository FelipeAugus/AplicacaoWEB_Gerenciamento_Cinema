function carregaFilmes() {
    const filmes = makeRequest({url: 'filmes', params: {'rota': 'SELECT'}})

    const table = document.getElementById('corpo-tabela');
    let clock = true;
    filmes.forEach(filme => {
        console.log(filme);
        const linha = table.insertRow();

        if(clock){
            clock = !clock;
            linha.className = 'dif';
        }

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
}

function realizaVenda() {
    document.querySelector('form').addEventListener('submit', event => {
        event.preventDefault();

    })
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
    }
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

function atualizaEstoque() {
    document.querySelector('form').addEventListener('submit', event => {
        event.preventDefault();

    })
}


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
        console.log(params, typeof(params), JSON.stringify(params), typeof(JSON.stringify(params)))
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



// function removeFilme(id_filme) {
//     const ret = makeRequest({url: 'filmes', params: {'rota': 'DELETE', 
//                             id: id_filme}})    
//     console.log(ret);
// }
