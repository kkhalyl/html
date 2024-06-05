const lugar = [];

document.addEventListener("mousemove", function(event) {
  let dot = document.createElement("div");
  dot.className = "dot";
  dot.style.left = (event.pageX - 4) + "px";
  dot.style.top = (event.pageY - 4) + "px";
  container.appendChild(dot);
  lugar.push(dot);

  if (lugar.length > 8) {
    const oldDot = lugar.shift();
    container.removeChild(oldDot);
  }
});
