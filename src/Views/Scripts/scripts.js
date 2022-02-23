




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

// function removeFilme(id_filme) {
//     const ret = makeRequest({url: 'filmes', params: {'rota': 'DELETE', 
//                             id: id_filme}})    
//     console.log(ret);
// }

() => {
    var form = document.querySelector('form');
    form.addEventListener('submit', function( event ) {
        event.preventDefault();
    });
}
function realizaVenda() {
    document.querySelector('form').addEventListener('submit', event => {
        event.preventDefault();

    })
}

function cadastraSessao() {
    document.querySelector('form').addEventListener('submit', event => {
        event.preventDefault();

    })
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
            alert(`Inserido com sucesso || nome:${nome} || duracao: ${duracao}||`)
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
