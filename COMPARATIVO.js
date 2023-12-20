// Inicializando variáveis
let meusProcessos = JSON.parse(localStorage.getItem('meusProcessos'));
const urlParams = new URLSearchParams(window.location.search);
const posicao = urlParams.get('posicao');
let contadorHistorico = 1;

// Função para adicionar um novo histórico
function adicionarHistorico() {
  // Incrementando o contador de histórico
  contadorHistorico++;
  
  // Obtendo o elemento do primeiro histórico
  const historicoDiv = document.getElementById('historico1');
  
  // Removendo o botão de exclusão existente antes de clonar
  const botaoExcluirExistente = historicoDiv.querySelector('button');
  if (botaoExcluirExistente) {
    historicoDiv.removeChild(botaoExcluirExistente);
  }
  
  // Clonando o elemento do histórico
  const novoHistoricoDiv = historicoDiv.cloneNode(true);
  
  // Atualizando o id do novo elemento de histórico
  novoHistoricoDiv.id = 'historico' + contadorHistorico;

  // Limpando os campos de input do novo elemento de histórico
  const novoHistoricoInputs = novoHistoricoDiv.getElementsByTagName('input');
  for (let i = 0; i < novoHistoricoInputs.length; i++) {
    novoHistoricoInputs[i].value = '';
  }
  
  // Adicionando o novo elemento de histórico ao DOM
  historicoDiv.parentNode.appendChild(novoHistoricoDiv);

  // Criando o botão de exclusão
  const botaoExcluir = document.createElement('button');
  botaoExcluir.textContent = 'Excluir Histórico';
  botaoExcluir.onclick = function() {
    novoHistoricoDiv.remove();
  };
  
  // Adicionando o botão de exclusão ao novo elemento de histórico
  novoHistoricoDiv.appendChild(botaoExcluir);
  
  // Adicionando o botão de exclusão de volta ao elemento de histórico original
  if (botaoExcluirExistente) {
    historicoDiv.appendChild(botaoExcluirExistente);
  }
}

// Função para salvar as configurações
function salvarConfiguracoes() {
  // Obtendo o processo atual
  const processo = meusProcessos[posicao];
  
  // Atualizando os valores do processo com os valores dos campos de input
  processo.po = document.getElementById(`po`).value;
  processo.filial = document.getElementById(`filial`).value;
  processo.quantidade = document.getElementById(`quantidade`).value;
  processo.produto = document.getElementById(`produto`).value;
  processo.etb = document.getElementById(`etb`).value;
  processo.navio = document.getElementById(`navio`).value;
  processo.container = document.getElementById(`container`).value;
  processo.bl = document.getElementById(`bl`).value;
  processo.li = document.getElementById(`li`).value;
  processo.lcpo = document.getElementById(`lcpo`).value;
  processo.descarga = document.getElementById(`descarga`).value;
  processo.inspecaoMAPA = document.getElementById(`inspecaoMAPA`).value;
  processo.apresDcts = document.getElementById(`apresDcts`).value;
  processo.deferimento = document.getElementById(`deferimento`).value;
  processo.registroDI = document.getElementById(`registroDI`).value;
  processo.numDI = document.getElementById(`numDI`).value;
  processo.desembaraco = document.getElementById(`desembaraco`).value;
  processo.envNFs = document.getElementById(`envNFs`).value;
  processo.dctsTransporte = document.getElementById(`dctsTransporte`).value;
  processo.mesOperacao = document.getElementById(`mesOperacao`).value;
  processo.etapa = document.getElementById(`etapa`).value;
  
  // Salvando os históricos
  const historicosDiv = document.getElementById('historico1').parentNode;
  const historicos = historicosDiv.getElementsByClassName('historicos');
  processo.historico = [];
  for (let i = 0; i < historicos.length; i++) {
    const dateInput = historicos[i].getElementsByClassName('hist1')[0];
    const textInput = historicos[i].getElementsByClassName('hist1')[1];
    const result = dateInput.value + " " + textInput.value;
    processo.historico.push(result);
  }
  
  // Salvando o processo no local storage
  localStorage.setItem('meusProcessos', JSON.stringify(meusProcessos));

  // Exibindo a confirmação
  const confirmacao = document.getElementById('confirmacao');
  confirmacao.style.display = 'block';
  setTimeout(() => confirmacao.style.display = 'none', 3000);
}

// Função que é executada quando a página é carregada
window.onload = function() {
  // Obtendo o processo atual
  const processo = meusProcessos[posicao];
  
  // Preenchendo os campos de input com os valores do processo
  document.getElementById(`po`).value = processo.po;
  document.getElementById(`modal`).value = processo.modal;
  document.getElementById(`filial`).value = processo.filial;
  document.getElementById(`quantidade`).value = processo.quantidade;
  document.getElementById(`produto`).value = processo.produto;
  document.getElementById(`etb`).value = processo.etb;
  document.getElementById(`navio`).value = processo.navio;
  document.getElementById(`container`).value = processo.container;
  document.getElementById(`bl`).value = processo.bl;
  document.getElementById(`li`).value = processo.li;
  document.getElementById(`lcpo`).value = processo.lcpo;
  document.getElementById(`descarga`).value = processo.descarga;
  document.getElementById(`apresDcts`).value = processo.apresDcts;
  document.getElementById(`inspecaoMAPA`).value = processo.inspecaoMAPA;
  document.getElementById(`deferimento`).value = processo.deferimento;
  document.getElementById(`registroDI`).value = processo.registroDI;
  document.getElementById(`numDI`).value = processo.numDI;
  document.getElementById(`desembaraco`).value = processo.desembaraco;
  document.getElementById(`envNFs`).value = processo.envNFs;
  document.getElementById(`dctsTransporte`).value = processo.dctsTransporte;
  document.getElementById(`mesOperacao`).value = processo.mesOperacao;
  document.getElementById(`etapa`).value = processo.etapa;
  
  // Verificando se o processo está concluído
  if (processo.etapa == "Desembaraçado") {
    processo.concluido = true;
  } else {
    processo.concluido = false;
  }

  // Preenchendo os campos de histórico com os valores do processo
  const historicosDiv = document.getElementById('historico1').parentNode;
  for (let i = 0; i < processo.historico.length; i++) {
    let historico;
    if (i > 0) {
      contadorHistorico++;
      historico = document.getElementById('historico1').cloneNode(true);
      historico.id = 'historico' + contadorHistorico;
      const novoHistoricoInputs = historico.getElementsByTagName('input');
      for (let j = 0; j < novoHistoricoInputs.length; j++) {
        novoHistoricoInputs[j].value = '';
      }
      historicosDiv.appendChild(historico);
    } else {
      historico = historicosDiv.getElementsByClassName('historicos')[0];
    }
    const dateInput = historico.getElementsByClassName('hist1')[0];
    const textInput = historico.getElementsByClassName('hist1')[1];
    const [dateValue, textValue] = processo.historico[i].split(' ');
    dateInput.value = dateValue;
    textInput.value = textValue;

    // Adicionando um botão de exclusão a cada linha de histórico
    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = 'Excluir Histórico';
    botaoExcluir.onclick = function() {
      historico.remove();
    };
    historico.appendChild(botaoExcluir);
  }
  contadorHistorico = processo.historico.length;
  
  // Salvando a posição atual no local storage
  if (posicao) {
    localStorage.setItem('posicao', posicao);
  }
  
  // Adicionando classes aos campos de input com base em seus valores
  const inputs = document.getElementsByTagName('input');
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value !== "" && inputs[i].value !== "undefined") {
      inputs[i].classList.add('preenchido');
    } else {
      inputs[i].classList.add('nao_preenchido');
    }
  }
  
  // Atualizando os valores vazios do processo
  for (let prop in processo) {
    if (processo[prop] === "" || processo[prop] === "undefined") {
      processo[prop] = "vazio";
    }
  }
}

// Função que é executada antes da página ser descarregada
window.onbeforeunload = function() {
  // Salvando a posição atual na URL
  const posicao = localStorage.getItem('posicao');
  if (posicao) {
    window.location.search = `?posicao=${posicao}`;
    console.log(`posicao`);
  }
}

// Adicionando um ouvinte de evento ao botão de adicionar histórico
document.getElementById('adicionarHistorico').addEventListener('click', adicionarHistorico);

// Verificando se a página já foi carregada
if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
  window.onload();
} else {
  document.addEventListener("DOMContentLoaded", window.onload);
}
//===================
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

  const botaoExcluir = document.createElement('button');
  botaoExcluir.textContent = 'Excluir Histórico';
  botaoExcluir.onclick = function() {
    novoHistoricoDiv.remove();
  };
  novoHistoricoDiv.appendChild(botaoExcluir);
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
    if (historicos[i].style.display !== 'none') { // Adicione esta linha
      const dateInput = historicos[i].getElementsByClassName('hist1')[0];
      const textInput = historicos[i].getElementsByClassName('hist1')[1];
      const result = dateInput.value + " " + textInput.value;
      processo.historico.push(result);
    }
  }
  localStorage.setItem('meusProcessos', JSON.stringify(meusProcessos));

  const confirmacao = document.getElementById('confirmacao');
  confirmacao.style.display = 'block';
  setTimeout(() => confirmacao.style.display = 'none', 3000);
}

window.onload = function() {
  const processo = meusProcessos[posicao];
  const historicoDiv = document.getElementById('historico1');
  const botaoExcluir = document.createElement('button');
  botaoExcluir.textContent = 'Excluir Histórico';
  botaoExcluir.onclick = function() {
    historicoDiv.remove();
  };
  historicoDiv.appendChild(botaoExcluir);
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
    let historico;
    if (i > 0) {
      contadorHistorico++;
      historico = document.getElementById('historico1').cloneNode(true);
      historico.id = 'historico' + contadorHistorico;
      const novoHistoricoInputs = historico.getElementsByTagName('input');
      for (let j = 0; j < novoHistoricoInputs.length; j++) {
        novoHistoricoInputs[j].value = '';
      }
      historicosDiv.appendChild(historico);
    } else {
      historico = historicosDiv.getElementsByClassName('historicos')[0];
    }
    const dateInput = historico.getElementsByClassName('hist1')[0];
    const textInput = historico.getElementsByClassName('hist1')[1];
    const [dateValue, textValue] = processo.historico[i].split(' ');
    dateInput.value = dateValue;
    textInput.value = textValue;

    const botaoExcluir = document.createElement('button');
    botaoExcluir.textContent = 'Excluir Histórico';
    botaoExcluir.onclick = function() {
      historico.remove();
    };
    historico.appendChild(botaoExcluir);
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