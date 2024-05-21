function criarTabelas(){
  var i = 1;
  var j = 0;
  

  while (i <= 10){
    var table = document.createElement("table");
    table.classList.add('tabela');
    table.setAttribute('border', '1');

    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.classList.add('produtos');

    td.innerText = 'Produtos de '+i;
    //i need this td to cover the whole row
    td.colSpan = 2;
    tr.appendChild(td);
    table.appendChild(tr);

    document.body.appendChild(table);

    while (j <= 10){
      var tr = document.createElement('tr');
      tr.classList.add('mult');
      var td = document.createElement('td');
      var td1 = document.createElement('td');

      td.innerText = i+'x'+j;

      tr.appendChild(td);

      td1.innerText = i*j;

      tr.appendChild(td1);
      
      table.appendChild(tr);

      j++;  
    }
    j=0
    i++;
  }
}

criarTabelas();
