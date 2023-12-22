const button = document.querySelector('.button-add-processo')
const input = document.querySelector('.input-processo')
const listaCompleta = document.querySelector('.list-processos')

/*let meusProcessos = JSON.parse(localStorage.getItem('meusProcessos')) || []*/
let meusProcessos = JSON.parse(localStorage.getItem('meusProcessos')) || {};

/*
minhalistaDeItens     = meusProcessos
mostrarTarefas()      = mostrarProcessos()
baixarTarefas()       = baixarProcessos()
concluirTarefa()      = concluirProcesso()
adicionarNovaTarefa() = adicionarNovoProcesso()
*/
window.onload = function() {
  meusProcessos = JSON.parse(localStorage.getItem('meusProcessos')) || []
  mostrarProcessos()
}

// Baixar como .json
function baixarProcessosJson() {
  const data = JSON.stringify(meusProcessos, null, 2);
  const blob = new Blob([data], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'processos.json';
  link.click();
  URL.revokeObjectURL(url);
}
// Baixar como .txt
function baixarProcessosTxt() {
  const data = JSON.stringify(meusProcessos, null, 2);
  const blob = new Blob([data], {type: 'text/plain'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'processos.txt';
  link.click();
  URL.revokeObjectURL(url);
}
// Importar como .json
function importProcessosJson(event) {
  let file = event.target.files[0];

  if (file) {
    let reader = new FileReader();

    reader.onload = function(e) {
      let processos = JSON.parse(e.target.result);
      localStorage.setItem('meusProcessos', JSON.stringify(processos));
      mostrarProcessos();
    };
    reader.readAsText(file);
  }
}
// Importar como .txt
function importProcessosTxt(event) {
  let file = event.target.files[0];

  if (file) {
    let reader = new FileReader();

    reader.onload = function(e) {
      let processos = JSON.parse(e.target.result);
      localStorage.setItem('meusProcessos', JSON.stringify(processos));
      mostrarProcessos();
    };
    reader.readAsText(file);
  }
}


function adicionarNovoProcesso() {
  let dataAtual = new Date();
  let year = dataAtual.getFullYear();
  let month = dataAtual.getMonth() + 1;
  if (month < 10) month = '0' + month;
  let diaAtual = `${year}-${month}`;

  meusProcessos.push({
    po: input.value,
    concluido: false,
    modal: "Marítimo",
    filial: "São Paulo",
    quantidade: "vazio",
    produto: "vazio",
    etb: "",
    navio: "vazio",
    container: "vazio",
    bl: "vazio",
    li: "vazio",
    lcpo: "vazio",
    descarga: "",
    apresDcts: "",
    inspecaoMAPA: "vazio",
    deferimento: "",
    registroDI: "",
    numDI: "vazio",
    desembaraco: "",
    envNFs: "",
    dctsTransporte: "",
    mesOperacao: diaAtual,
    etapa: "vazio",
    historico: [
      "", "", "", "", "", "", "", "", "", "", 
      "", "", "", "", "", "", "", "", "", "", 
      "", "", "", "", "", "", "", "", "", ""
    ],
  });
  
  input.value = '';
  localStorage.setItem('meusProcessos', JSON.stringify(meusProcessos));
  mostrarProcessos();
}

function mostrarProcessos() {
  let novaLi = `
    <tr id="titulo">
      <th class="c1">PO</th>
      <th class="c2">BL</th>
      <th class="c3">Etapa</th>
      <th class="c4">Mês Operação</th>
      <th class="c5"></th>
    </tr>`
    meusProcessos.forEach((item, posicao) => {
    novaLi =
      novaLi +
      /*`
        <tr class="processo ${item.concluido && 'done'}">
            <td class="po c1">${item.po}</td>
            <td class="bl c2"> ${item.bl || 'Vazio'}</td>
            <td class="etapa c3"> ${item.etapa || 'Vazio'}</td>
            <td class="c4">
              <img class="icone" src="./assets/trash.png" alt="excluir-processo" onclick="deletarProcesso(${posicao})">
              <a href="configuracao/painel.html?posicao=${posicao}" target="_self">
              <img class="icone" src="./assets/config.png" alt="configurar-processo"></a>
            </td>
        </tr>
      `*/
      `
      <tr class="processo ${item.concluido && 'concluido'}" onclick="window.location='configuracao/painel.html?posicao=${posicao}'">
        <td class="po c1">${item.po}</td>
        <td class="bl c2"> ${item.bl || 'Vazio'}</td>
        <td class="etapa c3"> ${item.etapa || 'Vazio'}</td>
        <td class="c4 mesOperacao"> ${item.mesOperacao || 'Vazio'}</td>
        <td class="c5">
          <img class="icone" src="./assets/trash.png" alt="excluir-processo" onclick="event.stopPropagation(); deletarProcesso(${posicao})">
        </td>
      </tr>
      `
  })
  listaCompleta.innerHTML = novaLi
}

function concluirProcesso(posicao) {
  meusProcessos[posicao].concluido = !meusProcessos[posicao].concluido
  localStorage.setItem('meusProcessos', JSON.stringify(meusProcessos))
  mostrarProcessos()
}

function deletarProcesso(posicao) {
  meusProcessos.splice(posicao, 1)
  localStorage.setItem('meusProcessos', JSON.stringify(meusProcessos))
  mostrarProcessos()
}

function irParaPainel(posicao) {
  window.location.search = `/configuracao/painel.html?posicao=${posicao}`;
}

button.addEventListener('click', adicionarNovoProcesso)

document.addEventListener('DOMContentLoaded', function() {
  const botaoBaixar = document.querySelector('.button-download-task');
  botaoBaixar.addEventListener('click', baixarProcessosJson);
});