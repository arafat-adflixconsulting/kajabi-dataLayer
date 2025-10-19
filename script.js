// Attempt to get the original price element
var valueElement = document.querySelector(
  "div.col-md-offset-1.col-md-5.checkout-content-left > div > div.panel-heading > h1"
);
var couponValueElement = document.querySelector(
  "div.price-breakdown > table > tbody > tr.price-breakdown-total.due-now > td > span"
);

// Determine which price to store (discounted price if coupon is applied, otherwise original price)
var value;
if (couponValueElement) {
  value = parseFloat(
    couponValueElement.innerText
      .replace("$", "")
      .replace(" USD", "")
      .replace(",", "")
  );
} else if (valueElement) {
  value = parseFloat(
    valueElement.innerText.replace("$", "").replace(" USD", "").replace(",", "")
  );
}

// Other details
var product_name = document.querySelector(
  "#new_checkout_offer > div > div > div:nth-child(2) > div.col-md-6 > div > h1"
).innerText;
var email = document.querySelector("#checkout_offer_member_email").value;
var city = document.querySelector(
  "#checkout_offer_extra_contact_information_address_city"
).value;
var country = document.querySelector("#input-address-country").value;
var phone = document.querySelector(
  "#checkout_offer_extra_contact_information_phone_number"
).value;
var zip = document.querySelector(
  "#checkout_offer_extra_contact_information_address_zip"
).value;

// Define items array
var items = [
  {
    item_name: product_name,
    price: value,
    quantity: 1,
  },
];

// Store data in localStorage
window.localStorage.setItem("value", value);
window.localStorage.setItem("item", JSON.stringify(items));
window.localStorage.setItem("email", email);
window.localStorage.setItem("city", city);
window.localStorage.setItem("country", country);
window.localStorage.setItem("phone", phone);
window.localStorage.setItem("zip", zip);
