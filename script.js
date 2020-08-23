var ramLeft = 1000;
var ramTab = 50;
var tabs = 0;
var collapseD = false;
setInterval(update, 100);
function openTab() {
  ramLeft -= ramTab;
  tabs++;
}
function update() {
  get("ramLeft").innerHTML = (ramLeft >= 1000) ? `${ramLeft / 1000}kB` : `${ramLeft}B`;
  if (ramLeft <= 0 && !collapseD) {
    collapse();
  }
}
function collapse() {
  get("openTab").style.display = "none";
  document.body.style.backgroundColor = "black";
  let collapsed = document.createElement("p");
  let collapseText = document.createTextNode("YOU HAVE COLLAPSED!");
  collapsed.appendChild(collapseText);
  collapsed.setAttribute("style", "color: lime; font-size: 175px; font-family: Comic Sans MS");
  document.body.insertBefore(collapsed, get("ramLeft"));
  collapseD = true;
  // setTimeout(uncollapse(), 3000);
}
function get(id) {
  return document.getElementById(id);
}