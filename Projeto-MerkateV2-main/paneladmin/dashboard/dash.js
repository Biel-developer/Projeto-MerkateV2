window.addEventListener('load', () => {
    const Usuario = document.getElementById('Usuario');
    const User = localStorage.getItem('nameUser');
  
    if(User){
    Usuario.textContent = 'Ola, ' + User;
    }else{
        Usuario.textContent = 'Nome não encontrado'
    }
});


const Produtos = document.getElementById('Produtos');
const Financias = document.getElementById('Financias');

Produtos.addEventListener("click", (e) => {
    e.preventDefault();

    Produtos.style.background = 'rgba(0,0,0,0.1)';
    Produtos.style.width= ' 238px';
    Financias.style.background = 'transparent';
})

Financias.addEventListener("click", (e) => {
    e.preventDefault();

    Financias.style.background = 'rgba(0,0,0,0.1)';
    Financias.style.width= ' 238px';
    Produtos.style.background = 'transparent';
})

