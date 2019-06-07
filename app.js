const tipRangeInput = document.querySelector("#tip-input");
const tipRangeIndicator = document.querySelector("#tip-input-value");
const subtotalInput = document.querySelector("#subtotal-input");
const tipDisplay = document.querySelector("#tip-amount");
const payerCount = document.querySelector("#payer-input");
const perPersonText = document.querySelector("#per-person-text");

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

let deferredPrompt;

window.addEventListener("beforeinstallprompt", e => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  console.log("prompt triggered!");
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
  if (e.target.value < 1) {
    e.target.value = 1;
    console.log(
      "TODO:number of people must be greater than 0. Add user facing error state."
    );
  }
  tipDisplay.innerHTML = calculateTip();
  perPersonText.style.display = e.target.value > 1 ? "inline" : "none";
});

function calculateTip() {
  return (
    (tipRangeInput.value * subtotalInput.value) /
    (100 * payerCount.value)
  ).toFixed(2);
}
