let meusProcessos = JSON.parse(localStorage.getItem('meusProcessos'));
const urlParams = new URLSearchParams(window.location.search);
const posicao = urlParams.get('posicao');
let contadorHistorico = 1;

function adicionarHistorico() {
  contadorHistorico++;
  const historicoDiv = document.getElementById('historico1');
  const novoHistoricoDiv = historicoDiv.cloneNode(true);
  novoHistoricoDiv.id = 'historico' + contadorHistorico;
  const novoHistoricoInputs = novoHistoricoDiv.getElementsByTagName('input');
  for (let i = 0; i < novoHistoricoInputs.length; i++) {
    novoHistoricoInputs[i].value = '';
  }
  historicoDiv.parentNode.appendChild(novoHistoricoDiv);
}

function salvarConfiguracoes() {
  const processo = meusProcessos[posicao];
  processo.po = document.getElementById(`po`).value
  processo.filial = document.getElementById(`filial`).value
  processo.quantidade = document.getElementById(`quantidade`).value
  processo.produto = document.getElementById(`produto`).value
  processo.etb = document.getElementById(`etb`).value
  processo.navio = document.getElementById(`navio`).value
  processo.container = document.getElementById(`container`).value
  processo.bl = document.getElementById(`bl`).value
  processo.li = document.getElementById(`li`).value
  processo.lcpo = document.getElementById(`lcpo`).value
  processo.descarga = document.getElementById(`descarga`).value
  processo.inspecaoMAPA = document.getElementById(`inspecaoMAPA`).value
  processo.apresDcts = document.getElementById(`apresDcts`).value
  processo.deferimento = document.getElementById(`deferimento`).value
  processo.registroDI = document.getElementById(`registroDI`).value
  processo.numDI = document.getElementById(`numDI`).value
  processo.desembaraco = document.getElementById(`desembaraco`).value
  processo.envNFs = document.getElementById(`envNFs`).value
  processo.dctsTransporte = document.getElementById(`dctsTransporte`).value
  processo.mesOperacao = document.getElementById(`mesOperacao`).value
  processo.etapa = document.getElementById(`etapa`).value
  
  const historicosDiv = document.getElementById('historico1').parentNode;
  const historicos = historicosDiv.getElementsByClassName('historicos');
  processo.historico = [];
  for (let i = 0; i < historicos.length; i++) {
    const dateInput = historicos[i].getElementsByClassName('hist1')[0];
    const textInput = historicos[i].getElementsByClassName('hist1')[1];
    const result = dateInput.value + " " + textInput.value;
    processo.historico.push(result);
  }


  // Alocação dos dados do processo no localStorage
  localStorage.setItem('meusProcessos', JSON.stringify(meusProcessos));

  const confirmacao = document.getElementById('confirmacao');
  confirmacao.style.display = 'block';
  setTimeout(() => confirmacao.style.display = 'none', 3000);
}

window.onload = function() {
  const processo = meusProcessos[posicao];
  document.getElementById(`po`).value = processo.po;
  document.getElementById(`modal`).value = processo.modal
  document.getElementById(`filial`).value = processo.filial
  document.getElementById(`quantidade`).value = processo.quantidade
  document.getElementById(`produto`).value = processo.produto
  document.getElementById(`etb`).value = processo.etb
  document.getElementById(`navio`).value = processo.navio
  document.getElementById(`container`).value = processo.container
  document.getElementById(`bl`).value = processo.bl
  document.getElementById(`li`).value = processo.li
  document.getElementById(`lcpo`).value = processo.lcpo
  document.getElementById(`descarga`).value = processo.descarga
  document.getElementById(`apresDcts`).value = processo.apresDcts
  document.getElementById(`inspecaoMAPA`).value = processo.inspecaoMAPA
  document.getElementById(`deferimento`).value = processo.deferimento
  document.getElementById(`registroDI`).value = processo.registroDI
  document.getElementById(`numDI`).value = processo.numDI
  document.getElementById(`desembaraco`).value = processo.desembaraco
  document.getElementById(`envNFs`).value = processo.envNFs
  document.getElementById(`dctsTransporte`).value = processo.dctsTransporte
  document.getElementById(`mesOperacao`).value = processo.mesOperacao
  document.getElementById(`etapa`).value = processo.etapa;
  if (processo.etapa == "Desembaraçado") {
    processo.concluido = true;
  } else {
    processo.concluido = false;
  }

  const historicosDiv = document.getElementById('historico1').parentNode;
  for (let i = 0; i < processo.historico.length; i++) {
    if (i > 0) {
      adicionarHistorico();
    }
    const historico = historicosDiv.getElementsByClassName('historicos')[i];
    const dateInput = historico.getElementsByClassName('hist1')[0];
    const textInput = historico.getElementsByClassName('hist1')[1];
    const splitHistorico = processo.historico[i].split(' ');
    const dateValue = splitHistorico.shift();
    const textValue = splitHistorico.join(' ');
    dateInput.value = dateValue;
    textInput.value = textValue;
  }
  contadorHistorico = processo.historico.length;
  
  if (posicao) {
    localStorage.setItem('posicao', posicao);
  }

  // Adiciona a classe aos campos de entrada
  const inputs = document.getElementsByTagName('input');
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value !== "" && inputs[i].value !== "undefined") {
      inputs[i].classList.add('preenchido');
    } else {
      inputs[i].classList.add('nao_preenchido');
    }
  }

  // Altera os valores das propriedades do objeto `processo`
  for (let prop in processo) {
    if (processo[prop] === "" || processo[prop] === "undefined") {
      processo[prop] = "vazio";
    }
  }
}
window.onbeforeunload = function() {
  const posicao = localStorage.getItem('posicao');
  if (posicao) {
    window.location.search = `?posicao=${posicao}`;
    console.log(`posicao`);
  }
}
document.getElementById('adicionarHistorico').addEventListener('click', adicionarHistorico);

if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
  window.onload();
} else {
  document.addEventListener("DOMContentLoaded", window.onload);
}
//==============================================
