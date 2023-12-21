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
    console.log(novoHistoricoInputs)
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
  processo.historico = []; // Limpa o array historico
  for (let i = 0; i < historicos.length; i++) {
    const dateInput = historicos[i].getElementsByClassName('hist1')[0];
    const textInput = historicos[i].getElementsByClassName('hist1')[1];
    const result = dateInput.value + " " + textInput.value;
    console.log(result)
    if (!processo.historico.includes(result)) {
      processo.historico.push(result);

  }

  // Alocação dos dados do processo no localStorage
  localStorage.setItem('meusProcessos', JSON.stringify(meusProcessos));

  const confirmacao = document.getElementById('confirmacao');
  confirmacao.style.display = 'block';
  setTimeout(() => confirmacao.style.display = 'none', 3000);
}

// Quando a página é carregada, esta função é executada
window.onload = function() {
  // A variável 'processo' é definida como um item específico do array 'meusProcessos'
  const processo = meusProcessos[posicao];

  // Cada linha abaixo preenche um campo de entrada específico no formulário com um valor do objeto 'processo'
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

  // Verifica se a etapa do processo é "Desembaraçado" e define a propriedade 'concluido' do objeto 'processo' de acordo
  if (processo.etapa == "Desembaraçado") {
    processo.concluido = true;
  } else {
    processo.concluido = false;
  }

  // Obtém o elemento pai de 'historico1'
  const historicosDiv = document.getElementById('historico1').parentNode;

  // Preenche o histórico com base no array 'historico' do objeto 'processo'
  for (let i = 0; i < processo.historico.length; i++) {
    let historico;

    // Cria um novo elemento de histórico se necessário
    if (i > 0) {
      contadorHistorico++;
      historico = document.getElementById('historico1').cloneNode(true);
      historico.id = 'historico' + contadorHistorico;

      // Limpa os valores dos campos de entrada do novo elemento de histórico
      const novoHistoricoInputs = historico.getElementsByTagName('input');
      for (let j = 0; j < novoHistoricoInputs.length; j++) {
        novoHistoricoInputs[j].value = '';
      }

      // Adiciona o novo elemento de histórico ao elemento pai
      historicosDiv.appendChild(historico);
    } else {
      // Obtém o primeiro elemento de histórico existente
      historico = historicosDiv.getElementsByClassName('historicos')[0];
    }

    // Preenche os campos de data e texto do elemento de histórico
    const dateInput = historico.getElementsByClassName('hist1')[0];
    const textInput = historico.getElementsByClassName('hist1')[1];

    // Divide a string de histórico em 'dateValue' e 'textValue'
    const [dateValue, ...textArray] = processo.historico[i].split(' ');
    const textValue = textArray.join(' ');

    dateInput.value = dateValue;
    textInput.value = textValue;
  }

  // Atualiza o valor de 'contadorHistorico' para o número de itens no array 'historico'
  contadorHistorico = processo.historico.length;

  // Se a variável 'posicao' estiver definida, armazena seu valor no armazenamento local do navegador
  if (posicao) {
    localStorage.setItem('posicao', posicao);
  }

  // Adiciona a classe 'preenchido' ou 'nao_preenchido' a cada elemento de entrada na página, dependendo do valor do elemento
  const inputs = document.getElementsByTagName('input');
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value !== "" && inputs[i].value !== "undefined") {
      inputs[i].classList.add('preenchido');
    } else {
      inputs[i].classList.add('nao_preenchido');
    }
  }

  // Se o valor de uma propriedade do objeto 'processo' for vazio ou "undefined", define o valor da propriedade como "vazio"
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

