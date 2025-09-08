function abrirNav(){
    document.getElementById("myNav").style.width = '100%';
    document.getElementById("myNav").style.height = '100%';
}

function fecharNav(){
    document.getElementById("myNav").style.width = '0';
    document.getElementById("myNav").style.height = '0';
}

const botao = document.getElementById("botao");

botao.addEventListener('touchstart', () => {
    botao.style.padding = '12px 24px';
});

botao.addEventListener('touchend', () => {
    botao.style.padding = '10px 20px';
});