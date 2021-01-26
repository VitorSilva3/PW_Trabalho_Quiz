var nomeJoga = document.getElementById("nomeJogador");
var nvDifi = document.getElementById("dificuldade");
var btnStart = document.getElementById("btnJogar");
var quiz;
var quizDiv = document.getElementById("quizGeral");
var pergunta = document.getElementById("pergunta");

btnStart.addEventListener("click", mudarDivs);

function mudarDivs(){
    if (nomeJoga.value == "") {
        alert("Tem de inserir o seu nome");
    }
    else {
        document.getElementById("inicial").style.display = "none";
    }

    if (nvDifi.value == "facil") {
        alert("não disponivel versao facil");
    }
    else if (nvDifi.value == "medio") {
        alert("não disponivel versao medio");
    }
    else if (nvDifi.value == "dificil") {
        alert("não disponivel versao dificil");
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

    incraseTime = setInterval(1000)

    setTimeout(
        ()=>{quizPlay();
            quizDiv.style.display = "block";
        }
        ,3000
    );

    quizDiv.style.display = "block";
}

var array;

function quizPlay(){
    for (let i = 0; i < quiz.results.length; i++) {
        pergunta.innerText = quiz.results[i].question
        
        quiz.results[i].incorrect_answers.push(quiz.results[i].correct_answer);
        array = quiz.results[i].incorrect_answers;

        var quantidadeRespostas = 4;
        var aux1;
        var aux2;

        while (quantidadeRespostas) {
  
            // Pick a remaining element…
            aux2 = Math.floor(Math.random() * quantidadeRespostas--);
        
            // And swap it with the current element.
            aux1 = array[quantidadeRespostas];
            array[quantidadeRespostas] = array[aux2];
            array[aux2] = aux1;
        }

        for (let j = 0; j < 4; j++) {
            document.getElementById("resposta"+j).innerHTML = array[j];
            document.getElementById("resposta"+j).addEventListener("click",
            ()=>{ 
                if (selecionada.value == quiz.results[i].correct_answer) {
                    alert("Acertou!");
                }
                else{
                    alert("Errou!");
                }
            });
        }
        
        incraseTime = setInterval(1000)

        setTimeout(
            ()=>{}
            ,10000
        );
    }
}  

/* -- Misturar valores de um array --
var array = ["Marega", "Manafa", "Luiz", "Taremi"];

function shuffle(array) {
    var m = array.length;
    var t;
    var i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = array[m];
      array[m] = array[i];
      array[i] = t;
    }
  
    return array;
}
*/