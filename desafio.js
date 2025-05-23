fetch("https://desafio-endpoint-hashcode-n2.onrender.com/passo2", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    cpf: "701.630.862.65"
  })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
