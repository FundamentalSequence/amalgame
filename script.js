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
var shopCost = [10, 1000, 1, 1, 1];
var bought = [0, 0, 0, 0, 0];
var scaling = [1.23, 1.33];
var meltPrice = 250;
var autobuyer = false;
var autotab = false;
var estCollapse = -1;
var treeUnlocked = false;
var treePoints = [0];
var treeGain = [0];
setInterval(update, 50);
setInterval(autoTabs, 1000);
var saveList = ["ramLeft", "ramTotal", "ramTab", "tabs", "tabsCollapse", "collapsing", "collapsedNum", "cardinals", "cardinalGain", "shopCost", "bought", "autobuyer", "autotab", "totCard", "meltPrice", "scaling", "treeUnlocked", "treePoints"];
var defaultList = [2000000, 2000000, 50, 0, 0, false, false, 0, 0, 1, [10, 1000, 1, 1, 1], [0, 0, 0, 0, 0], false, 0, 250, [1.23, 1.33], false, [0]];
var saveload = {
  save: function() {
    saveList.forEach(x => localStorage.setItem(x, JSON.stringify(window[x])));
  },
  load: function() {
    try {
      for (x = 0; x < saveList.length; x++) {
      window[saveList[x]] = JSON.parse(localStorage.getItem(saveList[x]));
      if (window[saveList[x]].constructor == Array) {
        for (y = 0; y < window[saveList[x]].length; y++) {
          if (window[saveList[x]][y] == undefined || window[saveList[x]][y] == null) { window[saveList[x]][y] = defaultList[x][y]; 
          } 
        } 
      }
      if (window[saveList[x]] == undefined || window[saveList[x] == null]) { window[saveList[x]] = defaultList[x]; }
      }
    } catch (error) {
      console.warn("why didnt it work...");
    }
    if (treeUnlocked) {
      get("cardPres").style.backgroundColor = "lime";
      get("cardPres").innerHTML = `Ascended to the next layer`;
    }
    if (autotab) {
      get("cardAutoTab").style.backgroundColor = "lime";
      get("cardAutoTab").innerHTML = `Automatically open tabs (Bought)`;
    }
  },
  activateAutosave: function() {
    setInterval(saveload.save, 5000);
  },
  init: function() {
    openSection("ramMenu");
    saveload.load();
    setTimeout(saveload.activateAutosave, 500);
  },
  reset: function() {
    for (x = 0; x < saveList.length; x++) {
      window[saveList[x]] = defaultList[x];
    }
  }
};
setTimeout(saveload.init, 500);
function update() {
  ramLeft = Math.round(ramTotal - (ramTab * tabs));
  estCollapse = Math.floor(ramLeft / (((bought[0] + (bought[1] * 10)) * ((cardinals == 0) ? 1 : (cardinals ** 0.5))) * ramTab));
  get("ramLeft").innerHTML = (ramLeft >= 1000000) ? `${(ramLeft / 1000000).toFixed(3)}MB` : (ramLeft >= 1000) ? `${(ramLeft / 1000).toFixed(3)}kB` : `${ramLeft}B`;
  get("tabs").innerHTML = `${tabs} tabs`;
  get("ramTab").innerHTML = `${ramTab}B/tab`;
  get("cardNum").innerHTML = `${cardinals} cardinals`;
  get("bs").innerHTML = `${(bought[0] + (bought[1] * 10)) * ramTab}B/s`;
  get("melter").innerHTML = `Melt your RAM (${meltPrice} cardinals)`;
  get("totalCards").innerHTML = `Your total cardinals is ${totCard}`;
  get("totalTabsC").innerHTML = `Your total tabs this collpase is ${tabsCollapse}`;
  get("estTC").innerHTML = `Estimated time to collapse: ${estCollapse == Infinity ? "Never" : estCollapse + "s"}`;
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
  if (cardinals >= 25) {
    get("cardAutoBuy").style.display = "block";
  }
  if (cardinals >= 250) {
    get("melter").style.display = "block";
  }
  if (cardinals >= 50000) {
    get("cardPres").style.display = "block";
  }
  if (treeUnlocked) {
    get("treeOp").style.display = "inline";
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
  treeGain[0] = Math.floor(cardinals ** 0.2);
  get("auto0").innerHTML = `New Tab Button (${shopCost[0]} tabs) (${bought[0]}x)`;
  get("auto1").innerHTML = `Ctrl+T (${shopCost[1]/1000}k tabs) (${bought[1]}x)`;
  get("cardUp0").innerHTML = `Decrease RAM (${shopCost[2]} ${shopCost[2] > 1 ? "cardinals" : "cardinal"})`;
  get("cardUp1").innerHTML = `Increase tab RAM (${shopCost[3]} ${shopCost[3] > 1 ? "cardinals" : "cardinal"})`;
  get("cardUp2").innerHTML = `Decrease prices (${shopCost[4]} ${shopCost[4] > 1 ? "cardinals" : "cardinal"})`;
  get("presPres").innerHTML = `Prestige for ${treeGain[0]} ${treeGain[0] > 1 ? "points" : "point"}`;
  get("presPcount").innerHTML = `You have ${treePoints[0]} prestige ${treePoints[0] > 1 ? "points" : "point"}`;
}
function openTab() {
  tabs++;
  tabsCollapse++;
}
function autoTabs() {
  tabs += Math.floor((bought[0] + (bought[1] * 10)) * ((cardinals == 0) ? 1 : (cardinals ** 0.5)));
  tabsCollapse += Math.floor((bought[0] + (bought[1] * 10)) * ((cardinals == 0) ? 1 : (cardinals ** 0.5)));
  if (autotab) {
    tabs += 1;
    tabsCollapse += 1;
  }
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
    if (num == 5 && cardinals >= 50000 && !treeUnlocked) {
      cardinals -= 50000;
      treeUnlocked = true;
      get("cardPres").style.backgroundColor = "lime";
      get("cardPres").innerHTML = `Ascended to the next layer`;
    }
    if (num == 6 && cardinals >= 50 && !autotab) {
      cardinals -= 50;
      autotab = true;
      get("cardAutoTab").style.backgroundColor = "lime";
      get("cardAutoTab").innerHTML = `Automatically open tabs (Bought)`;
    }
  }
  if (sect == 2) {
    // buy
  }
}
function collapse() {
  collapsedNum++;
  cardinals += cardinalGain;
  totCard += cardinalGain;
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
    get("ramMenu").style.display = "none";
    get("cardMenu").style.display = "none";
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
function tree(sect) {
  if (sect == 0) {
    get("presPmenu").style.display = "block";
    get("presPmenu").className = "menu split";
    get("treeMenu").className = "menu split";
  }
}
function treePrestige(sect) {
  if (sect == 0) {
    treePoints[0] += treeGain[0];
    bought[0] = 0;
    bought[1] = 0;
    shopCost[0] = 10;
    shopCost[1] = 1000;
    ramTotal = 2000000;
    ramTab = 50 * Math.floor(treePoints[0] ** 0.4);
    ramLeft = ramTotal;
    tabs = 0;
    tabsCollapse = 0;
    cardinals = 0;
    cardinalGain = 1 * Math.floor(treePoints[0] ** 0.4);
    meltPrice = 250;
    shopCost = [10, 1000, 1, 1, 1];
    bought = [0, 0, 0, 0, 0];
    autobuyer = false;
    get("cardAutoBuy").style.backgroundColor = "white";
    get("cardAutoBuy").innerHTML = `Autobuy tab-openers (25 cardinals)`;
    get("cardAutoTab").style.backgroundColor = "white";
    get("cardAutoTab").innerHTML = `Automatically open tabs (50 cardinals)`;
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
  get("presPmenu").className = "menu split";
  get("treeMenu").className = "menu";
  get(pageName).style.display = "block";
}