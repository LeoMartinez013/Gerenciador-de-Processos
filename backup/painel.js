let meusProcessos = JSON.parse(localStorage.getItem('meusProcessos'));
const urlParams = new URLSearchParams(window.location.search);
const posicao = urlParams.get('posicao');

function salvarConfiguracoes() {
    const processo = meusProcessos[posicao]
    processo.po = document.getElementById(`PO`).value
    processo.filial = document.getElementById(`filial`).value
    processo.quantidade = document.getElementById(`quantidade`).value
    processo.produto = document.getElementById(`produto`).value
    processo.etb = document.getElementById(`ETB`).value
    processo.navio = document.getElementById(`navio`).value
    processo.container = document.getElementById(`container`).value
    processo.bl = document.getElementById(`BL`).value
    processo.li = document.getElementById(`LI`).value
    processo.lcpo = document.getElementById(`LCPO`).value
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
    
    var dateH1 = document.getElementById("dateH1").value;
    var textH1 = document.getElementById("textH1").value;
    var resultH1 = dateH1 + " " + textH1;
    processo.historico.hist1 = resultH1 

    localStorage.setItem('meusProcessos', JSON.stringify(meusProcessos))
  
    const confirmacao = document.getElementById('confirmacao')
    confirmacao.style.display = 'block'
    setTimeout(() => confirmacao.style.display = 'none', 3000)
}
window.onload = function() {
  const processo = meusProcessos[posicao]
  document.getElementById(`PO`).value = processo.po
  document.getElementById(`modal`).value = processo.modal
  document.getElementById(`filial`).value = processo.filial
  document.getElementById(`quantidade`).value = processo.quantidade
  document.getElementById(`produto`).value = processo.produto
  document.getElementById(`ETB`).value = processo.etb
  document.getElementById(`navio`).value = processo.navio
  document.getElementById(`container`).value = processo.container
  document.getElementById(`BL`).value = processo.bl
  document.getElementById(`LI`).value = processo.li
  document.getElementById(`LCPO`).value = processo.lcpo
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
  
}
