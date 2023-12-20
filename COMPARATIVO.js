window.onload = function() {
    const processo = meusProcessos[posicao];
    // ...
    const historicosDiv = document.getElementById('historico1').parentNode;
    for (let i = 0; i < processo.historico.length; i++) {
      let historico;
      if (i > 0) {
        contadorHistorico++;
        historico = document.getElementById('historico1').cloneNode(true);
        historico.id = 'historico' + contadorHistorico;
        const novoHistoricoInputs = historico.getElementsByTagName('input');
        for (let j = 0; j < novoHistoricoInputs.length; j++) {
          novoHistoricoInputs[j].value = '';
        }
        historicosDiv.appendChild(historico);
      } else {
        historico = historicosDiv.getElementsByClassName('historicos')[0];
      }
      const dateInput = historico.getElementsByClassName('hist1')[0];
      const textInput = historico.getElementsByClassName('hist1')[1];
      const [dateValue, textValue] = processo.historico[i].split(' ');
      dateInput.value = dateValue;
      textInput.value = textValue;
    }
    contadorHistorico = processo.historico.length;
    // ...
  }
  