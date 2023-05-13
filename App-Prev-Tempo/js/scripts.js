const key = "07f6dfc4188ffd0a7b2a3f566fd6254c"


document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("input").addEventListener("keypress", function(event){
        if(event.keyCode == 13){
            cliqueiNoBotao();
        }
    });
});

async function buscarCidade(cidade){
    const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${key}&lang=pt_br&units=metric`).then(resposta => resposta.json())
    
    colocarDadosNaTela(dados)
}

function cliqueiNoBotao(){
    const cidade = document.querySelector(".input-cidade").value;
    buscarCidade(cidade);
}

function colocarDadosNaTela(dados){
    document.querySelector(".cidade").innerHTML = `Tempo em ${dados.name} - ${dados.sys.country}`;

    document.querySelector(".temp").innerHTML = `${Math.floor(dados.main.temp)}°C`;
    document.querySelector(".img-previsao").src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`
    document.querySelector(".texto-previsao").innerHTML = (dados.weather[0].description);

    document.querySelector(".umidade").innerHTML = `Umidade ${dados.main.humidity}%`;
}
