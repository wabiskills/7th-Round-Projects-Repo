const STORAGE_KEY = "calculation";

let calculation = localStorage.getItem(STORAGE_KEY) || "";

function displayCalculation() {
  const el = document.querySelector(".js-calculation");
  if (!el) return;
  el.innerHTML = calculation;
}

function updateCalculation(value) {
  calculation += value;
  localStorage.setItem(STORAGE_KEY, calculation);
  displayCalculation();
}

function clearCalculation() {
  calculation = "";
  localStorage.setItem(STORAGE_KEY, calculation);
  displayCalculation();
}

function evaluateCalculation() {
  // Note: eval() takes a string and runs it as code.
  // Avoid using eval() in real world projects since
  // it can potentially be given harmful code to run.
  // Only use eval() for learning purposes.
  calculation = String(eval(calculation));
  localStorage.setItem(STORAGE_KEY, calculation);
  displayCalculation();
}

document.addEventListener("click", (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const action = btn.dataset.action;
  const value = btn.dataset.value;

  if (action === "equals") {
    evaluateCalculation();
    return;
  }

  if (action === "clear") {
    clearCalculation();
    return;
  }

  if (typeof value === "string") {
    updateCalculation(value);
  }
});

displayCalculation();
