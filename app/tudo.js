let livros =[];
const endPointDaAPI = 'https://guilhermeonrails.github.io/casadocodigo/livros.json';
getBuscarLivrosDaAPI();
const elementoParaInserirLivros = document.getElementById('livros');
const elementoValorToltal = document.getElementById('valor_total_livros_disponiveis');

async function getBuscarLivrosDaAPI(){
    const res = await fetch(endPointDaAPI);
    livros = await res.json();
    let livrosComDesconto = aplicarDesconto(livros);
    exibirOsLivrosNaTela(livrosComDesconto);

};

function exibirOsLivrosNaTela(listaDeLivros) {
  elementoValorToltal.innerHTML = '';
  elementoParaInserirLivros.innerHTML = ''
  listaDeLivros.forEach(livro => {
      // let disponibilidade = verificarDisponibilidadeDoLivro(livro)
      let disponibilidade = livro.quantidade > 0 ? 'livro__imagens' : 'livro__imagens indisponivel' 
      elementoParaInserirLivros.innerHTML += `
      <div class="livro">
      <img class="${disponibilidade}" src="${livro.imagem}"
        alt="${livro.alt}" />
      <h2 class="livro__titulo">
        ${livro.titulo}
      </h2>
      <p class="livro__descricao">${livro.autor}</p>
      <p class="livro__preco" id="preco">R$${livro.preco.toFixed(2)}</p>
      <div class="tags">
        <span class="tag">${livro.categoria}</span>
      </div>
    </div>
        `
    })
}
function aplicarDesconto(livros) {
    const desconto = 0.3;
    livrosComDesconto = livros.map(livro =>{
        return {...livro, preco: livro.preco - (livro.preco * desconto)};
    });
    return livrosComDesconto;
}
const botoes = document.querySelectorAll('.btn');
botoes.forEach(btn => btn.addEventListener('click', filtrarLivros));

function filtrarLivros(){
    const elementoBtn = document.getElementById(this.id);
    const categoria = elementoBtn.value;
    let livrosFiltrados = categoria == 'disponivel' ? filtarDisponibilidade() : filtarPorCategoria(categoria);
    exibirOsLivrosNaTela(livrosFiltrados);
    if(categoria == 'disponivel'){
        const valorTotal = calcularValorTotalLivrosDisponiveis(livrosFiltrados);

        exibirValorTotalDosLivrosNaTela(valorTotal)
    }

}

function filtarPorCategoria(categoria) {
    return livros.filter(livro => livro.categoria == categoria);
}
function filtarDisponibilidade() {
    return livros.filter(livro => livro.quantidade > 0);
}

function exibirValorTotalDosLivrosNaTela(valorTotal){
    elementoValorToltal.innerHTML = `
    <div class="livros__disponiveis">
    <p>Todos os livros disponíveis por R$ <span id="valor">${valorTotal}</span></p>
    </div>
    `
}
let btnOrdnaPreco = document.getElementById('btnOrdenarPorPreco');
btnOrdnaPreco.addEventListener('click', ordenarLivrosPrice);

function ordenarLivrosPrice(){
    let livrosOrdenados = livros.sort((a,b) => a.preco - b.preco);
    exibirOsLivrosNaTela(livrosOrdenados);
};
function calcularValorTotalLivrosDisponiveis(livros){
    return livros.reduce((acc, livro)=> acc + livro.preco, 0).toFixed(2);
}