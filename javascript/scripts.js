const inputCliente = document.querySelector('#input-cliente')
const input = document.querySelector('#input-processo')
const button = document.querySelector('#button-add-processo')
const listaCompleta = document.querySelector('#list-processos')
var clientes = [];

window.onload = function() {
  clientes = JSON.parse(localStorage.getItem('clientes')) || [];
  mostrarClientes();
  
}

function adicionarNovoProcesso() {
  let dataAtual = new Date()
  let year = dataAtual.getFullYear()
  let month = dataAtual.getMonth() + 1
  if (month < 10) month = '0' + month
  let mesAtual = `${year}-${month}`
  let clienteNome = inputCliente.value;
  let cliente = clientes.find(c => c.cliente === clienteNome)

  if (!cliente) {
    cliente = {
      cliente: clienteNome,
      processos: []
    }
    clientes.push(cliente)
  }
    cliente.processos.push({
    po: input.value,
    concluido: false,
    modal: "Marítimo",
    filial: "São Paulo",
    quantidade: "",
    produto: "",
    etb: "",
    navio: "",
    container: "",
    bl: "",
    li: "",
    lcpo: "",
    descarga: "",
    apresDcts: "",
    inspecaoMAPA: "",
    deferimento: "",
    registroDI: "",
    numDI: "",
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
  })

  input.value = ''
  localStorage.setItem('clientes', JSON.stringify(clientes))
  mostrarClientes()
}
function mostrarClientes() {
  let novaLi = ''

  clientes.forEach((cliente, posicao) => {
    // Verifique se o cliente tem processos
    if (cliente.processos.length === 0) {
      return; // Continue para o próximo cliente se este não tiver processos
    }

    // Substitua os espaços por sublinhados
    let clienteNomeClasse = cliente.cliente.replace(/ /g, '_')

    novaLi =
      novaLi +
      `
      <div class="cliente-titulo" onclick="esconderProcessos('${cliente.cliente}')">
        <div id="cliente-nome">${cliente.cliente}</div>
      </div>
      `
    novaLi = novaLi + `<div class="${clienteNomeClasse}" style="display: none;">` + mostrarProcessos(cliente.cliente) + `</div>`
  })
  
  listaCompleta.innerHTML = novaLi;
}

function mostrarProcessos(clienteNome) {
  let cliente = clientes.find(c => c.cliente === clienteNome)
  if (!cliente) return ''

  // Substitua os espaços por sublinhados
  let clienteNomeClasse = clienteNome.replace(/ /g, '_')
  let novaLi = ""

  cliente.processos.forEach((item, posicao) => {
    novaLi =
      novaLi +
      `
      <div class="processo ${item.concluido && 'concluido' || 'nao_concluido'}" onclick="window.location='configuracao/painel.html?posicao=${posicao}&cliente=${clienteNome}'">
        <div class="po c1">${item.po}</div>
        <div class="bl c2"> ${item.bl || 'Vazio'}</div>
        <div class="etapa c3"> ${item.etapa || 'Vazio'}</div>
        <div class="mesOperacao c4"> ${item.mesOperacao || 'Vazio'}</div>
        <div class="c5">
          <img class="icone" src="./assets/trash.png" alt="excluir-processo" onclick="event.stopPropagation(); deletarProcesso('${clienteNome}', ${posicao})">
        </div>
      </div>
      `
  })
  return novaLi;
}

function esconderProcessos(clienteNome) {
  let clienteNomeClasse = clienteNome.replace(/ /g, '_');

  const processos = document.querySelectorAll('.' + clienteNomeClasse);
  for (let i = 0; i < processos.length; i++) {
    if (processos[i].style.display == 'none') {
      processos[i].style.display = 'grid'
    } else {
      processos[i].style.display = 'none'
    }
  }
}
function concluirProcesso(posicao) {
  meusProcessos[posicao].concluido = !meusProcessos[posicao].concluido
  localStorage.setItem('meusProcessos', JSON.stringify(meusProcessos))
  mostrarProcessos()
}

function deletarProcesso(clienteNome, posicao) {
  let cliente = clientes.find(c => c.cliente === clienteNome)
  if (cliente) {
    cliente.processos.splice(posicao, 1)
  }

  localStorage.setItem('clientes', JSON.stringify(clientes))
  mostrarClientes();
}
button.addEventListener('click', adicionarNovoProcesso)
document.addEventListener('DOMContentLoaded', function() {
  const botaoBaixarJSON = document.querySelector('#opc-baixar-json')
  const botaoBaixarTXT = document.querySelector('#opc-baixar-txt')
  botaoBaixarJSON.addEventListener('click', baixarClientesJSON)
  botaoBaixarTXT.addEventListener('click', baixarClientesTXT)
});