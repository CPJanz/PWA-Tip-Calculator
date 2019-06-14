// Creating variables for all of the DOM elements we need to interact with
const tipRangeInput = document.querySelector("#tip-input");
const tipRangeDisplay = document.querySelector("#tip-input-value");
const subtotalInput = document.querySelector("#subtotal-input");
const tipDisplay = document.querySelector("#tip-amount");
const tipText = document.querySelector("#tip-div");
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
  tipRangeDisplay.value = e.target.value;
  calculateTip();
});

tipRangeDisplay.addEventListener("change", e => {
  if (e.target.value > 60) {
    e.target.value = 60;
  }
  if (e.target.value <= 0) {
    e.target.value = 0;
  }
  tipRangeInput.value = e.target.value;
  calculateTip();
});

subtotalInput.addEventListener("change", e => {
  calculateTip();
});

payerCount.addEventListener("change", e => {
  // Error handling for number of payers input (must be a whole positive number) and corrects bad input.
  e.target.value = Math.floor(e.target.value);
  if (e.target.value < 1) {
    e.target.value = 1;
  }
  calculateTip();
  // Shows text specifiying that the tip is per person if the payers > 1.
  perPersonText.style.display = e.target.value > 1 ? "inline" : "none";
});

// Helper function that calculates and formats the tip and then displays it on the screen.
function calculateTip() {
  let tip =
    (tipRangeInput.value * subtotalInput.value) / (100 * payerCount.value);
  let centDisplay = 2;
  let displaySize = "4rem";
  if (payerCount.value === "1") {
    if (tip >= 1000) {
      tip = Math.ceil(tip);
      centDisplay = 0;
    }
    if (tip >= 100000) {
      displaySize = "3rem";
    }
  } else {
    if (tip >= 10) {
      displaySize = "3rem";
    }
    if (tip >= 1000) {
      tip = Math.ceil(tip);
      centDisplay = 0;
    }
  }

  tipText.style.fontSize = displaySize;
  tipDisplay.innerHTML = tip.toLocaleString("en-US", {
    minimumFractionDigits: centDisplay,
    maximumFractionDigits: centDisplay
  });
}
