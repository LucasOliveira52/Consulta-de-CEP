const inputCep = document.getElementById("input-cep");
const inputRua = document.getElementById("input-rua");
const inputBairro = document.getElementById("input-bairro");
const inputCidade = document.getElementById("input-cidade");
const formCep = document.getElementById("consultar-form");

inputCep.addEventListener("focusout", consultarCep);

async function consultarCep () {
    try {
        const cep = inputCep.value;
        if (isNaN(cep) || cep.length != 8) {
            throw new Error("CEP Inválido! Certifique-se de que a sequência possua 8 dígitos e tenha apenas números válidos.");
        }
        const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
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