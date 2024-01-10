// Recupera os processos do armazenamento local e os parâmetros da URL
let clientes = JSON.parse(localStorage.getItem('clientes'))
const urlParams = new URLSearchParams(window.location.search)
const posicao = urlParams.get('posicao')
const clienteNome = urlParams.get('cliente')
let cliente = clientes.find(c => c.cliente === clienteNome)
let contadorHistorico = 1

let processo
if (cliente) {
  processo = cliente.processos[posicao]
}
window.onload = function() {
  if (processo) {
    document.getElementById(`po`).value = processo.po
    const insOP = document.getElementById('recebCliente')
    insOP.innerText = clienteNome
    document.getElementById(`modal`).value = processo.modal
    document.getElementById(`filial`).value = processo.filial
    baixarFiliais()
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
    document.getElementById(`etapa`).value = processo.etapa
    baixarEtapas()
    for (let i = 0; i < 30; i++) {
      if(processo.historico[i]){
        // Supondo que a data e o texto estejam separados por um espaço
        let parts = processo.historico[i].split(" ")
        
        // Encontra os inputs correspondentes
        let dateInput = document.getElementById('dateH' + (i + 1))
        let textInput = document.getElementById('textH' + (i + 1))

        // Preenche os inputs com os valores correspondentes
        dateInput.value = parts[0]
        textInput.value = parts.slice(1).join(' ')
      }
    }
    
  }
  const inputs = document.getElementsByTagName('input')
  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i].value !== "" && inputs[i].value !== "undefined") {
      inputs[i].classList.add('preenchido')
    } else {
      inputs[i].classList.add('nao_preenchido')
    }
  }
}
function baixarFiliais() {
  let baixar = JSON.parse(localStorage.getItem('configs'))
  let clienteAtual = baixar.clientes.find(c => c.cliente === cliente.cliente)
  let linhaFiliais = ''
  clienteAtual.filiais.forEach((filial, posicao) => {
    if (!filial == ''){
      linhaFiliais =
      linhaFiliais +
      `
      <option value="${filial}">${filial}</option>
      `
    }
  })
  document.querySelector('#filial').innerHTML = linhaFiliais
}
function baixarEtapas() {
  let baixar = JSON.parse(localStorage.getItem('configs'))
  let linhaEtapas = ''
  baixar.etapas.forEach((etapa, posicao) => {
    if (!filial == ''){
      linhaEtapas =
      linhaEtapas +
      `
      <option value="${etapa}">${etapa}</option>
      `
    }
  })
  document.querySelector('#etapa').innerHTML = linhaEtapas
}
function verHists1() {
  let caixa1 = document.getElementById('caixa3')
  let caixa2 = document.getElementById('caixa4')
  let salvar = document.getElementById('caixa5')
  let botao1 = document.getElementById('button-ver-hists1')
  let botao2 = document.getElementById('button-ver-hists2')
  
  // Verifica se a caixa está sendo exibida
  if (botao1.innerText === "Mostrar históricos...") {
    // Se a caixa estiver oculta, mostra a caixa e atualiza o texto do botão
    caixa1.style.display = "grid"
    salvar.style.display = "block"
    botao1.innerText = "Ocultar históricos"
    botao2.style.display = "block"
    botao2.innerText = "Mostrar mais..."
    console.log("mostrando caixa 1")
  } else {
    // Se a caixa estiver sendo exibida, oculta a caixa e atualiza o texto do botão
    caixa1.style.display = "none"
    caixa2.style.display = "none"
    salvar.style.display = "none"
    botao1.innerText = "Mostrar históricos..."
    botao2.innerText = "Mostrar mais..."
    botao2.style.display = "none"
    console.log("escondendo caixa 1 e 2")
  }
}
function verHists2() {
  let caixa2 = document.getElementById('caixa4')
  let botao2 = document.getElementById('button-ver-hists2')
  
  // Verifica se a caixa está sendo exibida
  if (botao2.innerText === "Mostrar mais...") {
    // Se a caixa estiver oculta, mostra a caixa e atualiza o texto do botão
    caixa2.style.display = "block"
    botao2.innerText = "Ocultar históricos"
    console.log("mostrando caixa 2")
  } else {
    // Se a caixa estiver sendo exibida, oculta a caixa e atualiza o texto do botão
    caixa2.style.display = "none"
    botao2.innerText = "Mostrar mais..."
    console.log("escondendo caixa 2")
  }
}
// Função para salvar as configurações do processo
function salvarConfiguracoes() {
  if (processo) {
    processo.po = document.getElementById(`po`).value
    processo.modal = document.getElementById(`modal`).value
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
    // Verifica se a etapa do processo é "Desembaraçado" e define a propriedade 'concluido' do objeto 'processo' de acordo
    if (processo.etapa == "Desembaraçado") {
      processo.concluido = true
    } else {
      processo.concluido = false
    }
    console.log(processo.concluido)
    
    for (let i = 0; i < 30; i++) {
      let historico = document.getElementById('historico' + (i + 1))
      let dateInput = historico.querySelector('#dateH' + (i + 1))
      let textInput = historico.querySelector('#textH' + (i + 1))
      if (dateInput && textInput) {
        let result = dateInput.value + " " + textInput.value
        processo.historico[i] = result
        console.log(result)
      }
    }
  }
  
  // Salva os processos atualizados no armazenamento local
  localStorage.setItem('clientes', JSON.stringify(clientes))

  console.groupCollapsed(processo)

  const confirmacao = document.getElementById('confirmacao')
  confirmacao.style.display = 'flex'
  setTimeout(() => confirmacao.style.display = 'none', 2000)
}

// Função para adicionar a posição ao parâmetro de consulta da URL antes da página ser descarregada
window.onbeforeunload = function() {
  const posicao = localStorage.getItem('posicao')
  if (posicao) {
    window.location.search = `?posicao=${posicao}`
    console.log(`posicao`)
  }
}

// Executa a função window.onload quando a página é carregada
if (document.readyState === "complete" || (document.readyState !== "loading" && !document.documentElement.doScroll)) {
  window.onload()
} else {
  document.addEventListener("DOMContentLoaded", window.onload)
}
//========================================================================