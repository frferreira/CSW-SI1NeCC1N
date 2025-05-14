
function exibeDados() {

    document.getElementById("resposta").innerHTML = "Esse é o meu novo segundo código javascript";
    document.getElementById("resposta2").innerHTML =
        /*window.confirm("Você está gostando do curso?");*/
        "O nome digitado foi: " + window.prompt("Qual é o seu nome:");

   
}

function enviaDados() {
    window.alert("O nome digitado foi: " + document.getElementById("nome").value);
    
}

function AbrirPagina(){
    window.open("pagi001.html", "_blank");
}

