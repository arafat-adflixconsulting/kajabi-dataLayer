var mainValue = parseFloat(
  document
    .querySelector(
      "#new_checkout_offer > div > div > div:nth-child(2) > div.col-md-offset-1.col-md-5.checkout-content-left > div > div.panel-heading > h1"
    )
    .innerText.replace("£", "")
    .replace("GBP", "")
);

var couponValue = parseFloat(
  document
    .querySelector(
      "#new_checkout_offer > div > div > div:nth-child(2) > div.col-md-offset-1.col-md-5.checkout-content-left > div > div:nth-child(2) > div > div.price-breakdown > table > tbody > tr.price-breakdown-total.due-now > td > span"
    )
    .innerText.replace("£", "")
    .replace("GBP", "")
);

var email = document.querySelector("#checkout_offer_member_email").value;

var fullName = document.querySelector("#checkout_offer_member_name").value;
var nameArray = fullName.split(" ");
var fstName = nameArray[0];
var lstName = nameArray[1];

var leadData = {
  first_name: fstName,
  last_name: lstName,
};

var value;
if (couponValue) {
  var value = couponValue;
} else {
  var value = mainValue;
}

window.localStorage.setItem("value", "value");
window.localStorage.setItem("leadData", JSON.stringify(leadData));

console.log("Checkout data stored in local storage");
