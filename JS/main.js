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
var i = -1;

function quizPlay(){
    if(i < quiz.results.length){ 
        i++;
        pergunta.innerText = quiz.results[i].question;
        
        quiz.results[i].incorrect_answers.push(quiz.results[i].correct_answer);
        array = quiz.results[i].incorrect_answers;

        var quantidadeRespostas = 4;
        var aux1;
        var aux2;

        while (quantidadeRespostas) {

            aux2 = Math.floor(Math.random() * quantidadeRespostas--);
        
            aux1 = array[quantidadeRespostas];
            array[quantidadeRespostas] = array[aux2];
            array[aux2] = aux1;
        }
        
        for (let j = 0; j < 4; j++) {
            document.getElementById("resposta"+j).innerHTML = array[j];
            document.getElementById("resposta"+j).addEventListener("click",
            ()=>{    
                if (document.getElementById("resposta"+j).innerHTML == quiz.results[i].correct_answer) {
                    document.getElementById("resposta"+j).style.backgroundColor = "green";
                    incraseTime = setInterval(1000);

                    setTimeout(
                        ()=>{
                            document.getElementById("resposta"+j).style.backgroundColor = "var(--corFundo)";
                           
                            quizPlay();
                        },3000);
                }
                else{
                    document.getElementById("resposta"+j).style.backgroundColor = "red";
                    
                    for (let k = 0; k < 4; k++) {
                        if (array[k] == quiz.results[i].correct_answer) {
                            document.getElementById("resposta"+k).style.backgroundColor = "green"; 
                        }
                        incraseTime = setInterval(1000);

                        setTimeout(
                            ()=>{
                                document.getElementById("resposta"+k).style.backgroundColor = "var(--corFundo)";
                                document.getElementById("resposta"+j).style.backgroundColor = "var(--corFundo)";

                                quizPlay();
                            },3000);
                    }
                }
            })
        } 
    }   
}