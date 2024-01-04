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
    const data = JSON.stringify(clientes, null, 2);
    const blob = new Blob([data], {type: 'application/json'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'clientes.json';
    link.click();
    URL.revokeObjectURL(url);
}
// Baixar como .txt
function baixarClientesTXT() {
    const data = JSON.stringify(clientes, null, 2);
    const blob = new Blob([data], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url
    link.download = 'clientes.txt';
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
        clientes = clientesExistente.concat(novosClientes)

        // Armazenar a lista atualizada de volta no localStorage
        localStorage.setItem('clientes', JSON.stringify(clientes))

        window.location.reload()
        };
        reader.readAsText(file)
    }
}


button.addEventListener('click', adicionarNovoProcesso)
document.addEventListener('DOMContentLoaded', function() {
  const botaoBaixarJSON = document.querySelector('#opc-baixar-json')
  const botaoBaixarTXT = document.querySelector('#opc-baixar-txt')
  botaoBaixarJSON.addEventListener('click', baixarClientesJSON)
  botaoBaixarTXT.addEventListener('click', baixarClientesTXT)
});