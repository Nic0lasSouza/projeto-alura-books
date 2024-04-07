let btnOrdnaPreco = document.getElementById('btnOrdenarPorPreco');
btnOrdnaPreco.addEventListener('click', ordenarLivrosPrice);

function ordenarLivrosPrice(){
    let livrosOrdenados = livros.sort((a,b) => a.preco - b.preco);
    exibirOsLivrosNaTela(livrosOrdenados);
};