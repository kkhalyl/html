function GerarGrafico() {
  for (let i = 0; i < 5; i++) {
    let barra = document.getElementById(`b${i + 1}`);
    let largura = document.getElementById(`Largura1`);
    let altura = document.getElementById(`Barra${i + 1}`);
    barra.style.height = `${altura.value}px`;
    barra.style.width = `${largura.value}px`;
  }
}
