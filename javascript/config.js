const listaClientes = document.querySelector('#sub-section-1')
var configs = [];
window.onload = function() {
    configs = JSON.parse(localStorage.getItem('configs')) || [];
}
function mostrarClientes {
    let novaLinha = ''
    configs.forEach((cliente, posicao) => {
        let clienteNome = configs.cliente.replace(/ /g, '-')
        console.log(configs.cliente)
        novaLinha =
          novaLinha +
          `
          <div id="cliente1" class="clientes">
            <div>
                <input type="checkbox" name="selecionar-$" id="selecionar-${clienteNome}" class="selecoes">
            </div>
            <div id="clienteNome-${configs.cliente}" class="clientesNome">
              ${configs.cliente}
            </div>
            <div id="excluir-${clienteNome}" class="excluir">
              Excluir
            </div>
            <div id="configurar-${clienteNome} class="configurar">
              Configurar
            </div>
            <div id="mudarNome-${clienteNome}" class="mudarNome">
              Mudar nome
            </div>
          </div>
          <div id="${clienteNome}-filiais" style="display: none">
            ${mostrarFilais()}
          </div>
          <div id="cliente1-mudarNome" style="display: none">
          </div>
          `
    }) 
}
function configurar(cliente) {

}
function excluir(cliente) {

}
function excluirSelecionados() {

}
function adicionarNovoCliente() {
  let clienteNome = inputCliente.value;
  let cliente = configs.find(c => c.cliente === clienteNome)

  if (!cliente) {
    cliente = {
      cliente: clienteNome,
      filiais: []
    }
    configs.push(cliente)
  }
  cliente.filiais.push([
    "", "", "", "", "", "", "", "", "", ""
  ])
  localStorage.setItem('configs', JSON.stringify(configs))
  mostrarClientes()
  mostrarClientesConcluidos()
}