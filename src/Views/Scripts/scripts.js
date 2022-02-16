
function carregaFilmes() {
    // Não recomendo fazer desta forma. É gambiarra. 
    makeRequest({url: 'filmes', params: {'rota': 'UPDATE', id: 1, nome: "FilmeTeste01", imagem_filme: "n"}})

    const filmes = makeRequest({url: 'filmes', params: {'rota': 'SELECT'}})

    const table = document.getElementById('tabela');
    let clock = true;
    filmes.forEach(filme => {
        console.log(filme);
        const linha = table.insertRow();

        if(clock){
            clock = !clock;
            linha.className = 'dif';
        }

        const colunaImg = linha.insertCell();
        colunaImg.appendChild(document.createTextNode(filme.imagem_filme))

        const colunaNome = linha.insertCell();
        colunaNome.appendChild(document.createTextNode(filme.nome))

        const colunaDuracao = linha.insertCell();
        colunaDuracao.appendChild(document.createTextNode(filme.tempo_minutos_filme))
    });
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
