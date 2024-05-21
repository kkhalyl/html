function resultRodada(jogadaPC, jogadaUs, pontos){
  if(jogadaPC == 1){
    document.writeln("Computador jogou Papel"+ "<br>")
  }
  if(jogadaPC == 2){
    document.writeln("Computador jogou Pedra"+ "<br>")
  }
  if(jogadaPC == 3){
    document.writeln("Computador jogou Tesoura"+ "<br>")
  }
  if (jogadaPC==jogadaUs){
    document.writeln("A rodada empatou!");
    resultado = 0;
  }

  if ((jogadaPC==2 && jogadaUs==1) || (jogadaPC==3 && jogadaUs==2) || (jogadaPC==1 && jogadaUs==3)){
    document.writeln("Você ganhou!"+ "<br>");
    resultado = 1;
  }

  else {
    document.writeln("Você perdeu, a sua pontuação foi de " + pontos);
    resultado = -1;
  }
  
  return resultado
}

var resultado = 0;
var pontos = 0;
while (resultado >= 0){
  let jogadaPC = (Math.floor(Math.random() * 3) + 1);
  let jogadaUs = parseInt(prompt("Insira sua jogada: 1 - Papel, 2 - Pedra, 3 - Tesoura"));
  document.writeln("Escolha sua jogada: <br>1 - Papel<br>2 - Pedra<br>3 - Tesoura<br>");
  resultado = resultRodada(jogadaPC, jogadaUs, pontos);
  pontos += resultado;
}

