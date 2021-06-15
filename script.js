var ramLeft = 1000000;
var ramTotal = 1000000;
var ramTab = 50;
var tabs = 0;
var tabsCollapse = 0;
var collapsing = false;
var collapsedNum = 0;
var cardinals = 0;
var cardinalGain = 1;
var visitedBefore = false;
var shopCost = [10, 1000, 1, 1, 1];
var bought = [0, 0, 0, 0, 0];
setInterval(update, 50);
setInterval(autoTabs, 1000);
var saveList = ["ramLeft", "ramTotal", "ramTab", "tabs", "tabsCollapse", "collapsing", "collapsedNum", "cardinals", "cardinalGain", "visitedBefore", "shopCost", "bought"];
var defaultList = [1000000, 1000000, 50, 0, false, 0, 0, 1, false, [10, 1000, 1, 1, 1], [0, 0, 0, 0, 0]];
var saveload = {
  save: function() {
    saveList.forEach(x => window.localStorage.setItem(x, JSON.stringify(window[x])));
  },
  load: function() {
    visitedBefore = JSON.parse(window.localStorage.getItem('visitedBefore'));
    if (visitedBefore == null || visitedBefore == undefined) {
      visitedBefore = false;
    }
    if (visitedBefore) {
      for (x = 0; x < saveList.length; x++) {
        window[saveList[x]] = JSON.parse(window.localStorage.getItem(saveList[x]));
        if (window[saveList[x]] == undefined) { window[saveList[x]] = defaultList[x]; }
      }
    }
  },
  activateAutosave: function() {
    setInterval(saveload.save, 5000);
  },
  init: function() {
    setTimeout(saveload.activateAutosave, 5000);
    saveload.load();
    visitedBefore = true;
  },
  reset: function() {
    for (x = 0; x < saveList.length; x++) {
      window[saveList[x]] = defaultList[x];
    }
  }
};
setTimeout(saveload.init, 500);
function openTab() {
  tabs++;
  tabsCollapse++;
}
function update() {
  ramLeft = ramTotal - (ramTab * tabs);
  get("ramLeft").innerHTML = (ramLeft >= 1000000) ? `${ramLeft / 1000000}MB` : (ramLeft >= 1000) ? `${ramLeft/1000}kB` : `${ramLeft}B`;
  get("tabs").innerHTML = `${tabs} tabs`;
  get("ramTab").innerHTML = `${ramTab}B/tab`;
  get("cardNum").innerHTML = `${cardinals} cardinals`;
  if (ramLeft <= 0 && !collapsing) {
    collapse();
  }
  if (tabsCollapse >= 10) {
    get("auto0").style.display = "block";
  }
  if (bought[0] >= 10) {
    get("auto1").style.display = "block";
  }
  if (collapsedNum >= 1) {
    get("cardMenuOp").style.display = "inline";
  }
  get("auto0").innerHTML = `New Tab Button (${shopCost[0]} tabs) (${bought[0]}x)`;
  get("auto1").innerHTML = `Ctrl+T (${shopCost[1]/1000}k tabs) (${bought[1]}x)`;
  get("cardUp0").innerHTML = `Decrease RAM (${shopCost[2]} ${shopCost[2] > 1 ? "cardinals" : "cardinal"})`;
  get("cardUp1").innerHTML = `Increase tab RAM (${shopCost[3]} ${shopCost[3] > 1 ? "cardinals" : "cardinal"})`;
  get("cardUp2").innerHTML = `Decrease prices (${shopCost[4]} ${shopCost[4] > 1 ? "cardinals" : "cardinal"})`;
}
function autoTabs() {
  tabs += bought[0] + (bought[1] * 5);
}
function shop(num, sect) {
  if (sect == 0) {
    if (num == 0 && tabs >= shopCost[0]) {
      tabs -= shopCost[0];
      shopCost[0] = Math.ceil(shopCost[0] * 1.23);
      bought[0]++;
    }
    if (num == 1 && tabs >= shopCost[1]) {
      tabs -= shopCost[0];
      shopCost[1] = Math.ceil(shopCost[1] * 1.33);
      bought[1]++;
    }
  }
  if (sect == 1) {
    if (num == 0 && cardinals >= shopCost[2]) {
      cardinals -= shopCost[2];
      shopCost[2] = Math.ceil(shopCost[2] * 1.38);
      ramTotal = Math.floor(ramTotal * 0.92);
    }
    if (num == 1 && cardinals >= shopCost[3]) {
      cardinals -= shopCost[3];
      shopCost[3] = Math.ceil(shopCost[3] * 1.38);
      ramTab = Math.ceil(ramTab * 1.25);
    }
    if (num == 2 && cardinals >= shopCost[4]) {
      cardinals -= shopCost[4];
      shopCost[4] = Math.ceil(shopCost[4] * 1.38);
      shopCost[0] = Math.ceil(shopCost[0] * 0.9);
      shopCost[1] = Math.ceil(shopCost[1] * 0.9);
    }
  }
}
function collapse() {
  if (!get("collapseText")) {
    collapsedNum++;
    cardinals += cardinalGain;
    bought = [0, 0];
    shopCost = [10, 1000];
    document.body.style.backgroundColor = "black";
    openSection("a");
    get("menuB").style.display = "none";
    let collapsed = document.createElement("p");
    let collapseText = document.createTextNode("YOU HAVE COLLAPSED!");
    collapsed.appendChild(collapseText);
    collapsed.setAttribute("style", "color: lime; font-size: 175px; font-family: Comic Sans MS");
    collapsed.setAttribute("id", "collapseText");
    document.body.insertBefore(collapsed, get("ramMenu"));
  } else {
    collapsedNum++;
    cardinals += cardinalGain;
    openSection("a");
    get("menuB").style.display = "none";
    bought = [0, 0];
    shopCost = [10, 1000];
    document.body.style.backgroundColor = "black";
    get("collapseText").style.display = "block";
  }
  collapsing = true;
  setTimeout(uncollapse, 3000);
}
function uncollapse() {
  get("collapseText").style.display = "none";
  get("menuB").style.display = "block";
  document.body.style.backgroundColor = "white";
  ramLeft = ramTotal;
  collapsing = false;
  tabs = 0;
  tabsCollapse = 0;
  openSection("ramMenu");
  if (collapsedNum == 1) {
    get("cardMenuOp").style.display = "block";
  }
}
function get(id) {
  return document.getElementById(id);
}
function openSection(pageName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("menu");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("menuBtn");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  get(pageName).style.display = "block";
}