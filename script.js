var ramLeft = 1000;
var ramTotal = 1000;
var ramTab = 50;
var tabs = 0;
var collapseD = false;
var cardinals = 0;
var cardinalGain = 0;
setInterval(update, 100);
function openTab() {
  ramLeft -= ramTab;
  tabs++;
}
function update() {
  get("ramLeft").innerHTML = (ramLeft >= 1000) ? `${ramLeft / 1000}kB` : `${ramLeft}B`;
  get("tabsOpen").innerHTML = `${tabs} tabs`;
  cardinalGain = Math.log10(ramTotal).toFixed(0);
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
  collapsed.setAttribute("id", "collapseText");
  document.body.insertBefore(collapsed, get("ramLeft"));
  collapseD = true;
  setTimeout(uncollapse(), 3000);
}
function uncollapse() {
  cardinals += cardinalGain;
  get("collapseText").style.display = "none";
  document.body.style.backgroundColor = "white";
  ramLeft = ramTotal;
  collapseD = false;
}

function get(id) {
  return document.getElementById(id);
}
var listofstuff = ["ramLeft", "ramTotal", "ramTab", "tabs", "collapseD", "cardinals", "cardinalGain"];
var saveload = {
  save: function() {
    listofstuff.forEach(x => localStorage.setItem(x, JSON.stringify(window[x])));
  },
  load: function() {
    visitedBefore = JSON.parse(localStorage.getItem('visitedBefore'));
    if (visitedBefore == null || visitedBefore == undefined) {
      visitedBefore = false;
    }
    if (visitedBefore) {
      listofstuff.forEach(x => window[x] = JSON.parse(localStorage.getItem(x)));
    }
  },
  init: function() {
    setTimeout(saveload.activateAutosave, 5000);
    saveload.load();
    if (!visitedBefore) {
      visitedBefore = true;
      saveload.save();
    }
  },
  activateAutosave: function() {
    setInterval(saveload.save, 5000);
  },
  wipeSave: function() {
    let listofdefault = [1000, 1000, 50, 0, false, 0, 0];
    for (i = 0; i <= listofdefault.length; i++) {
      window[listofstuff[i]] = listofdefault[i];
    }
  }
};
setTimeout(saveload.init, 1000);