var mainElement = document.querySelector(
  "#new_checkout_offer > div > div > div:nth-child(2) > div.col-md-offset-1.col-md-5.checkout-content-left > div > div.panel-heading > h1"
);
var mainText = mainElement ? mainElement.innerText.trim() : "";
var mainValue;

// --- Handle "Free" main value ---
if (mainText.toLowerCase().includes("free")) {
  mainValue = 0.0;
} else {
  mainValue = parseFloat(mainText.replace("£", "").replace("GBP", ""));
}

var discountElement = document.querySelector(
  "#new_checkout_offer > div > div > div:nth-child(2) > div.col-md-offset-1.col-md-5.checkout-content-left > div > div:nth-child(2) > div > div.price-breakdown > table > tbody > tr.price-breakdown-total.due-now > td > span"
);

var couponValue = null;
if (discountElement) {
  var discountText = discountElement.innerText.trim();

  // --- Handle "Free" coupon value ---
  if (discountText.toLowerCase().includes("free")) {
    couponValue = 0.0;
  } else if (discountText.replace(/[^\d.]/g, "") !== "") {
    couponValue = parseFloat(discountText.replace("£", "").replace("GBP", ""));
  }
}

// --- Use coupon value only if it's a valid number (not null or NaN) ---
var value =
  couponValue !== null && !isNaN(couponValue) ? couponValue : mainValue;

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

window.localStorage.setItem("value", value);
window.localStorage.setItem("leadData", JSON.stringify(leadData));
