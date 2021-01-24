var nomeJoga = document.getElementById("nomeJogador");
var nvDifi = document.getElementById("dificuldade");
var btnStart = document.getElementById("btnJogar");

btnStart.addEventListener("click", mudarDivs);

function mudarDivs(){
    if (nomeJoga.value == "") {
        alert("Tem de inserir o seu nome");
    }
    else {
        document.getElementById("inicial").style.display = "none";
    }
}