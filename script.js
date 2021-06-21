var ramLeft = 2000000;
var ramTotal = 2000000;
var ramTab = 50;
var tabs = 0;
var tabsCollapse = 0;
var collapsing = false;
var collapsedNum = 0;
var cardinals = 0;
var totCard = 0;
var cardinalGain = 1;
var visitedBefore = false;
var shopCost = [10, 1000, 1, 1, 1];
var bought = [0, 0, 0, 0, 0];
var scaling = [1.23, 1.33];
var meltPrice = 250;
var autobuyer = false;
setInterval(update, 50);
setInterval(autoTabs, 1000);
var saveList = ["ramLeft", "ramTotal", "ramTab", "tabs", "tabsCollapse", "collapsing", "collapsedNum", "cardinals", "cardinalGain", "visitedBefore", "shopCost", "bought", "autobuyer", "totCard", "meltPrice", "scaling"];
var defaultList = [2000000, 2000000, 50, 0, 0, false, 0, 0, 1, false, [10, 1000, 1, 1, 1], [0, 0, 0, 0, 0], false, 0, 250, [1.23, 1.33]];
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
        if (window[saveList[x]].constructor == Array) { for (y = 0; y < window[saveList[x]].length; y++) { if (window[saveList[x]][y] == undefined || window[saveList[x]][y] == null) { window[saveList[x]][y] = defaultList[x][y]; } } }
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
  function pretty(num) {
    if (num >= 1000000000) {return `${(num/1000000000).toPrecision(4)}GB`}
    if (num >= 1000000) {return `${(num/1000000).toPrecision(4)}MB`}
    if (num >= 1000) {return `${(num/1000).toPrecision(3)}KB`}
    return `${num}B`
  }
  function tabIncome() {return Math.floor((bought[0] + bought[1] * 5) * ((cardinals + 1) ** 0.5))}
  ramLeft = Math.round(ramTotal - (ramTab * tabs));
  get("progress").innerHTML = `${tabs} open tab${tabs == 1 ? ` is` : `s are`} using ${pretty(ramTotal - ramLeft)} out of ${pretty(ramTotal)} RAM`;
  get("income").innerHTML = `Opening ${tabIncome()} tabs per second at a cost of ${ramTab} bytes per tab uses ${tabIncome() * ramTab} bytes per second`;
  get("timer").innerHTML = `You will run out of RAM in approximately ${Math.ceil(ramLeft / tabIncome() / ramTab)} seconds`;
  get("cardNum").innerHTML = `You have ${cardinals} unspent cardinals, which boost your tab production by x${((cardinals + 1) ** 0.5).toPrecision(3)}`;
  get("melter").innerHTML = `Melt your RAM (${meltPrice} cardinals)`;
  if (ramLeft <= 0 && !collapsing) {
    collapse();
  }
  if (tabsCollapse >= 10) {
    get("auto0").style.display = "block";
  }
  if (bought[0] >= 10) {
    get("auto1").style.display = "block";
    get("timer").style.display = (collapsedNum >= 5) ? "block" : "none";
  }
  if (collapsedNum >= 1) {
    get("cardMenuOp").style.display = "inline";
  }
  if (cardinals >= 25) {
    get("cardAutoBuy").style.display = "block";
  }
  if (cardinals >= 250) {
    get("melter").style.display = "block";
  }
  if (autobuyer) {
    while (tabs >= shopCost[0]) {
      shop(0, 0);
    }
    while (tabs >= shopCost[1]) {
      shop(1, 0);
    }
    get("cardAutoBuy").style.backgroundColor = "lime";
    get("cardAutoBuy").innerHTML = `Autobuy tab-openers (Bought)`;
  }
  get("auto0").innerHTML = `New Tab Button (${shopCost[0]} tabs) (${bought[0]} owned)`;
  get("auto1").innerHTML = `Ctrl+T (${shopCost[1]} tabs) (${bought[1]} owned)`;
  get("cardUp0").innerHTML = `Decrease maximum RAM (${pretty(ramTotal)} -> ${pretty(Math.floor(ramTotal * 0.92))}): ${shopCost[2]} ${shopCost[2] > 1 ? "cardinals" : "cardinal"}`;
  get("cardUp1").innerHTML = `Increase tab RAM cost (${pretty(ramTab)} -> ${pretty(Math.floor(ramTab * 1.25))}): ${shopCost[3]} ${shopCost[3] > 1 ? "cardinals" : "cardinal"}`;
  get("cardUp2").innerHTML = `Slower tab cost scaling (x${(0.9907 ** bought[4]).toPrecision(4)} -> x${(0.9907 ** (bought[4]+1)).toPrecision(4)}): ${shopCost[4]} ${shopCost[4] > 1 ? "cardinals" : "cardinal"}`;
}
function autoTabs() {
  tabs += Math.floor((bought[0] + (bought[1] * 5)) * ((cardinals + 1) ** 0.5));
}
function shop(num, sect) {
  if (sect == 0) {
    if (num == 0 && tabs >= shopCost[0]) {
      tabs -= shopCost[0];
      shopCost[0] = Math.ceil(shopCost[0] * scaling[0]);
      bought[0]++;
    }
    if (num == 1 && tabs >= shopCost[1]) {
      tabs -= shopCost[1];
      shopCost[1] = Math.ceil(shopCost[1] * scaling[1]);
      bought[1]++;
    }
  }
  if (sect == 1) {
    if (num == 0 && cardinals >= shopCost[2]) {
      cardinals -= shopCost[2];
      shopCost[2] = Math.ceil(shopCost[2] * 1.38);
      ramTotal = Math.floor(ramTotal * 0.92);
      bought[2]++;
    }
    if (num == 1 && cardinals >= shopCost[3]) {
      cardinals -= shopCost[3];
      shopCost[3] = Math.ceil(shopCost[3] * 1.38);
      ramTab = Math.ceil(ramTab * 1.25);
      bought[3]++;
    }
    if (num == 2 && cardinals >= shopCost[4]) {
      cardinals -= shopCost[4];
      shopCost[4] = Math.ceil(shopCost[4] * 1.38);
      scaling[0] -= (scaling[0] * 0.93) / 100;
      scaling[1] -= (scaling[0] * 0.93) / 100;
      bought[4]++;
    }
    if (num == 3 && cardinals >= 25 && !autobuyer) {
      cardinals -= 25;
      autobuyer = true;
    }
    if (num == 4 && cardinals >= meltPrice) {
      cardinals -= meltPrice;
      meltPrice = Math.ceil(meltPrice * 50);
      collapse();
      ramTotal = Math.ceil(ramTotal * 50);
      cardinalGain = Math.floor(cardinalGain * 50);
    }
  }
}
function collapse() {
  collapsedNum++;
  cardinals += cardinalGain;
  bought[0] = 0;
  bought[1] = 0;
  shopCost[0] = 10;
  shopCost[1] = 1000;
  ramLeft = ramTotal;
  tabs = 0;
  tabsCollapse = 0;
  if (!get("collapseText") && totCard < 51) {
    document.body.style.backgroundColor = "black";
    openSection("cardMenu");
    get("menuB").style.display = "none";
    let collapsed = document.createElement("p");
    let collapseText = document.createTextNode("YOU HAVE COLLAPSED!");
    collapsed.appendChild(collapseText);
    collapsed.setAttribute("style", "color: lime; font-size: 175px; font-family: Comic Sans MS");
    collapsed.setAttribute("id", "collapseText");
    document.body.insertBefore(collapsed, get("ramMenu"));
  } else if (totCard < 51) {
    openSection("cardMenu");
    get("menuB").style.display = "none";
    document.body.style.backgroundColor = "black";
    get("collapseText").style.display = "block";
  }
  if (totCard < 51) {
    collapsing = true;
    setTimeout(uncollapse, 3000);
  }
}
function uncollapse() {
  get("collapseText").style.display = "none";
  get("menuB").style.display = "block";
  document.body.style.backgroundColor = "#292929";
  collapsing = false;
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
