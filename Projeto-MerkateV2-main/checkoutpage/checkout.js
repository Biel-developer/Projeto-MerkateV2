document.addEventListener('DOMContentLoaded', function () {
    const SubTotal = document.getElementById('SubTotal');
    const TaxaCompra = document.getElementById('TaxaCompra');
    const TotalCompra = document.getElementById('TotalCompra');

    // Recupera o subtotal do localStorage
    const subtotal = parseFloat(localStorage.getItem('subtotal')) || 0;
    const taxa = 15.00; // Define a taxa fixa

    // Calcula o total da compra
    const totalCompra = subtotal + taxa;

    localStorage.setItem('totalCompra', totalCompra);

    // Exibe os valores no DOM
    SubTotal.textContent = 'R$ ' + subtotal.toFixed(2);
    TaxaCompra.textContent = 'R$ ' + taxa.toFixed(2);
    TotalCompra.textContent = 'R$ ' + totalCompra.toFixed(2);

});

const messagemCorrect = document.querySelector('.messagemCorrect');
const messagemIncorrect = document.querySelector('.messagemIncorrect');

function PagmentProduct() {
    const username = document.getElementById('username').value.trim();
    const numberPhone = document.getElementById('numberPhone').value.trim();
    const Address = document.getElementById('Address').value.trim();
    const AddressNumber = document.getElementById('AddressNumber').value.trim();
    const CardName = document.getElementById('CardName').value.trim();
    const CardNumber = document.getElementById('CardNumber').value.trim();

    // Verificar se algum campo está vazio ou contém apenas espaços em branco
    if (username === "" || numberPhone === "" || Address === "" ||
        AddressNumber === "" || CardName === "" || CardNumber === "") {
        messagemIncorrect.style.top = '0px';
        messagemCorrect.style.top = '-100px'; // Esconde a mensagem de sucesso, se visível

        setTimeout(() => {
            messagemIncorrect.style.top = '-100px';
        }, 2000);

    } else {
        messagemCorrect.style.top = '10px';
        messagemIncorrect.style.top = '-100px'; // Esconde a mensagem de erro, se visível
        localStorage.setItem('username', username);
        localStorage.setItem('numberPhone', numberPhone);
        localStorage.setItem('address', Address);
        localStorage.setItem('addressNumber', AddressNumber);

        setTimeout(() => {
            window.location.href = '../confirmationpage/confirm.html';
        }, 2000);

        setTimeout(() => {
            messagemCorrect.style.top = '-100px';
        }, 2000);
    }
}

