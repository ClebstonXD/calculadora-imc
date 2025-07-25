
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario");
  const resultado = document.getElementById("resultado");
  const pesoInput = document.getElementById("peso");
  const alturaInput = document.getElementById("altura");

  // Máscara de KG automática no peso
  pesoInput.addEventListener("input", () => {
    let valor = pesoInput.value.replace("kg", "");

    // Substitui vírgula por ponto só internamente, visualmente continua com vírgula
    valor = valor.replace(/[^\d,]/g, ""); // Apenas números e vírgula
    const partes = valor.split(",");

    if (partes.length > 2) {
      valor = partes[0] + "," + partes[1]; // Impede múltiplas vírgulas
    }

    if (partes[1]) {
      partes[1] = partes[1].slice(0, 2); // Limita a 2 casas decimais
    }

    pesoInput.value = partes.join(",");
  });

  // Permite apagar corretamente o peso
  pesoInput.addEventListener("focus", () => {
    pesoInput.value = pesoInput.value.replace("kg", "");
  });

  pesoInput.addEventListener("blur", () => {
    if (pesoInput.value && !pesoInput.value.endsWith("kg")) {
      pesoInput.value += "kg";
    }
  });

  // Limita altura a 2 casas decimais
  alturaInput.addEventListener("input", () => {
    let valor = alturaInput.value.replace(/[^\d,]/g, "");
    const partes = valor.split(",");

    if (partes.length > 2) {
      valor = partes[0] + "," + partes[1];
    }

    if (partes[1]) {
      partes[1] = partes[1].slice(0, 2);
    }

    alturaInput.value = partes.join(",");
  });

  form.addEventListener("submit", calcular);

  function calcular(event) {
    event.preventDefault();

    const pesoStr = pesoInput.value.replace("kg", "").trim();
    const alturaStr = alturaInput.value.trim();

    // Verifica se foi usado ponto em vez de vírgula
    if (pesoStr.includes(".") || alturaStr.includes(".")) {
      resultado.textContent = "Use vírgula (,) como separador decimal. Exemplo: 70,5";
      resultado.classList.add("show");
      return;
    }

    const peso = parseFloat(pesoStr.replace(",", "."));
    const altura = parseFloat(alturaStr.replace(",", "."));

    if (isNaN(peso) || isNaN(altura)) {
      resultado.textContent = "Por favor, preencha os campos com valores válidos.";
      resultado.classList.add("show");
      return;
    }

    // Validações realistas
    if (peso < 20 || peso > 300) {
      resultado.textContent = "Peso inválido. Use um valor entre 20kg e 300kg.";
      resultado.classList.add("show");
      return;
    }

    if (altura < 0.5 || altura > 2.5) {
      resultado.textContent = "Altura inválida. Use um valor entre 0,5m e 2,5m. Exemplo: 1,70";
      resultado.classList.add("show");
      return;
    }

    const imc = peso / (altura * altura);
    const imcFormatado = imc.toFixed(2).replace(".", ",");

    let classificacao = "";

    if (imc < 18.5) {
      classificacao = "Você está abaixo do peso";
    } else if (imc >= 18.5 && imc <= 24.9) {
      classificacao = "Seu peso está normal";
    } else if (imc >= 25 && imc <= 29.9) {
      classificacao = "Você está no Sobrepeso";
    } else if (imc >= 30 && imc <= 34.9) {
      classificacao = "Você está com Obesidade Grau I";
    } else if (imc >= 35 && imc <= 39.9) {
      classificacao = "Você está com Obesidade Grau II";
    } else {
      classificacao = "Você está com Obesidade Mórbida Grau III";
    }

    resultado.innerHTML = `Seu IMC é: ${imcFormatado}<br>${classificacao}`;
    resultado.classList.add("show");
  }
});


