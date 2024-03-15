let meals = [
  {
    pizza: "Pizza Magherita",
    desc: "Pizza mit Tomatensauce und Käse",
    price: 10.0,
    bool: false,
    anzahl: 0,
  },
  {
    pizza: "Pizza Salami",
    desc: "Pizza mit Salami",
    price: 11.0,
    bool: false,
    anzahl: 0,
  },
  {
    pizza: "Pizza Tonno",
    desc: "Pizza mit Zwiebeln und Thunfisch",
    price: 11.0,
    bool: false,
    anzahl: 0,
  },
  {
    pizza: "Pizza Diavolo",
    desc: "Pizza mit scharfer Salami",
    price: 12.0,
    bool: false,
    anzahl: 0,
  },
];
let deliverStatus = true;
let basket = [];
let amounts = [];
let prices = [];
let basketStatus;

function renderMeals() {
  let content = document.getElementById("content");
  content.innerHTML = "";
  for (let i = 0; i < meals.length; i++) {
    const meal = meals[i];
    content.innerHTML += `
    ${generateMeals(meal, i)}
    `;
  }
}

function generateMeals(meal, i) {
  return /*html*/ `
  <div class="meals">
      <div>
        <h3>${meal["pizza"]}</h3>
        <div class="meal">
          <h4>${meal["desc"]}</h4>
        </div>
        <h3>${meal["price"].toFixed(2)} €</h3>
      </div>
      <div>
        <img onclick="addMeal(${i})" src="img/plus.png" alt="" />
      </div>
    </div>
  `;
}

function addMeal(i) {
  let meal = meals[i];
  let index = basket.indexOf(meal.pizza);
  if (index === -1) {
    basket.push(meal.pizza);
    prices.push(meal.price);
    amounts.push(1);
  } else {
    amounts[i]++;
  }
  renderBasket();
  updateBasketButton(calculateTotalSum());
}

function removeMeal(i) {
  if (amounts[i] >= 1) {
    amounts[i]--;
  }
  if (amounts[i] === 0) {
    basket.splice(i, 1);
    prices.splice(i, 1);
    amounts.splice(i, 1);
  }
  renderBasket();
  renderTotalPrice();
  updateBasketButton(calculateTotalSum());
}

function renderBasket() {
  let content = document.getElementById("orderedMeals");
  content.innerHTML = "";
  for (let i = 0; i < basket.length; i++) {
    let item = basket[i];
    let price = prices[i];
    let amount = amounts[i];
    content.innerHTML += /*HTML*/ `
      ${generateBasket(i, amount, item, price)}
     `;
  }
  renderTotalPrice();
}

function generateBasket(i, amount, item, price) {
  return /*HTML*/ `<div class="ordered-meal">
  <h4>${item} ${(price * amount).toFixed(2).replace(".", ",")} €</h4>
   <div class="number-container">
     <img src="img/minus2.png" alt="" onclick="removeMeal(${i})">
     <h4>${amount}</h4>
     <img src="img/plus2.png" alt="" onclick="addMeal(${i})">
   </div>
  </div>
  `;
}

function renderTotalPrice() {
  let content = document.getElementById("priceContainer");
  content.innerHTML = "";
  let sum = 0;
  let deliverCost = 1;
  let totalSum = 0;
  for (let i = 0; i < prices.length; i++) {
    let price = prices[i];
    let amount = amounts[i];
    sum += price * amount;
    totalSum = sum + deliverCost;
    if (deliverStatus) {
      totalSum = sum + deliverCost;
    } else {
      totalSum = sum;
      deliverCost = 0;
    }
  }
  generateTotalorEmptyBasket(sum,totalSum,deliverCost, content);
}

function generateTotalorEmptyBasket (sum,totalSum,deliverCost, content) {
  if (basket.length >= 1) {
    content.innerHTML += /*HTML*/ `
  ${generateTotalPrice(sum, totalSum, deliverCost)}`;
  } else {
    content.innerHTML += `${generateEmptyBasket()}`;
  }
}

function generateEmptyBasket() {
  return /*HTML*/ `
    <div class="emptyBasket">
      <img src="img/einkauf.png" alt="">
      <h3>Ihr Warenkorb ist leer</h3>
    </div>
  `;
}

function generateTotalPrice(sum, totalSum, deliverCost) {
  return /*HTML*/ `
<div class="price">
              <div>
              Zwischensumme <br>
              Lieferkosten <br>
              <b>Gesamt</b>
            </div>
            <div>
            ${sum.toFixed(2).replace(".", ",")} €<br>
               ${deliverCost.toFixed(2).replace(".", ",")} €<br>
              <b>${totalSum.toFixed(2).replace(".", ",")} €</b>
            </div>
          </div>
          <div class="pay-btn">
            <button onclick="clearBasket()">Bezahlen</button>
          </div>`;
}

function clearBasket() {
  let content = document.getElementById("orderedMeals");
  let content2 = document.getElementById("priceContainer");
  content.innerHTML = "";
  content2.innerHTML = "";
  basket = [];
  amounts = [];
  prices = [];
  content.innerHTML += /*HTML*/ `
  <div class="emptyBasket">
      <img src="img/einkauf.png" alt="">
      <h3>Vielen Dank für Ihre Bestellung!</h3>
    </div>`;
  updateBasketButton(0);
}

function takeAway() {
  deliverStatus = false;
  let takeAway = document.getElementById("takeAway");
  let deliver = document.getElementById("deliver");
  takeAway.classList.add("style-deliver-take-away-container");
  deliver.classList.remove("style-deliver-take-away-container");
  renderTotalPrice();
  updateBasketButton(calculateTotalSum());
}

function deliver() {
  let takeAway = document.getElementById("takeAway");
  let deliver = document.getElementById("deliver");
  takeAway.classList.remove("style-deliver-take-away-container");
  deliver.classList.add("style-deliver-take-away-container");
  deliverStatus = true;
  renderTotalPrice();
  updateBasketButton(calculateTotalSum());
}

window.addEventListener("resize", showBasketBtn);

function showBasketBtn() {
  let screenSize = window.innerWidth;
  let basket = document.getElementById("basket");
  let leftContainer2 = document.getElementById("leftContainer2");
  let closeBasketImg = document.getElementById("closeBasketImg");
  let basketBtn = document.getElementById("basketBtn");

  if (screenSize <= 860) {
    showResponsiveBasket(basket, basketBtn, closeBasketImg);
  } else {
    hideResponsiveBasket(basket, leftContainer2, closeBasketImg, basketBtn);
  }
}

function showResponsiveBasket(basket, basketBtn, closeBasketImg) {
  basket.classList.add("styleResponsiveBasket");
  if (basketStatus && screenSize <= 860) {
    basket.classList.remove("d-none");
  } else {
    basket.classList.add("d-none");
  }
  basket.classList.remove("boxStyle");
  closeBasketImg.classList.remove("d-none");
  basketBtn.classList.remove("d-none");
}

function hideResponsiveBasket(basket, leftContainer2, closeBasketImg, basketBtn) {
  basket.classList.remove("styleResponsiveBasket", "d-none");
  basket.classList.add("boxStyle");
  leftContainer2.classList.remove("d-none");
  closeBasketImg.classList.add("d-none");
  basketBtn.classList.add("d-none");
  basketStatus = false;
}

function openBasket() {
  let leftContainer2 = document.getElementById("leftContainer2");
  let basket = document.getElementById("basket");
  leftContainer2.classList.add("d-none");
  basket.classList.remove("d-none");
  basketStatus = true;
}

function closeBasket() {
  let leftContainer2 = document.getElementById("leftContainer2");
  let basket = document.getElementById("basket");
  leftContainer2.classList.remove("d-none");
  basket.classList.add("d-none");
  basketStatus = false;
  updateBasketButton(calculateTotalSum());
}
function updateBasketButton(totalSum) {
  let basketBtn = document.getElementById("basketBtn");
  basketBtn.innerText = `Warenkorb ${totalSum.toFixed(2).replace(".", ",")} €`;
}
function calculateTotalSum() {
  let sum = 0;
  let deliverCost = deliverStatus ? 1 : 0;

  for (let i = 0; i < prices.length; i++) {
    let price = prices[i];
    let amount = amounts[i];
    sum += price * amount;
  }

  return sum + deliverCost;
}
