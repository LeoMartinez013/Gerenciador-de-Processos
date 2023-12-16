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
  let novaLi = `
    <tr id="titulo">
      <th class="c1"></th>
      <th class="c2">Nome</th>
      <th class="c3">Prazo</th>
      <th class="c4">Urgência</th>
      <th class="c5">Obs.</th>
      <th class="c6"></th>
    </tr>`
  minhaListaDeItens.forEach((item, posicao) => {
    novaLi =
      novaLi +
      `
        <tr class="task ${item.concluida && 'done'}">
            <td class="c1"><img class="icone" src="./assets/checked.png" alt="check-na-tarefa" onclick="concluirTarefa(${posicao})"></td>
            <td class="nome c2">${item.tarefa}</td>
            <td class="prazo c3"> ${item.prazo || 'Vazio'}</td>
            <td class="urgencia c4"> ${item.urgencia || 'Vazio'}</td>
            <td class="obs c5"> ${item.obs || 'Nenhuma'}</td>
            <td class="c6"><img class="icone" src="./assets/trash.png" alt="tarefa-para-o-lixo" onclick="deletarItem(${posicao})">
            <a href="configuracao/config.html?posicao=${posicao}" target="_self">
              <img class="icone" src="./assets/config.png" alt="configurar-tarefa">
            </a></td>
        </tr>
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
