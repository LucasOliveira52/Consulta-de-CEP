const URL = "https:/viacep.com.br/ws/[CEP_VALOR]/json/";
const inputCep = document.getElementById("input-cep");
const inputRua = document.getElementById("input-rua");
const inputBairro = document.getElementById("input-bairro");
const inputCidade = document.getElementById("input-cidade");
const formCep = document.getElementById("consultar-form");

inputCep.addEventListener("focusout", consultarCep);

async function consultarCep () {
    try {
        if (inputCep.value.length != 8) {
            throw new Error("O campo de CEP tem que ter 8 digítos");
        }
        const urlReal = URL.replace("[CEP_VALOR]", inputCep.value);
        const resp = await fetch(urlReal);
        const obj = await resp.json();

        atribuirValores(obj);

        if (obj.erro === true) {
            throw new Error("CEP Inexistente");
        }
    } 
    catch (error) {
        alert(error.message);
    }
}

function atribuirValores (obj) {
    inputRua.value = obj.logradouro;
    inputBairro.value = obj.bairro;
    inputCidade.value = obj.localidade;
}