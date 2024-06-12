const messagemCorrect = document.querySelector('.messagemCorrect');
const messagemIncorrect = document.querySelector('.messagemIncorrect');
const fazerLogin = document.getElementById('fazerLogin');

fazerLogin.addEventListener("click", (e) => {
    e.preventDefault();

    const nameUser = document.getElementById('nameUser').value.trim();
    const passworUser = document.getElementById('passworUser').value.trim();


    if (nameUser === "" || passworUser !== "1234") {
        messagemIncorrect.style.top = '20px';
        messagemCorrect.style.top = '-100px';

        setTimeout(() => {
            messagemIncorrect.style.top = '-100px';
        }, 2000);
    } else {
        messagemCorrect.style.top = '20px';
        messagemIncorrect.style.top = '-100px';

        localStorage.setItem('nameUser', nameUser);

        setTimeout(() => {
            messagemCorrect.style.top = '-100px';
            window.location.href = '../paneladmin/dashboard/dash.html';
        }, 2000);
    }
});