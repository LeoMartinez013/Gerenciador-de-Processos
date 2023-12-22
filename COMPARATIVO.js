// Recupera os processos do armazenamento local e os parâmetros da URL
let meusProcessos = JSON.parse(localStorage.getItem('meusProcessos'));
const urlParams = new URLSearchParams(window.location.search);
const posicao = urlParams.get('posicao');
let contadorHistorico = 1;

// Função para adicionar uma nova linha de histórico
function adicionarHistorico() {
  contadorHistorico++;
  const historicoDiv = document.getElementById('historico1');
  const novoHistoricoDiv = historicoDiv.cloneNode(true);
  novoHistoricoDiv.id = 'historico' + contadorHistorico;
  const novoHistoricoInputs = novoHistoricoDiv.getElementsByTagName('input');
  for (let i = 0; i < novoHistoricoInputs.length; i++) {
    novoHistoricoInputs[i].value = '';
    novoHistoricoInputs[i].id = 'hist' + contadorHistorico + '-' + i;
    novoHistoricoInputs[i].className = 'hist' + contadorHistorico + ' preenchido';
  }
  historicoDiv.parentNode.appendChild(novoHistoricoDiv);
}

// Função para salvar as configurações do processo
function salvarConfiguracoes() {
  const processo = meusProcessos[posicao];
  // Atualiza as propriedades do processo com os valores dos campos de entrada
  processo.po = document.getElementById(`po`).value;
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
  // Atualiza o array de histórico com os novos valores dos campos de entrada
  const historicosDiv = document.getElementById('historico1').parentNode;
  const historicos = historicosDiv.getElementsByClassName('historicos');
  processo.historico = []; // Limpa o array historico
  for (let i = 0; i < historicos.length; i++) {
    const dateInput = historicos[i].getElementsByClassName('hist' + (i + 1))[0];
    const textInput = historicos[i].getElementsByClassName('hist' + (i + 1))[1];
    const result = dateInput.value + " " + textInput.value;
    console.log(result)
    // Atualiza a entrada existente ou adiciona uma nova
    if (i < processo.historico.length) {
      processo.historico[i] = result;
    } else {
      processo.historico.push(result);
    }
  }

  // Salva os processos atualizados no armazenamento local
  localStorage.setItem('meusProcessos', JSON.stringify(meusProcessos));

  const confirmacao = document.getElementById('confirmacao');
  confirmacao.style.display = 'block';
  setTimeout(() => confirmacao.style.display = 'none', 3000);
}

// Função para preencher os campos de entrada com os valores do processo quando a página é carregada
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
  // Verifica se a etapa do processo é "Desembaraçado" e define a propriedade 'concluido' do objeto 'processo' de acordo
  if (processo.etapa == "Desembaraçado") {
    processo.concluido = true;
  } else {
    processo.concluido = false;
  }

  // Preenche os campos de entrada de histórico com os valores do array de histórico
  if (processo.historico) {
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
      const [dateValue, ...textArray] = processo.historico[i].split(' ');
      const textValue = textArray.join(' ');

      dateInput.value = dateValue;
      textInput.value = textValue;
    }
  }
  contadorHistorico = processo.historico ? processo.historico.length : 0;
  if (posicao) {
    localStorage.setItem('posicao', posicao);
  }

  const inputs = document.getElementsByTagName('input');
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value !== "" && inputs[i].value !== "undefined") {
      inputs[i].classList.add('preenchido');
    } else {
      inputs[i].classList.add('nao_preenchido');
    }
  }
  for (let prop in processo) {
    if (processo[prop] === "" || processo[prop] === "undefined") {
      processo[prop] = "vazio";
    }
  }
}

// Função para adicionar a posição ao parâmetro de consulta da URL antes da página ser descarregada
window.onbeforeunload = function() {
  const posicao = localStorage.getItem('posicao');
  if (posicao) {
    window.location.search = `?posicao=${posicao}`;
    console.log(`posicao`);
  }
}

// Adiciona um ouvinte de evento ao botão 'adicionarHistorico'
document.getElementById('adicionarHistorico').addEventListener('click', adicionarHistorico);

// Executa a função window.onload quando a página é carregada
if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
  window.onload();
} else {
  document.addEventListener("DOMContentLoaded", window.onload);
}
