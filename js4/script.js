function calcular(){
  const raio = document.getElementById('Raio').value;
  const areaCirculo = Math.PI * Math.pow(raio, 2);
  const circunferencia = 2 * Math.PI * raio;

  document.getElementById('Area').value = areaCirculo.toFixed(2);
  document.getElementById('Circunferência').value = circunferencia.toFixed(2);
}
