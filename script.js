
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario");
  const resultado = document.getElementById("resultado");

  form.addEventListener("submit", calcular);
  
  // IMC = peso / (altura*altura);
  
  function calcular(event) {
    event.preventDefault();

    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
      resultado.textContent = "Por favor, preencha os campos com valores válidos.";
      resultado.classList.add("show");
      return;
    }

    const IMC = peso / (altura * altura);
    const imcFormatado = IMC.toFixed(2);


    let classificacao = "";

    if (IMC < 18.5) {
    classificacao = "Você está abaixo do peso";

    } else if (IMC >= 18.5 && IMC <= 24.9) {
    classificacao = "Seu peso está normal";

    } else if (IMC >= 25 && IMC <= 29.9) {
    classificacao = "Você está no Sobrepeso";

    } else if (IMC >= 30 && IMC <= 34.9) {
    classificacao = "Você está com Obesidade Grau I";

    } else if (IMC >= 35 && IMC <= 39.9) {
    classificacao = "Você está com Obesidade Grau II";

    } else {
    classificacao =  "Você está com Obesidade Mórbida Grau III";
    }
  
    resultado.innerHTML = `Seu IMC é: ${imcFormatado}<br>${classificacao}`;
    resultado.classList.add("show");
  }
});

