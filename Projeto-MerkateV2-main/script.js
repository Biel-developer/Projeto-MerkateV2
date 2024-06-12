const hamburguer = document.querySelector('.ri-menu-3-line');
const menuMobile = document.querySelector('.menu-mobile');
const closeMenu = document.querySelector('.ri-close-line');
const menuCarinho = document.querySelector('.menu-carrinho');
const cartProduct = document.querySelector('.ri-shopping-bag-4-fill');
const closeProduct = document.getElementById('closeProduct');

document.addEventListener("DOMContentLoaded", function() {
    const toggleButton = document.getElementById("themeToggle");
    const body = document.body;

    toggleButton.addEventListener("change", function() {
        body.classList.toggle("dark-mode", this.checked);
    });
});

hamburguer.addEventListener("click", (e) => {
    e.preventDefault();
    menuMobile.style.left = '0px';
});

closeMenu.addEventListener("click", (e) => {
    e.preventDefault();
    menuMobile.style.left = '800px';
})

cartProduct.addEventListener("click", (e) => {
    e.preventDefault();
    menuCarinho.style.right = '0px';
})

closeProduct.addEventListener("click", (e) => {
    e.preventDefault();
    menuCarinho.style.right = '-500px';
})

function startTimer(duration, display) {
    let timer = duration, days, hours, minutes, seconds;
    setInterval(function () {
        days = Math.floor(timer / (24 * 60 * 60));
        hours = Math.floor((timer % (24 * 60 * 60)) / (60 * 60));
        minutes = Math.floor((timer % (60 * 60)) / 60);
        seconds = Math.floor(timer % 60);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours < 10 ? "0" + hours : hours;
        document.getElementById('minutes').textContent = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById('seconds').textContent = seconds < 10 ? "0" + seconds : seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

window.onload = function () {
    const duration = 30 * 24 * 60 * 60 + 15 * 60 * 60 + 55 * 60 + 60; // total seconds
    startTimer(duration);
};


