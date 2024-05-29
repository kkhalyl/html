class IntegerSet {
  constructor (tamanhoMax) {
    this.tamanhoMax = tamanhoMax;
    this.vetor = new Array(tamanhoMax+1).fill(false)
  }
  insercao (elemento) {
    if (elemento > this.tamanhoMax || elemento < 0) {
      throw new Error("Elemento inválido");
    }
    this.vetor[elemento] = true;
  }
  remocao (elemento) {
    if (elemento > this.tamanhoMax || elemento < 0) {
      throw new Error("Elemento inválido");
    }
    this.vetor[elemento] = false;
  }
  uniao (outroSet) {
    let novoSet = new IntegerSet(this.tamanhoMax);
    for (let i = 0; i <= this.tamanhoMax; i++) {
      if (this.vetor[i] || outroSet.vetor[i]) {
        novoSet.insercao(i);
      }
    }
    return novoSet;
  }
  intersecao (outroSet) {
    let novoSet = new IntegerSet(this.tamanhoMax);
    for (let i = 0; i <= this.tamanhoMax; i++) {
      if (this.vetor[i] && outroSet.vetor[i]) {
        novoSet.insercao(i);
      }
    }
    return novoSet;
  }
  diferenca (outroSet) {
    let novoSet = new IntegerSet(this.tamanhoMax);
    for (let i = 0; i <= this.tamanhoMax; i++) {
      if (this.vetor[i] && !outroSet.vetor[i]) {
        novoSet.insercao(i);
      }
    }
    return novoSet;
  }
  toString () {
    let str = "{";
    for (let i = 0; i <= this.tamanhoMax; i++) {
      if (this.vetor[i]) {
        str += i + ", ";
      }
    }
    str = str.slice(0, -2);
    str += "}";
    return str;
  }
}

function testarIS() {
  let set1 = new IntegerSet(10);
  let set2 = new IntegerSet(10);

  set1.insercao(1);
  set1.insercao(5);
  set1.insercao(7);

  set2.insercao(2);
  set2.insercao(5);
  set2.insercao(9);

  console.log("Set 1:", set1.toString());
  console.log("Set 2:", set2.toString());

  let union = set1.uniao(set2);
  console.log("União:", union.toString());
  let intersection = set1.intersecao(set2);
  console.log("Interseção:", intersection.toString());
  let diferenca = set1.diferenca(set2);
  console.log("Diferença:", diferenca.toString());

  set1.remocao(5)
  set2.remocao(9)
  console.log("Set 1 após remoção:", set1.toString());
  console.log("Set 2 após remoção:", set2.toString());
}

testarIS();
