const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const listaCompleta = document.querySelector('.list-tasks')

let minhaListaDeItens = JSON.parse(localStorage.getItem('minhaListaDeItens')) || []

window.onload = function() {
  minhaListaDeItens = JSON.parse(localStorage.getItem('minhaListaDeItens')) || []
  mostrarTarefas()
}

function baixarTarefas() {
  const data = JSON.stringify(minhaListaDeItens, null, 2);
  const blob = new Blob([data], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'tarefas.json';
  link.click();
  URL.revokeObjectURL(url);
}

function adicionarNovaTarefa() {
  minhaListaDeItens.push({
    tarefa: input.value,
    concluida: false,
  })

  input.value = ''
  localStorage.setItem('minhaListaDeItens', JSON.stringify(minhaListaDeItens))
  mostrarTarefas()
}

function mostrarTarefas() {
  let novaLi = ''
  minhaListaDeItens.forEach((item, posicao) => {
    novaLi =
      novaLi +
      `
        <li class="task ${item.concluida && 'done'}">
            <img class="icone" src="./assets/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})">
            <p class="nome">${item.tarefa}</p>
            <p class="prazo"> ${item.prazo || 'Vazio'}</p>
            <p class="urgencia"> ${item.urgencia || 'Vazio'}</p>
            <p class="obs"> ${item.obs || 'Nenhuma'}</p>
            <img class="icone" src="./assets/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
            <a href="configuracao/config.html?posicao=${posicao}" target="_self">
              <img class="icone" src="./assets/config.png" alt="configurar-tarefa">
            </a>
        </li>
      `
  })
  listaCompleta.innerHTML = novaLi
}

function concluirTarefa(posicao) {
  minhaListaDeItens[posicao].concluida = !minhaListaDeItens[posicao].concluida
  localStorage.setItem('minhaListaDeItens', JSON.stringify(minhaListaDeItens))
  mostrarTarefas()
}

function deletarItem(posicao) {
  minhaListaDeItens.splice(posicao, 1)
  localStorage.setItem('minhaListaDeItens', JSON.stringify(minhaListaDeItens))
  mostrarTarefas()
}

button.addEventListener('click', adicionarNovaTarefa)

document.addEventListener('DOMContentLoaded', function() {
  const botaoBaixar = document.querySelector('.button-download-task');
  botaoBaixar.addEventListener('click', baixarTarefas);
});
