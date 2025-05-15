const cart = {};

function addToCart(item) {
  if (cart[item]) {
    cart[item]++;
  } else {
    cart[item] = 1;
  }
  updateCartDisplay();
}

function removeFromCart(item) {
  if (cart[item]) {
    cart[item]--;
    if (cart[item] <= 0) delete cart[item];
    updateCartDisplay();
  }
}

function updateCartDisplay() {
  const cartList = document.getElementById("cartList");
  cartList.innerHTML = "";

  for (const item in cart) {
    const li = document.createElement("li");
    li.textContent = `${item} x${cart[item]}`;
    
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "−";
    removeBtn.onclick = () => removeFromCart(item);
    
    li.appendChild(removeBtn);
    cartList.appendChild(li);
  }

  const summary = Object.entries(cart)
    .map(([item, qty]) => `- ${item}: ${qty}`)
    .join("\n");

  document.getElementById("orderSummary").value = summary;
}

document.getElementById("checkoutForm").addEventListener("submit", function(e) {
  if (Object.keys(cart).length === 0) {
    e.preventDefault();
    alert("Your cart is empty!");
  }
});
