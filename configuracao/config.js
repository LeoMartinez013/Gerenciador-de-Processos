let minhaListaDeItens = JSON.parse(localStorage.getItem('minhaListaDeItens'));
const urlParams = new URLSearchParams(window.location.search);
const posicao = urlParams.get('posicao');

function salvarConfiguracoes() {
    const tarefa = minhaListaDeItens[posicao]
    tarefa.prazo = document.getElementById(`prazo`).value
    tarefa.urgencia = document.getElementById(`urgencia`).value
    tarefa.obs = document.getElementById(`obs`).value
  
    localStorage.setItem('minhaListaDeItens', JSON.stringify(minhaListaDeItens))
  
    const confirmacao = document.getElementById('confirmacao')
    confirmacao.style.display = 'block'
    setTimeout(() => confirmacao.style.display = 'none', 3000)
}

// Carregar as configurações da tarefa quando a página for carregada
window.onload = function() {
  const tarefa = minhaListaDeItens[posicao]
  document.getElementById(`prazo`).value = tarefa.prazo
  document.getElementById(`urgencia`).value = tarefa.urgencia
  document.getElementById(`obs`).value = tarefa.obs
}
