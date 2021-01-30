var nomeJoga = document.getElementById("nomeJogador");
var nvDifi = document.getElementById("dificuldade");
var btnStart = document.getElementById("btnJogar");
var quiz;
var quizDiv = document.getElementById("quizGeral");
var pergunta = document.getElementById("pergunta");
var d = new Date();
d.setTime(d.getTime() + (9 * 24 * 60 * 60 * 1000));

//adicionar evento click ao botão para ativar a função mudarDivs
btnStart.addEventListener("click", mudarDivs);

//vai mudar as divs e fazer a ligação ao API com a dificuldade escolhida
function mudarDivs() {
    if (nomeJoga.value == "") {
        alert("Tem de inserir o seu nome");
    }
    else {
        document.getElementById("inicial").style.display = "none";
        document.getElementById("nomeJogadorScore").innerText = nomeJoga.value;
        //mudamos o tipo de display da div para flex, alterando o display none no css
        quizDiv.style.display = "flex";
    }
    // 
    if (nvDifi.value == "facil") {
        var request = new XMLHttpRequest()
        request.open('GET', 'https://opentdb.com/api.php?amount=10&category=27&difficulty=easy&type=multiple', true)
        request.onload = function () {
            var data = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400) {
                quiz = data;
            }
            else {
                alert(request.status)
            }
        }
        request.send();
    }
    else if (nvDifi.value == "medio") {
        var request = new XMLHttpRequest()
        request.open('GET', 'https://opentdb.com/api.php?amount=10&category=27&difficulty=medium&type=multiple', true)
        request.onload = function () {
            var data = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400) {
                quiz = data;
            }
            else {
                alert(request.status)
            }
        }
        request.send();
    }
    else if (nvDifi.value == "dificil") {
        var request = new XMLHttpRequest()
        request.open('GET', 'https://opentdb.com/api.php?amount=10&category=27&difficulty=hard&type=multiple', true)
        request.onload = function () {
            var data = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400) {
                quiz = data;
            }
            else {
                alert(request.status)
            }
        }
        request.send();
    }
    else if (nvDifi.value == "misturado") {
        var request = new XMLHttpRequest()
        request.open('GET', 'https://opentdb.com/api.php?amount=10&category=27&type=multiple', true)
        request.onload = function () {
            var data = JSON.parse(this.response);
            if (request.status >= 200 && request.status < 400) {
                quiz = data;
            }
            else {
                alert(request.status)
            }
        }
        request.send();
    }

    incraseTime = setInterval(1000);

    setTimeout(
        () => {
            quizPlay();
            scoresJogadores();
        }
        , 1500
    );
    clearInterval(incraseTime);
}

var cookieVal = document.cookie.split(";")
var cookieBiDemensional = [];
cookieVal.forEach(element => {
    element= element.split("=");
    cookieBiDemensional.push(element);
});


function scoresJogadores() {
    cookieBiDemensional = cookieBiDemensional.sort(function(a, b){return b[1] - a[1]});
    cookieBiDemensional.forEach(element => {
        
            var v = document.createElement("h5");
            v.innerHTML = element[0] + ": " + element[1];
            document.getElementById("scoreBoard").append(v);
        
    });
}

var respostas;
var i = 0;
var scoreJogador = 0;

document.getElementById("scoreJogador").innerHTML = scoreJogador;

var bta = document.querySelectorAll("button")[1];
var btb = document.querySelectorAll("button")[2];
var btc = document.querySelectorAll("button")[3];
var btd = document.querySelectorAll("button")[4];


function quizPlay() {
    if (i < 10) {
        contadorTempo("start");

        respostas = quiz.results[i].incorrect_answers;
        respostas.push(quiz.results[i].correct_answer);

        var quantidadeRespostas = 4;
        var aux1;
        var aux2;

        while (quantidadeRespostas) {

            aux2 = Math.floor(Math.random() * quantidadeRespostas--);

            aux1 = respostas[quantidadeRespostas];
            respostas[quantidadeRespostas] = respostas[aux2];
            respostas[aux2] = aux1;
        }

        bta.innerHTML = respostas[0];
        btb.innerHTML = respostas[1];
        btc.innerHTML = respostas[2];
        btd.innerHTML = respostas[3];

        bta.addEventListener("click", respostaSelecionada);
        btb.addEventListener("click", respostaSelecionada);
        btc.addEventListener("click", respostaSelecionada);
        btd.addEventListener("click", respostaSelecionada);

        var j = i + 1;
        pergunta.innerText = j + " - " + quiz.results[i].question;

        tempoLimite("start");

    }
    else {
        document.cookie = nomeJoga.value+"="+scoreJogador+";" +"expires="+ d.toUTCString();
        document.getElementById("scoreBoardDiv").style.width = "75vw";
        document.getElementById("scoreBoardDiv").style.height = "35vh";
        document.getElementById("scoreBoardDiv").style.border = "0px";
        document.getElementById("scoreBoardDiv").style.textAlign = "center";
        document.getElementById("quiz").style.display = "none";
        document.getElementById("resultadoJogador").style.display = "block"; 
        document.getElementById("scoreBoard").style.height = "25vh";

        document.getElementById("nomeJogadorScore1").innerHTML = nomeJoga.value;
        document.getElementById("scoreJogador1").innerHTML = scoreJogador;
    }
}

var tempo = 0;
function contadorTempo(metodo) {
    if (metodo == "start") {
        incraseTime1 = setInterval(
            () => {
                tempo++;
                document.getElementById("contador").innerHTML = tempo;
            },
            1000
        )
    }
    else {
        clearInterval(incraseTime1);
        tempo = 0;
        document.getElementById("contador").innerHTML = tempo;
    }
}

function respostaSelecionada(event) {

    removerClickBt();
    contadorTempo("pause");
    tempoLimite("pause");
    if (event.target.innerHTML == quiz.results[i].correct_answer) {
        scoreJogador = scoreJogador + 10;
        document.getElementById("scoreJogador").innerHTML = scoreJogador;

        event.target.style.backgroundColor = "green";

        setTimeout(() => {
            event.target.style.backgroundColor = "var(--corFundo)";
            i++;
            quizPlay();
        }, 2000);
    }
    else {
        event.target.style.backgroundColor = "red";

        switch (quiz.results[i].correct_answer) {
            case respostas[0]:
                bta.style.backgroundColor = "green";

                setTimeout(() => {
                    event.target.style.backgroundColor = "var(--corFundo)";
                    bta.style.backgroundColor = "var(--corFundo)";
                    i++;
                    quizPlay();
                }, 2000);
                break;
            case respostas[1]:
                btb.style.backgroundColor = "green";

                setTimeout(() => {
                    event.target.style.backgroundColor = "var(--corFundo)";
                    btb.style.backgroundColor = "var(--corFundo)";
                    i++;
                    quizPlay();
                }, 2000);
                break;
            case respostas[2]:
                btc.style.backgroundColor = "green";

                setTimeout(() => {
                    event.target.style.backgroundColor = "var(--corFundo)";
                    btc.style.backgroundColor = "var(--corFundo)";
                    i++;
                    quizPlay();
                }, 2000);
                break;
            case respostas[3]:
                btd.style.backgroundColor = "green";

                setTimeout(() => {
                    event.target.style.backgroundColor = "var(--corFundo)";
                    btd.style.backgroundColor = "var(--corFundo)";
                    i++;
                    quizPlay();
                }, 2000);
                break;
            default:
                break;
        }
    }
}

var limiteCor;
var limiteVisi;

function tempoLimite(metodo) {
    if (metodo == "start") {
        limiteCor = setTimeout(() => {

            switch (quiz.results[i].correct_answer) {
                case respostas[0]:
                    bta.style.backgroundColor = "green";

                    setTimeout(() => {
                        bta.style.backgroundColor = "var(--corFundo)";
                    }, 3000);
                    break;
                case respostas[1]:
                    btb.style.backgroundColor = "green";

                    setTimeout(() => {
                        btb.style.backgroundColor = "var(--corFundo)";
                    }, 3000);
                    break;
                case respostas[2]:
                    btc.style.backgroundColor = "green";

                    setTimeout(() => {
                        btc.style.backgroundColor = "var(--corFundo)";
                    }, 3000);
                    break;
                case respostas[3]:
                    btd.style.backgroundColor = "green";

                    setTimeout(() => {
                        btd.style.backgroundColor = "var(--corFundo)";
                    }, 3000);
                    break;
                default:
                    break;
            }
            removerClickBt();
            contadorTempo("pause");
        }, 10000);

        limiteVisi = setTimeout(() => {
            i++;
            quizPlay();
        }, 13000);
    }
    else {
        clearTimeout(limiteCor);
        clearTimeout(limiteVisi);
    }
}

function removerClickBt() {
    bta.removeEventListener("click", respostaSelecionada);
    btb.removeEventListener("click", respostaSelecionada);
    btc.removeEventListener("click", respostaSelecionada);
    btd.removeEventListener("click", respostaSelecionada);
}