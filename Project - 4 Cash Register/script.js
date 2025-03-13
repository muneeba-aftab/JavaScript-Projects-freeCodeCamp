let price = 1.87;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100]
];
let cashValues = [
  ["ONE HUNDRED", 100],
  ["TWENTY", 20],
  ["TEN", 10],
  ["FIVE", 5],
  ["ONE", 1],
  ["QUARTER", 0.25],
  ["DIME", 0.1],
  ["NICKEL", 0.05],
  ["PENNY", 0.01]
];

const cashInput = document.getElementById("cash");
const purchaseBtn = document.getElementById("purchase-btn");
const priceDisplay = document.querySelector("#price-display span");
const statusText = document.getElementById("change-due");
const changeSpans = document.querySelectorAll("#change-in-drawer span");

priceDisplay.textContent = "$" + price;

const updateChangeInDrawer = () => {
  for (let i = 0; i < changeSpans.length; i++) {
    changeSpans[i].textContent = "$" + cid[i][1];
  }
};

updateChangeInDrawer();

const showResults = (state, changeArr) => {
  statusText.textContent = "Status: " + state;
  changeArr.forEach((element) => {
    statusText.textContent += " " + element[0] + ": $" + element[1];
  });
};

const calculateChange = (paid, total) => {
  let changeNeeded = parseFloat((paid - total).toFixed(2));
  let change = [];
  let totalCID = parseFloat(cid.reduce((sum, money) => sum + money[1], 0).toFixed(2));
  let reversecid = cid.slice().reverse();

  if (totalCID < changeNeeded) {
    statusText.textContent = "Status: INSUFFICIENT_FUNDS";
    return;
  } else if (totalCID === changeNeeded) {
    statusText.textContent = "Status: CLOSED";
    cid.forEach(money => {
      if (money[1] > 0) {
        change.push([money[0], money[1]]);
      }
    });
    return showResults('CLOSED', change);
  } else {
    for (let i = 0; i < reversecid.length; i++) {
      let currencyName = reversecid[i][0];
      let currencyValue = cashValues.find(val => val[0] === currencyName)[1];
      let currencyAmount = reversecid[i][1];
      let currencyCount = 0;

      while (changeNeeded >= currencyValue && currencyAmount >= currencyValue) {
        changeNeeded = parseFloat((changeNeeded - currencyValue).toFixed(2));
        currencyAmount = parseFloat((currencyAmount - currencyValue).toFixed(2));
        currencyCount += currencyValue;
      }

      if (currencyCount > 0) {
        change.push([currencyName, currencyCount]);
        reversecid[i][1] = currencyAmount;
      }
    }

    if (changeNeeded > 0) {
      statusText.textContent = "Status: INSUFFICIENT_FUNDS";
      return;
    } else {
      statusText.textContent = "Status: OPEN";
      showResults('OPEN', change);
      return change;
    }
  }
};

purchaseBtn.addEventListener("click", () => {
  if (cashInput.value < price) {
    alert("Customer does not have enough money to purchase the item");
  } else if (cashInput.value == price) {
    statusText.textContent = "No change due - customer paid with exact cash";
  } else {
    calculateChange(cashInput.value, price);
    updateChangeInDrawer();
  }
});

cashInput.addEventListener("keydown", e => {
  if (e.key === 'Enter') {
    if (cashInput.value < price) {
      alert("Customer does not have enough money to purchase the item");
    } else if (cashInput.value == price) {
      statusText.textContent = "No change due - customer paid with exact cash";
    } else {
      calculateChange(cashInput.value, price);
      updateChangeInDrawer();
    }
  }
});
