// Creating variables for all of the DOM elements we need to interact with
const tipRangeInput = document.querySelector("#tip-input");
const tipRangeDisplay = document.querySelector("#tip-input-value");
const subtotalInput = document.querySelector("#subtotal-input");
const tipDisplay = document.querySelector("#tip-amount");
const payerCount = document.querySelector("#payer-input");
const perPersonText = document.querySelector("#per-person-text");

// Create an event listener on the window finishing loading. Registers the PWA serviceWorker.
window.addEventListener("load", e => {
  if ("serviceWorker" in navigator) {
    try {
      navigator.serviceWorker.register("sw.js");
      console.log("Service Worker registered");
    } catch (error) {
      console.log("Service Worker registration error");
    }
  }
});

// Event listners for UI input interactions and updates the dipslays.
tipRangeInput.addEventListener("input", e => {
  tipRangeDisplay.innerHTML = e.target.value;
});

tipRangeInput.addEventListener("change", e => {
  tipDisplay.innerHTML = calculateTip();
});

subtotalInput.addEventListener("change", e => {
  tipDisplay.innerHTML = calculateTip();
});

payerCount.addEventListener("change", e => {
  // Error handling for number of payers input (must be a whole positive number) and corrects bad input.
  e.target.value = Math.floor(e.target.value);
  if (e.target.value < 1) {
    e.target.value = 1;
  }
  tipDisplay.innerHTML = calculateTip();
  // Shows text specifiying that the tip is per person if the payers > 1.
  perPersonText.style.display = e.target.value > 1 ? "inline" : "none";
});

// Helper function to calculate the tip. Returns the formatted dollar amount.
function calculateTip() {
  return (
    (tipRangeInput.value * subtotalInput.value) /
    (100 * payerCount.value)
  ).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
