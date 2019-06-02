const tipRangeInput = document.querySelector("#tip-input");
const tipRangeIndicator = document.querySelector("#tip-input-value");
const subtotalInput = document.querySelector("#subtotal-input");
const tipDisplay = document.querySelector("#tip-amount");

window.addEventListener("load", e => {
  tipRangeIndicator.innerHTML = tipRangeInput.value;
  tipDisplay.innerHTML = calculateTip();
});

tipRangeInput.addEventListener("input", e => {
  tipRangeIndicator.innerHTML = e.target.value;
  tipDisplay.innerHTML = calculateTip();
});

subtotalInput.addEventListener("change", e => {
  tipDisplay.innerHTML = calculateTip();
});

function calculateTip() {
  return ((tipRangeInput.value * subtotalInput.value) / 100).toFixed(2);
}
