let retRequest;
let timeRequest = null; 

async function carregaFilmes() {
    makeRequest('filmes');
    
    let req;
    setTimeout(()=>{
        req = retRequest;
        console.log(req);
        // PREENCHE A TABELINHA SHWERNOUS
    }, 5000);
}

async function makeRequest(url) {
    retRequest = false;
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

    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('GET', url);
    httpRequest.send();

    if (timeRequest === null){
        timeRequest = setInterval(() => {
            console.log(!!httpRequest.responseText == true, typeof(httpRequest.responseText));
            if(retRequest){
                clearInterval(timeRequest)
                console.log(retRequest);
                return retRequest;
            }
            console.log('Aguardando requisição'); 
        }, 2000)
        setTimeout(() => {
            clearInterval(timeRequest);
        }, 30000)
    }
}

function alertContents() {
    try {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                // alert(httpRequest.responseText);
                retRequest = httpRequest.responseText
            } else {
                clearInterval(timeRequest)
                alert('Ocorreu um problema com a requisição, STATUS REQUISIÇÃO '+String.toString(httpRequest.status));
                retRequest = 'Erro na requisição '+String.toString(httpRequest.status);
            }
        }
    }
    catch (e) {
        alert('Caught Exception: ' + e.description);
    }
}

function syncDelay(milliseconds){
    let start = new Date().getTime();
    let end = 0;
    while( (end-start) < milliseconds) {
        end = new Date().getTime();
    }
}
