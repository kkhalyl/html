document.addEventListener("DOMContentLoaded", () => {
  const raioInput = document.getElementById('raioInput') as HTMLInputElement;
  const areaInput = document.getElementById('areaInput') as HTMLInputElement;
  const circunferenciaInput = document.getElementById('circunferenciaInput') as HTMLInputElement;
  const botaoOK = document.getElementById('botaoOK') as HTMLInputElement;

  function calculateCircle(): void {
    const radius = parseFloat(raioInput.value);
    if (isNaN(radius) || radius <= 0) {
      alert("Por favor, insira um valor válido para o raio.");
      return;
    }

    const area = (Math.PI * Math.pow(radius, 2)).toFixed(2);
    const circumference = (2 * Math.PI * radius).toFixed(2);

    areaInput.value = area;
    circunferenciaInput.value = circumference;
  }

  botaoOK.addEventListener('click', calculateCircle);

  if (raioInput.value) {
    calculateCircle();
  }
});
