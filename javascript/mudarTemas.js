//const selectTema = document.querySelector('#selecTema')
var tema = JSON.parse(localStorage.getItem('tema')) || 'azul' // valor padrão
console.log(tema)
// Aplica o tema salvo no localStorage ao carregar a página
document.querySelector('.temaProjeto').href = '../temas/' + tema + '.css'

// Função para mudar o tema
function mudarTema() {
    var temaSelecionado = document.querySelector('#selecTema').value;
    if (temaSelecionado === 'nada'){
        return
    }
    localStorage.setItem('tema', JSON.stringify(temaSelecionado))
    document.querySelector('.temaProjeto').href ='../temas/' + temaSelecionado + '.css'
    console.log('Mudando tema para: ' + temaSelecionado)
}

// Adiciona o evento de mudança ao elemento select
//selectTema.addEventListener('change', mudarTema)
