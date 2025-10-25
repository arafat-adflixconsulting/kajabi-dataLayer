// GTM Tag - cHTML - Set Checkout Data into localStorage

/* --- Get Main Value --- */
var mainElement = document.querySelector(
  "#new_checkout_offer > div > div > div:nth-child(2) > div.col-md-offset-1.col-md-5.checkout-content-left > div > div.panel-heading > h1"
);
var mainText = mainElement ? mainElement.innerText.trim() : "";
var mainValue;

// Handle "Free" main value
if (mainText.toLowerCase().includes("free")) {
  mainValue = 0.0;
} else {
  mainValue = parseFloat(mainText.replace("£", "").replace("GBP", ""));
}

/* --- Get Discount / Coupon Value --- */
var discountElement = document.querySelector(
  "#new_checkout_offer > div > div > div:nth-child(2) > div.col-md-offset-1.col-md-5.checkout-content-left > div > div:nth-child(2) > div > div.price-breakdown > table > tbody > tr.price-breakdown-total.due-now > td > span"
);

var couponValue = null;
if (discountElement) {
  var discountText = discountElement.innerText.trim();
  if (discountText.toLowerCase().includes("free")) {
    couponValue = 0.0;
  } else if (discountText.replace(/[^\d.]/g, "") !== "") {
    couponValue = parseFloat(discountText.replace("£", "").replace("GBP", ""));
  }
}

/* --- Use coupon value only if valid --- */
var value =
  couponValue !== null && !isNaN(couponValue) ? couponValue : mainValue;

/* --- Get Lead Data --- */
var nameElement = document.querySelector("#checkout_offer_member_name");
var fName = "",
  lName = "";
if (nameElement && nameElement.value.trim() !== "") {
  var nameParts = nameElement.value.trim().split(" ");
  fName = nameParts[0];
  lName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";
}

var emailElement = document.querySelector("#checkout_offer_member_email");
var email = emailElement ? emailElement.value : "";

var leadData = {
  first_name: fName,
  last_name: lName,
  email: email,
};

/* --- Get Item Name --- */
var itemNameElement = document.querySelector(
  "#new_checkout_offer > div > div > div:nth-child(2) > div.col-md-6 > div > h1"
);
var itemName = itemNameElement ? itemNameElement.innerText.trim() : "";

/* --- Store All Data in Local Storage --- */
window.localStorage.setItem("value", value);
window.localStorage.setItem("leadData", JSON.stringify(leadData));
window.localStorage.setItem("item_name", itemName);

/* --- Optional: Console Logs for Debugging --- */
console.log("Item Name:", itemName);
console.log("Value:", value);
console.log("Lead Data:", leadData);

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * */

// GTM Tag - cHTML - Get Stored Data from localStorage

// Retrieve stored values
var value = parseFloat(window.localStorage.getItem("value"));
var usersInfo = JSON.parse(window.localStorage.getItem("leadData"));
var itemName = window.localStorage.getItem("item_name");

// Prepare ecommerce items array
var items = [
  {
    item_name: itemName || "Unknown Item", // fallback if not found
    price: value,
    quantity: 1,
  },
];

// Push event to dataLayer
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: "newPurchase",
  ecommerce: {
    value: value,
    currency: "GBP",
    items: items,
  },
  email: usersInfo && usersInfo.email ? usersInfo.email : "",
  firstName: usersInfo && usersInfo.first_name ? usersInfo.first_name : "",
  lastName: usersInfo && usersInfo.last_name ? usersInfo.last_name : "",
});
