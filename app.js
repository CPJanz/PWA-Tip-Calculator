const tipRangeInput = document.querySelector("#tip-input");
const tipRangeIndicator = document.querySelector("#tip-input-value");
const subtotalInput = document.querySelector("#subtotal-input");
const tipDisplay = document.querySelector("#tip-amount");
const payerCount = document.querySelector("#payer-input");

window.addEventListener("load", e => {
  tipRangeIndicator.innerHTML = tipRangeInput.value;
  tipDisplay.innerHTML = calculateTip();

  if ("serviceWorker" in navigator) {
    try {
      navigator.serviceWorker.register("sw.js");
      console.log("Service Worker registered");
    } catch (error) {
      console.log("Service Worker registration error");
    }
  }
});

tipRangeInput.addEventListener("input", e => {
  tipRangeIndicator.innerHTML = e.target.value;
  tipDisplay.innerHTML = calculateTip();
});

subtotalInput.addEventListener("change", e => {
  tipDisplay.innerHTML = calculateTip();
});

payerCount.addEventListener("change", e => {
  e.target.value = Math.floor(e.target.value);
  if (e.target.value > 0) {
    tipDisplay.innerHTML = calculateTip();
  } else {
    e.target.value = 1;
    console.log(
      "TODO:number of people must be greater than 0. Add user facing error state."
    );
  }
});

function calculateTip() {
  return (
    (tipRangeInput.value * subtotalInput.value) /
    (100 * payerCount.value)
  ).toFixed(2);
}
