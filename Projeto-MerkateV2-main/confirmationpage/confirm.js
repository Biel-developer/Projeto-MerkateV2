document.addEventListener('DOMContentLoaded', function () {
    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const address = document.getElementById('address');
    const numberAddress = document.getElementById('numberAddress');
    const TotalFinalCompra = document.getElementById('TotalFinalCompra');
    const date = document.getElementById('date');

    const nome = localStorage.getItem('username');
    const telefone = localStorage.getItem('numberPhone');
    const endereco = localStorage.getItem('address');
    const numeroEndereco = localStorage.getItem('addressNumber');
    const FinalCompra = parseFloat(localStorage.getItem('totalCompra')) || 0;

    name.textContent = nome ? nome : 'N/A';
    phone.textContent = telefone ? telefone : 'N/A';
    address.textContent = endereco ? endereco : 'N/A';
    numberAddress.textContent = numeroEndereco ? numeroEndereco : 'N/A';
    TotalFinalCompra.textContent = 'R$ ' + FinalCompra.toFixed(2);
    // ================================================================================

    const hoje = new Date();

    const dia = String(hoje.getDate()).padStart(2, '0');
    const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // Janeiro é 0!
    const ano = hoje.getFullYear();

    const dataFormatada = dia + '/' + mes + '/' + ano;

    date.textContent = dataFormatada ? dataFormatada : 'N/A'

    // ================================================================================
    const orderNumber = `#${Math.floor(Math.random() * 1000000)}`
    orderPedido.textContent = orderNumber;

    // =================================================================================
   

});

const ConfirmButton = document.getElementById('ConfirmButton');
const messagemCorrect = document.querySelector('.messagemCorrect');

ConfirmButton.addEventListener("click", (e) => {
    e.preventDefault();
    messagemCorrect.style.top = '10px';

    setTimeout(() => {
        messagemCorrect.style.top = '-50px';
    }, 2000);

    setTimeout(() => {
        window.location.href = '../index.html';
    }, 3000);
})


