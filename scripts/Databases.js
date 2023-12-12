
let database_principal = document.getElementById("database_principal");
let porta_principal = document.getElementById("porta_principal");
let user_principal = document.getElementById("user_principal");
let Password_principal = document.getElementById("Password_principal");
let database_exportar = document.getElementById("database_exportar");
let porta_exportar = document.getElementById("porta_exportar");
let user_exportar = document.getElementById("user_exportar");
let Password_exportar = document.getElementById("Password_exportar");

function caminhos() {
    console.log(database_principal.value)
    console.log(porta_principal.value)
    console.log(user_principal.value)
    console.log(Password_principal.value)
    console.log(database_exportar.value)
    console.log(porta_exportar.value)
    console.log(user_exportar.value)
    console.log(Password_exportar.value)
    document.getElementById("btn_connect").disabled = "true";
    console.log(database_principal,
        porta_principal,
        user_principal,
        Password_principal,
        database_exportar,
        porta_exportar,
        user_exportar,
        Password_exportar)

}