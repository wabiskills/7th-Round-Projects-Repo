const display_Number = document.getElementById("display");

function appendToDisplay(value) {
  display_Number.value += value;
}

function clearDisplay() {
  display_Number.value = "";
}

function deleteLast() {
  display_Number.value = display_Number.value.slice(0, -1); // More robust
}

function calculate() {
  try {
    display_Number.value = eval(display_Number.value);
  } catch (e) {
    display_Number.value = "Error";
  }
}
