export let cart = JSON.parse(localStorage.getItem("cart"));

export function calculateCartQuantity() {
  const cartQuantity = cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
  return cartQuantity;
}

if (!cart) {
  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
    },
  ];
}

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`
  );

  let itemQuantity = Number(quantitySelector.value);

  if (matchingItem) {
    matchingItem.quantity += itemQuantity;
  } else {
    cart.push({
      productId: productId,
      quantity: itemQuantity,
    });
  }
  saveToStorage();
}

export function removeFromCart(productToDeleteId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId !== productToDeleteId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();
  // updateCartQuantity();
}
