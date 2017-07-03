class NegociacoesView extends View {

  template(model) {
    return `
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th onclick="negociacaoController.orderBy('data')">DATA</th>
                    <th onclick="negociacaoController.orderBy('quantidade')">QUANTIDADE</th>
                    <th onclick="negociacaoController.orderBy('valor')">VALOR</th>
                    <th onclick="negociacaoController.orderBy('volume')">VOLUME</th>
                </tr>
            </thead>  
            <tbody>
                ${model.negociacoes.map(negociacao => `
                  <tr>
                      <td>${DateHelper.dateToText(negociacao.data)}</td>
                      <td>${negociacao.quantidade}</td>
                      <td>${negociacao.valor}</td>
                      <td>${negociacao.volume}</td>
                  </tr>
                `).join('')}
            </tbody>
            <tfoot>
              <td colspan="3">Total</td>
              <td>${model.volumeTotal}</td>
            </tfoot>
        </table>
      `;
  }
}
