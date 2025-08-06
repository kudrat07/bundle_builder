const buttons = document.querySelectorAll('.card__item--btn');
const bundleItems = document.querySelectorAll('.bundle__item--wrapper');
const proceedBtn = document.querySelector('.proceed_btn'); // Proceed button
const discountText = document.querySelector(".discount__wrapper .discount:last-child");
const subtotalText = document.querySelector(".subtotal__wrapper .subtotal:last-child");
const proceed = document.querySelector(".proceed")

let currentBundleIndex = 0;
let selectedItems = [];

buttons.forEach(button => {
  button.addEventListener('click', () => {
    if (currentBundleIndex >= 3) return;

    const card = button.closest('.card');
    const imgSrc = card.querySelector('.card__item--img').src;
    const name = card.querySelector('.card__item--name').textContent;
    const priceText = card.querySelector('.card__item--price').textContent;
    const price = parseFloat(priceText.replace('$', ''));

    // Track selected items for pricing
    selectedItems.push(price);

    // Insert data into current bundle slot
    const currentBundle = bundleItems[currentBundleIndex];
    currentBundle.querySelector('.bundle__img').src = imgSrc;
    currentBundle.querySelector('.bundle__item--text').textContent = name;
    currentBundle.querySelector('.bundle__item--price').textContent = `$${price.toFixed(2)}`;

    // Show 30% discount on item
    let discountPerItem = price * 0.3;
    let discountEl = currentBundle.querySelector('.bundle__item--discount');
    if (discountEl) {
      discountEl.textContent = `30% Off: -$${discountPerItem.toFixed(2)}`;
    }

    // Make button and delete icon visible
    currentBundle.querySelector('.bundle__btn').style.visibility = "visible";
    currentBundle.querySelector('.delete').style.visibility = 'visible';

    // Change button text and style
    const spans = button.querySelectorAll('span');
    spans[0].textContent = 'Added';
    spans[1].textContent = '✓';
    button.style.backgroundColor = '#444444';
    button.style.border = "none";
    button.style.color = '#fff';
    button.disabled = true;

    currentBundleIndex++;

    updatePricing();
    updateProceedBtnState();
  });
});

// Pricing update function
function updatePricing() {
  const total = selectedItems.reduce((sum, price) => sum + price, 0);
  const discount = selectedItems.length === 3 ? total * 0.3 : 0;
  const subtotal = total - discount;

  discountText.textContent = `-$${discount.toFixed(2)}`;
  subtotalText.textContent = `$${subtotal.toFixed(2)}`;
}

// Proceed button styling
function updatePricing() {
  const total = selectedItems.reduce((sum, price) => sum + price, 0);
  const discount = total * 0.3; // 30% discount on every added item
  const subtotal = total - discount;

  discountText.textContent = `-$${discount.toFixed(2)}`;
  subtotalText.textContent = `$${subtotal.toFixed(2)}`;
}

// Proceed button styling
function updateProceedBtnState() {
  if (selectedItems.length === 3) {
    proceed.style.backgroundColor = "#000000";
    proceed.style.cursor = "pointer"
    proceedBtn.style.color = "#ffffff";
    proceedBtn.style.cursor="pointer"
  }
}


// Proceed button click reset
proceedBtn.addEventListener("click", () => {
  if (selectedItems.length === 3) {
    proceedBtn.style.backgroundColor = ''; // Reset color
    proceedBtn.style.color = '';
    proceedBtn.textContent = 'Added to Cart!';
  }
});












