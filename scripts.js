const button = document.querySelector('.button-add-processo')
const input = document.querySelector('.input-processo')
const listaCompleta = document.querySelector('.list-processos')

let meusProcessos = JSON.parse(localStorage.getItem('meusProcessos')) || {};

window.onload = function() {
  meusProcessos = JSON.parse(localStorage.getItem('meusProcessos')) || []
  mostrarProcessos()
}

function esconderOpcsBaixar() {
  const bJSON = document.getElementById('opc-baixar-json')
  const bTXT = document.getElementById('opc-baixar-txt')
  const situacao = document.getElementById('button-download-processo')
  situacao.value = "exibir"
  bJSON.style.display = "none"
  bTXT.style.display = "none"
}
function exibirOpcsBaixar() {
  const bJSON = document.getElementById('opc-baixar-json')
  const bTXT = document.getElementById('opc-baixar-txt')
  const situacao = document.getElementById('button-download-processo')
  situacao.value = "ocultar"
  bJSON.style.display = "flex"
  bTXT.style.display = "flex"
}
function bottaoOpcsBaixar() {
  const situacao = document.getElementById('button-download-processo')
  console.log(situacao.value)
  if (situacao.value === "exibir"){
    exibirOpcsBaixar()
  } else {
    esconderOpcsBaixar()
  }
}
// Baixar como .json
function baixarProcessosJSON() {
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
function baixarProcessosTXT() {
  const data = JSON.stringify(meusProcessos, null, 2);
  const blob = new Blob([data], {type: 'text/plain'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'processos.txt';
  link.click();
  URL.revokeObjectURL(url);
}
// Importar
function importarProcessos(event) {
  let file = event.target.files[0];
  if (file) {
    let reader = new FileReader();

    reader.onload = function(e) {
      // Adicionar novos processos à lista existente
      let novosProcessos = JSON.parse(e.target.result);
      meusProcessos = meusProcessos.concat(novosProcessos);

      // Armazenar a lista atualizada de volta no localStorage
      localStorage.setItem('meusProcessos', JSON.stringify(meusProcessos));

      window.location.reload();
    };
    reader.readAsText(file);
  }
}


function adicionarNovoProcesso() {
  let dataAtual = new Date();
  let year = dataAtual.getFullYear();
  let month = dataAtual.getMonth() + 1;
  if (month < 10) month = '0' + month;
  let mesAtual = `${year}-${month}`;

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
    mesOperacao: mesAtual, // Mês atual
    etapa: "AG. Atração",
    historico: [
      "", "", "", "", "", "", "", "", "", "", 
      "", "", "", "", "",   "", "", "", "", "", 
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
  const botaoBaixarJSON = document.querySelector('#opc-baixar-json');
  const botaoBaixarTXT = document.querySelector('#opc-baixar-txt')
  botaoBaixarJSON.addEventListener('click', baixarProcessosJSON);
  botaoBaixarTXT.addEventListener('click', baixarProcessosTXT);
});