let products = JSON.parse(localStorage.getItem('products')) || [];
let isEditing = false;

function salvarProdutos() {
  localStorage.setItem('products', JSON.stringify(products));
}

function limparForm() {
  document.getElementById('nome-produto').value = '';
  document.getElementById('preco-produto').value = '';
  document.getElementById('descricao-produto').value = '';
  document.getElementById('categoria-produto').value = '';
  document.getElementById('imagem-produto').value = '';
  document.getElementById('preview-imagem').style.display = 'none';
}

function validaForm() {
  let nomeProduto = document.getElementById('nome-produto').value;
  let precoProduto = parseFloat(document.getElementById('preco-produto').value);
  let descricaoProduto = document.getElementById('descricao-produto').value;
  let categoriaProduto = document.getElementById('categoria-produto').value;

  if (isEditing) {
    return nomeProduto &&!isNaN(precoProduto) && descricaoProduto && categoriaProduto;
  } else {
    let imagemProduto = document.getElementById('imagem-produto').files[0];
    return nomeProduto &&!isNaN(precoProduto) && descricaoProduto && categoriaProduto && imagemProduto;
  }
}

document.getElementById('AddProduct').addEventListener('click', function () {
  isEditing = false;
  if (validaForm()) {
    let nomeProduto = document.getElementById('nome-produto').value;
    let precoProduto = parseFloat(document.getElementById('preco-produto').value);
    let descricaoProduto = document.getElementById('descricao-produto').value;
    let categoriaProduto = document.getElementById('categoria-produto').value;
    let imagemProduto = document.getElementById('imagem-produto').files[0];

    const reader = new FileReader();
    reader.onload = function (e) {
      let novoProduto = {
        id: Date.now(),
        nome: nomeProduto,
        preco: precoProduto,
        descricao: descricaoProduto,
        imagem: e.target.result, // Base64 encoded image
        categoria: categoriaProduto
      };

      products.push(novoProduto);
      salvarProdutos();
      limparForm();
      adicionarProdutoAoDashboard(novoProduto);
      alert('Produto adicionado com sucesso!');
    };
    reader.readAsDataURL(imagemProduto);
  } else {
    alert('Por favor, preencha todos os campos corretamente.');
  }
});

document.getElementById('imagem-produto').addEventListener('change', function () {
  const previewImagem = document.getElementById('preview-imagem');
  const file = this.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImagem.src = e.target.result;
      previewImagem.style.display = 'block';
    };
    reader.readAsDataURL(file);
  } else {
    previewImagem.style.display = 'none';
  }
});

const EditPanel = document.getElementById("EditPanel");
const adicionarProduto = document.getElementById("adicionar-produto");
const closePanel = document.getElementById("closePanel");

adicionarProduto.addEventListener("click", (e) => {
  e.preventDefault();
  EditPanel.style.top = '0px';
})

closePanel.addEventListener("click", (e) => {
  e.preventDefault();
  EditPanel.style.top = '-1500px';
})

function adicionarProdutoAoDashboard(produto) {
  const dashboard = document.getElementById('dashboard-produtos');

  const produtoHtml = `
    <div data-id="${produto.id}" class="card-element">
      <div class="img-product">
        <img src="${produto.imagem}" alt="">
      </div>
      <div class="price-element">
        <p>R$ ${produto.preco? produto.preco.toFixed(2) : '0.00'}</p>
      </div>
      <div class="description-element">
        <span>${produto.nome}</span>
      </div>
      <div class="category-element">
        <span>Categoria: ${produto.categoria}</span>
      </div>
      <div class="edit-element">
        <button class="editProduct">Editar</button>
        <button class="deleteProduct">Excluir</button>
      </div>
    </div>
  `;
  dashboard.insertAdjacentHTML('beforeend', produtoHtml);
}

function carregarProdutosDoDashboard() {
  products.forEach(produto => adicionarProdutoAoDashboard(produto));
}

function deletarProduto(produtoId){
  const index = products.findIndex(produto => produto.id === produtoId);
  if (index!== -1) {
    products.splice(index, 1);
    salvarProdutos();
    const produtoElement = document.querySelector(`[data-id="${produtoId}"]`);
    produtoElement.remove();
    alert('Produto excluído com sucesso!');
  } else {
    alert('Erro ao excluir produto.');
  }
}

let currentProductId;

function editarProduto(produtoId) {
  isEditing = true;
  currentProductId = produtoId;
  const index = products.findIndex(produto => produto.id === produtoId);
  if (index!== -1) {
    const produto = products[index];
    document.getElementById('nome-produto').value = produto.nome;
    document.getElementById('preco-produto').value = produto.preco;
    document.getElementById('descricao-produto').value = produto.descricao;
    document.getElementById('categoria-produto').value = produto.categoria;
    document.getElementById('preview-imagem').src = produto.imagem;
    document.getElementById('preview-imagem').style.display = 'block';
    EditPanel.style.top = '0px';
  } else {
    alert('Erro ao editar produto.');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  carregarProdutosDoDashboard();

  const dashboard = document.getElementById('dashboard-produtos');
  dashboard.addEventListener('click', function (e) {
    if (e.target.classList.contains('deleteProduct')) {
      const produtoId = parseInt(e.target.parentNode.parentNode.getAttribute('data-id'));
      deletarProduto(produtoId);
    } else if (e.target.classList.contains('editProduct')) {
      const produtoId = parseInt(e.target.parentNode.parentNode.getAttribute('data-id'));
      editarProduto(produtoId);
    }
  });
});

document.getElementById('EditProduct').addEventListener('click', function () {
  if (validaForm()) {
    const produtoId = parseInt(document.getElementById('nome-produto').getAttribute('data-id'));
    const produto = products.find(produto => produto.id === produtoId);
    produto.nome = document.getElementById('nome-produto').value;
    produto.preco = parseFloat(document.getElementById('preco-produto').value);
    produto.descricao = document.getElementById('descricao-produto').value;
    produto.categoria = document.getElementById('categoria-produto').value;
    const imagemProduto = document.getElementById('imagem-produto').files[0];
    if (imagemProduto) {
      const reader = new FileReader();
      reader.onload = function (e) {
        produto.imagem = e.target.result; // Base64 encoded image
      };
      reader.readAsDataURL(imagemProduto);
    }
    salvarProdutos();
    limparForm();
    EditPanel.style.top = '-1500px';
    alert('Produto editado com sucesso!');
  } else {
    alert('Por favor, preencha todos os campos corretamente.');
  }
});