var request = new XMLHttpRequest();
const versaoAtual = '1.0.1'


request.open('GET', 'https://api.github.com/repos/LeoMartinez013/Gerenciamento-de-Processos/commits', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // A solicitação foi bem-sucedida
    var data = JSON.parse(this.response);
    var lastCommit = data[0];

    var title = lastCommit.commit.message.split('\n')[0];
    console.log(title);
  } else {
    // A solicitação foi feita, mas o servidor retornou um erro
    console.log('Erro ao acessar a API do GitHub: ' + request.status);
  }
  if (versaoAtual == title) {
    console.log('100% atualizado')
  }
}

request.onerror = function() {
  // Houve um erro na solicitação (por exemplo, o usuário está sem internet)
  console.log('Não foi possível procurar atualizações. Verifique sua conexão com a internet.');
}

request.send();
