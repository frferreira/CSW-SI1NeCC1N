function enviaDados()
{
    document.getElementById("inputusuario").innerHTML = "Nome enviado foi: " + window.prompt("Digite seu nome: ");
}
function exibeDados()
{
    window.alert("Nome digitado foi: " + document.getElementById("nome").value);

}
