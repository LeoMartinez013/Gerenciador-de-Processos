const listaClientes = document.querySelector('#sub-section-1-1')
const inputAddCliente  = document.querySelector('#input-cliente')
const checkbox = document.querySelector('#receber-avisos')
const inputAddEtapa = document.querySelector('#input-etapa')
const etapas = document.querySelector('#mostrar-etapas')

var configs = {
  avisos: true,
  etapas: [],  
  clientes: [] 
};
window.onload = function() {
  var storedConfigs = JSON.parse(localStorage.getItem('configs'));
  if (storedConfigs) {
    configs = storedConfigs;
  }

  mostrarClientes()
  mostrarEtapas()
  checkbox.checked = configs.avisos
}

//=============================================================
//  SECTION 1
//=============================================================
function mostrarClientes() {
  let novaLinha = ''
  console.log('Listando clientes:')

  configs.clientes.forEach((cliente, posicao) => {
    let clienteNome = cliente.cliente.replace(/ /g, '-')
    console.log(' - ' + cliente.cliente)
    novaLinha =
      novaLinha +
      `
      <div id="cliente-${clienteNome}" class="clientes">
        <!--<div>
          <input type="checkbox" name="selecionar-${clienteNome}" id="selecionar-${clienteNome}" class="selecoes">
        </div>-->
        <div id="clienteNome-${clienteNome}" class="clientesNome">
          ${cliente.cliente}
        </div>
        <div id="excluir-${clienteNome}" class="excluir" onclick="excluirCliente('${cliente.cliente}', ${posicao})">
          Excluir
        </div>
        <div id="mudarFiliais-${clienteNome}" class="mudarFiliais" onclick="esconderFiliais('${clienteNome}')">
          Filiais
        </div>
        <div id="mudarNome-${clienteNome}" class="mudarNome" onclick="esconderMudarNome('${clienteNome}')">
          Mudar nome
        </div>
      </div>
      <div id="${clienteNome}-filiais" class="cliente-filiais" style="display: none">
        ` + mostrarFiliais(cliente.cliente) + `
        <button 
          id="button-atualizarCliente-${clienteNome}" 
          class="buttons-atualizarCliente"
          style="display: none"
          onclick="atualizarFiliais('${cliente.cliente}', '${clienteNome}')">
          
          Salvar alterações
        </button>
      </div>
      <div id="caixa-mudarNome-${clienteNome}" class="caixa-mudarNome" style="display: none;">
        <p>Insira o novo nome do cliente "${cliente.cliente}"</p>
        <input type="text" id="mudarNome-input-${clienteNome}" class="mudarNome-input" placeholder="${cliente.cliente}" value="${cliente.cliente}">
        <div id="mudarNome-buttons">
          <button id="mudarNome-salvar" onclick="atualizarNome('${cliente.cliente}', '${clienteNome}')">Salvar</button>
          <button id="mudarNome-cancelar" onclick="esconderMudarNome('${clienteNome}')">Cancelar</button>
        </div>
      </div>
      `
  }) 

  listaClientes.innerHTML = novaLinha
}
function mostrarFiliais(clienteReceb) {
  let cliente = configs.clientes.find(c => c.cliente === clienteReceb)
  let clienteNome = cliente.cliente.replace(/ /g, '-')
  let linhaFiliais = ''
  let contFiliais = 0
  cliente.filiais.forEach((filial, posicao) => {
    linhaFiliais =
      linhaFiliais +
      `
      <input type="text" 
        value="${filial}" 
        id="${clienteNome}-filial-${contFiliais+1}-input" 
        class="filiais-input">
      `
    contFiliais++
  })
  return linhaFiliais
}
function esconderFiliais(clienteNome) {
  // Substitua os espaços por sublinhados e adicione um sufixo
  const filiais = document.querySelector('#' + clienteNome + '-filiais')
  const divCliente = document.querySelector('#cliente-' + clienteNome)
  const buttonAtualizar = document.querySelector('#button-atualizarCliente-' + clienteNome)
  if (filiais.style.display == 'none') {
    divCliente.style.borderRadius = '5px 5px 0 0'
    buttonAtualizar.style.display = 'block'
    filiais.style.display = 'flex'
    console.log('Mostrando filiais de ' + clienteNome)
  } else {
    divCliente.style.borderRadius = '5px'
    filiais.style.display = 'none'
    buttonAtualizar.style.display = 'none'
    console.log('Ocultando filiais de ' + clienteNome)
  }
}
function esconderMudarNome(clienteNome) {
  const dialog = document.querySelector('#caixa-mudarNome-' + clienteNome)
  const overlay = document.querySelector('#overlay')
  if (dialog.style.display == 'none') {
    dialog.style.display = 'block'
    overlay.style.display = 'block'; 
  } else {
    dialog.style.display = 'none'
    overlay.style.display = 'none'; 
  }
}
function atualizarFiliais(clienteReceb, clienteNome) {
  let cliente = configs.clientes.find(c => c.cliente === clienteReceb)
  let novaFilial
  if (cliente) {
    console.log('Atualizando filiais de ' + cliente.cliente)
    for (let i = 0; i < cliente.filiais.length; i++) {
       novaFilial = document.querySelector('#' + clienteNome + '-filial-' + (i+1) + '-input').value
       console.log(novaFilial)
        cliente.filiais[i] = novaFilial
        console.log('Atualizando filial ' + (i+1) + ' para ' + novaFilial)
    }
  }
  localStorage.setItem('configs', JSON.stringify(configs))
  mostrarClientes();
}
// Função para atualizar um valor de configs.clientes
function atualizarNome(clienteReceb, clienteNome) {
  let cliente = configs.clientes.find(c => c.cliente === clienteReceb)
  if (cliente) {
    let novoNome = document.querySelector('#mudarNome-input-' + clienteNome).value
    if (novoNome && novoNome.trim() !== '') {
      console.log('Atualizando nome do cliente ' + cliente.cliente + ' para ' + novoNome)
      cliente.cliente = novoNome
    }
  }
  esconderMudarNome(clienteNome)
  localStorage.setItem('configs', JSON.stringify(configs))
  mostrarClientes();
}
// Função para excluir um valor de configs.clientes[]
function excluirCliente(clienteNome, posicao) {
  let cliente = configs.clientes.find(c => c.cliente === clienteNome)
  if (cliente) {
    if (configs.avisos) {
      if (confirm(`Você deseja excluir o Cliente ${clienteNome}?`) == true) {
        configs.clientes.splice(posicao, 1)
      }
    } else {
      configs.clientes.splice(posicao, 1)
    }
    
  }

  localStorage.setItem('configs', JSON.stringify(configs))
  mostrarClientes();
}
//=============================================================
//  SECTION 3
//=============================================================
//  Função para mudar o valor de configs.avisos
function verifReceberAvisos() {
  configs.avisos = checkbox.checked

  localStorage.setItem('configs', JSON.stringify(configs))
}
// Função para adicionar novos valores de configs.etapas[]
function criarEtapa() {
  console.log('teste')
  if (inputAddEtapa.value.trim() === '') {
    inputAddEtapa.style.backgroundColor = '#f8bab6'
    setTimeout(function() {
      inputAddEtapa.style.backgroundColor = '#FFFFFF'
    }, 2000)
    return
  }
  let verificar = configs.etapas.find(etapa => etapa === inputAddEtapa.value)
  if (!verificar) {
    configs.etapas.push(inputAddEtapa.value)
  }
  localStorage.setItem('configs', JSON.stringify(configs))
  mostrarEtapas()
}
// Função para mostrar todas os valores de configs.etapas[]
function mostrarEtapas() {
  let etapaID = ''
  let linhas = ''
  let contEtapas = 0
  configs.etapas.forEach((etapa, posicao) => {
    etapaID = etapa.replace(/ /g, '-')
    linhas =
      linhas +
      `
      <div id="cont-etapa-${etapaID}" class="cont-etapas">
        <div id="etapa-${etapaID}" class="etapa">${etapa}</div>
        <div onclick="excluirEtapa('${etapa}', ${posicao})" class="cont-excluir-etapa">
          <img src="../assets/trash.png" alt="" id="excluir-${etapaID}" class="excluir-etapa">
        </div>
      </div>
      `
    contEtapas++
  })
  etapas.innerHTML = linhas
}
// Função para excluir um valor de configs.etapas[]
function excluirEtapa(etapaReceb, posicao) {
  let etapa = configs.etapas.find(etapa => etapa === etapaReceb)
  if (etapa) {
    configs.etapas.splice(posicao, 1)
  }
  localStorage.setItem('configs', JSON.stringify(configs))
  mostrarEtapas();
}
//=============================================================
//  SECTION 2
//=============================================================
// Função para adicionar um novo valor a configs.clientes[]
function adicionarNovoCliente() {
  let clienteNome = inputAddCliente.value;
  if (inputAddCliente.value.trim() === '') {
    inputAddCliente.style.backgroundColor = '#f8bab6'
    inputAddCliente.placeholder = 'Campo obrigatório'
    setTimeout(function() {
      inputAddCliente.style.backgroundColor = '#FFFFFF'
      inputAddCliente.placeholder = 'Nome do cliente'
    }, 2000);
    return
  }
  let cliente = configs.clientes.find(c => c.cliente === clienteNome)
  let filial = []
  
  if (!cliente) {
    cliente = {
      cliente: clienteNome,
      filiais: []
    }
    configs.clientes.push(cliente)

    for (let i = 0; i < 10; i++) {
      filial[i] = document.querySelector('#nova-filial-' + i).value

      if (filial[i] == null){
        filial[i] = "vazio"
      } else {
        console.log('Adicionando ' + filial[i] + ' a filial ' + i)
      }
      
    }
    cliente.filiais.push(
      filial[0],
      filial[1],
      filial[2],
      filial[3], 
      filial[4], 
      filial[5], 
      filial[6], 
      filial[7], 
      filial[8], 
      filial[9]
    )
  }else{
    alert('Este cliente já está registrado.')
  }
  
  localStorage.setItem('configs', JSON.stringify(configs))
  inputAddCliente.value = ''
  for (let i = 0; i < 10; i++) {
    document.querySelector('#nova-filial-' + i).value = ''
  }
  mostrarClientes()
}

