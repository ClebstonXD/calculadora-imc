
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario");
  const resultado = document.getElementById("resultado");
  const pesoInput = document.getElementById("peso");
  const alturaInput = document.getElementById("altura");

  pesoInput.value = "";
  alturaInput.value = "";
  // Formatação dinâmica de peso
  pesoInput.addEventListener("input", () => {
    let valor = pesoInput.value.replace(/\D/g, "");
    if (valor.length > 4) valor = valor.slice(0, 4);
    if (valor.length >= 2) {
      valor = valor.slice(0, -1) + "," + valor.slice(-1);
    }
    pesoInput.value = valor;
  });

  pesoInput.addEventListener("blur", () => {
    if (pesoInput.value && !pesoInput.value.endsWith("kg")) {
      pesoInput.value += "kg";
    }
  });

  pesoInput.addEventListener("focus", () => {
    pesoInput.value = pesoInput.value.replace("kg", "");
  });

  // Formatação dinâmica de altura
  alturaInput.addEventListener("input", () => {
    let valor = alturaInput.value.replace(/\D/g, "");
    if (valor.length > 3) valor = valor.slice(0, 3);
    if (valor.length >= 2) {
      valor = valor.slice(0, -2) + "," + valor.slice(-2);
    }
    alturaInput.value = valor;
  });

  alturaInput.addEventListener("blur", () => {
    if (alturaInput.value && !alturaInput.value.endsWith("m")) {
      alturaInput.value += "m";
    }
  });

  alturaInput.addEventListener("focus", () => {
    alturaInput.value = alturaInput.value.replace("m", "");
  });

  // Cálculo do IMC
  form.addEventListener("submit", calcular);

  function calcular(event) {
    event.preventDefault();

    let pesoStr = pesoInput.value.replace("kg", "").replace(",", ".");
    let alturaStr = alturaInput.value.replace("m", "").replace(",", ".");

    const peso = parseFloat(pesoStr);
    const altura = parseFloat(alturaStr);

    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0 || altura >= 3) {
      resultado.innerHTML = `<div role="alert">Por favor, preencha os campos com valores válidos.</div>`;
      resultado.classList.add("show");
      return;
    }

    if (peso < 20 || peso > 300) {
      resultado.textContent = "Peso inválido. Use um valor entre 20kg e 300kg.";
      resultado.classList.add("show");
      return;
    }

    if (altura < 0.5 || altura > 2.5) {
      resultado.textContent = "Altura inválida. Use um valor entre 0,5m e 2,5m.";
      resultado.classList.add("show");
      return;
    }

    const imc = peso / (altura * altura);
    const imcFormatado = imc.toFixed(2).replace(".", ",");

    let classificacao = "";

    if (imc < 18.5) {
      classificacao = "Você está abaixo do peso";
    } else if (imc <= 24.9) {
      classificacao = "Seu peso está normal";
    } else if (imc <= 29.9) {
      classificacao = "Você está no Sobrepeso";
    } else if (imc <= 34.9) {
      classificacao = "Você está com Obesidade Grau I";
    } else if (imc <= 39.9) {
      classificacao = "Você está com Obesidade Grau II";
    } else {
      classificacao = "Você está com Obesidade Mórbida Grau III";
    }

    resultado.innerHTML = `Seu IMC é: ${imcFormatado}<br>${classificacao}`;
    resultado.classList.add("show");
  }
});


