function esconderOpcsBaixar() {
    const bJSON = document.getElementById('opc-baixar-json')
    const bTXT = document.getElementById('opc-baixar-txt')
    const situacao = document.getElementById('button-download-processo')
    situacao.value = "exibir"
    bJSON.style.display = "none"
    bTXT.style.display = "none"
}
function exibirOpcsBaixar() {
    const bJSON = document.getElementById('opc-baixar-json')
    const bTXT = document.getElementById('opc-baixar-txt')
    const situacao = document.getElementById('button-download-processo')
    situacao.value = "ocultar"
    bJSON.style.display = "flex"
    bTXT.style.display = "flex"
}
function bottaoOpcsBaixar() {
    const situacao = document.getElementById('button-download-processo')
    console.log(situacao.value)
    if (situacao.value === "exibir"){
      exibirOpcsBaixar()
    } else {
      esconderOpcsBaixar()
    }
}
// Baixar como .json
function baixarClientesJSON() {
    let dataAtual = new Date()
    let year = dataAtual.getFullYear()
    let month = dataAtual.getMonth() + 1
    let day = dataAtual.getDay()
    if (day < 10) day = '0' + day
    if (month < 10) month = '0' + month
    let dia = `${month}-${month}-${year}`

    const data = JSON.stringify(clientes, null, 2);
    const blob = new Blob([data], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'clientes-' + dia +'.json';
    link.click();
    URL.revokeObjectURL(url);
}
// Baixar como .txt
function baixarClientesTXT() {
    let dataAtual = new Date()
    let year = dataAtual.getFullYear()
    let month = dataAtual.getMonth() + 1
    let day = dataAtual.getDay()
    if (day < 10) day = '0' + day
    if (month < 10) month = '0' + month
    let dia = `${month}-${month}-${year}`

    const data = JSON.stringify(clientes, null, 2);
    const blob = new Blob([data], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url
    link.download = 'clientes-' + dia +'.txt';
    link.click()
    URL.revokeObjectURL(url)
}


// Importar
function importarClientes(event) {
    let file = event.target.files[0]
    if (file) {
        let reader = new FileReader()
        reader.onload = function(e) {
            // Carregar os clientes existentes
            let clientesExistente = JSON.parse(localStorage.getItem('clientes')) || []
            // Adicionar novos clientes à lista existente
            let novosClientes = JSON.parse(e.target.result)
            novosClientes.forEach(novoCliente => {
                // Verificar se o cliente já existe
                let clienteExistente = clientesExistente.find(cliente => cliente.cliente === novoCliente.cliente)
                if (!clienteExistente) {
                    // Se o cliente não existir, adicionar à lista
                    clientesExistente.push(novoCliente)
                } else {
                    // Se o cliente já existir, adicionar os novos processos à lista de processos existente
                    novoCliente.processos.forEach(novoProcesso => {
                        // Verificar se o processo já existe
                        let processoExistente = clienteExistente.processos.find(processo => processo.po === novoProcesso.po)

                        if (!processoExistente) {
                            // Se o processo não existir, adicionar à lista
                            clienteExistente.processos.push(novoProcesso)
                        } else {
                            // Se o processo já existir, substituir pelo novo processo
                            let index = clienteExistente.processos.indexOf(processoExistente)
                            clienteExistente.processos[index] = novoProcesso

                            // Verificar o estado "concluído" do novo processo
                            if (novoProcesso.concluido !== true) {
                                clienteExistente.processos[index].concluido = false
                            }
                        }
                    })
                }
            })
            // Armazenar a lista atualizada de volta no localStorage
            localStorage.setItem('clientes', JSON.stringify(clientesExistente))
            window.location.reload()
        };
        reader.readAsText(file)
    }
}

document.addEventListener('DOMContentLoaded', function() {
  const botaoBaixarJSON = document.querySelector('#opc-baixar-json')
  const botaoBaixarTXT = document.querySelector('#opc-baixar-txt')
  botaoBaixarJSON.addEventListener('click', baixarClientesJSON)
  botaoBaixarTXT.addEventListener('click', baixarClientesTXT)
});