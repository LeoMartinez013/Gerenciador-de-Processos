const listaClientes = document.querySelector('#sub-section-1-1')
const inputAddCliente  = document.querySelector('#input-cliente')
var configs = { clientes: [] };
window.onload = function() {
  var storedConfigs = JSON.parse(localStorage.getItem('configs'));
  if (storedConfigs) {
    configs = storedConfigs;
  }
  mostrarClientes()
}

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


function excluirCliente(clienteNome, posicao) {
  let cliente = configs.clientes.find(c => c.cliente === clienteNome)
  if (cliente) {
    if (confirm(`Você deseja excluir o Cliente ${clienteNome}?`) == true) {
      configs.clientes.splice(posicao, 1)
    }
  }

  localStorage.setItem('configs', JSON.stringify(configs))
  mostrarClientes();
}
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