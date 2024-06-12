$(document).ready(function () {
    // Retrieve products from local storage
    let products = JSON.parse(localStorage.getItem('products')) || [];

  // Update the data array with the products
  var data = products.map(product => {
    return {
      "id": product.id,
      "nome": product.nome,
      "preco": product.preco,
      "precoAntigo": null,
      "imagem": product.imagem,
      "categoria": product.categoria
    };
  });

  //... (rest of the main page code remains the same)

  function mostrarProdutos(categoria) {
    $("#card-produtos").empty();

    var produtosFiltrados = data.filter(produto => produto.categoria === categoria);

    if (produtosFiltrados.length === 0) {
      $("#card-produtos").append('<h1>Nenhum produto encontrado nessa categoria.</h1>');
    } else {
      produtosFiltrados.forEach(produto => {
        if (produto.nome && produto.preco!== null && produto.imagem) { 
          var unidadeMedida = '';
          if (categoria === 'Verduras' || categoria === 'Frutas') {
            unidadeMedida = '/uni';
          } else if (categoria === 'Carne Fresca') {
            unidadeMedida = '/KG';
          }

          var produtoHtml = `
            <div data-id="${produto.id}" class="card-element">
              <div class="img-product">
                <img src="${produto.imagem}" alt="">
              </div>
               <div class="icone-navbar">
                <i class="ri-heart-line"></i>
            </div>
              <div class="price-element">
                <p>R$ ${produto.preco.toFixed(2)} ${unidadeMedida}</p>
              </div>
              <div class="description-element">
                <span>${produto.nome}</span>
              </div>
              <div class="button-element">
                <button><a onclick='carrinho(${JSON.stringify(produto)})' href="#">Adicionar ao Carrinho</a></button>
              </div>
            </div>
          `;
          $("#card-produtos").append(produtoHtml);
        }
      });
      }
    }
  
    // Mostra os produtos de uma categoria por padrão
    mostrarProdutos('Carne Fresca');
  
    // Filtra os produtos ao clicar nos botões
    $(".menu-section button").click(function () {
      var categoria = $(this).text();
      mostrarProdutos(categoria);
    });
  
    window.carrinho = function (produto) {
      const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      carrinho.push(produto);
      localStorage.setItem('carrinho', JSON.stringify(carrinho));
      carregarCarrinho();
    };
  
    function carregarCarrinho() {
      const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      const cart = document.querySelector('.menu-carrinho #carrinhoMenu');
      const qtdCart = document.getElementById('qtdCart');
      const precoTotalProduto = document.querySelector('.precoTotalProduto');
  
      let totalItens = 0;
      let precoTotal = 0;
  
      cart.innerHTML = '';
  
      carrinho.forEach(produto => {
        if (produto.nome && produto.preco !== null && produto.imagem) { // Verifica se os dados não são nulos
          const item = document.createElement('li');
          item.className = 'produto-item';
  
          item.innerHTML = `
            <div class="card">
              <div class="cards-element-product">
                <div class="img-element">
                  <img src="${produto.imagem}" alt="">
                </div>
                <div class="text-element">
                  <p>${produto.nome}</p>
                  <span>R$ ${produto.preco.toFixed(2)}</span>
                </div>
              </div>
              <div class="removerProduto">
                <button class="removerBtn" data-id="${produto.id}">Remover</button>
              </div>
            </div>
          `;
          cart.appendChild(item);
  
          totalItens++;
          precoTotal += produto.preco;
        }
      });
  
      if (qtdCart) {
        qtdCart.textContent = totalItens;
        qtdCart.style.display = totalItens > 0 ? 'flex' : 'none';
      }
  
      if (precoTotalProduto) {
        precoTotalProduto.textContent = 'R$ ' + precoTotal.toFixed(2);
      }
  
      localStorage.setItem('subtotal', precoTotal.toFixed(2));
  
      document.querySelectorAll('.removerBtn').forEach(btn => {
        btn.addEventListener('click', function () {
          const produtoId = parseInt(this.getAttribute('data-id'));
          removerDoCarrinho(produtoId);
        });
      });
  
      const finalizarCompra = document.getElementById('FinalizarCompra');
      if (finalizarCompra) {
        finalizarCompra.addEventListener("click", (e) => {
          e.preventDefault();
          if (precoTotal === 0) {
            return;
          } else {
            window.location.href = 'checkoutpage/checkout.html';
          }
        });
      }
    }
  
    function removerDoCarrinho(produtoId) {
      const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
      const novoCarrinho = carrinho.filter(produto => produto.id !== produtoId);
      localStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
      carregarCarrinho();
    }
  
    document.addEventListener('DOMContentLoaded', carregarCarrinho);
    carregarCarrinho();
  });