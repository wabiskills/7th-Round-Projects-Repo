# Calculator Project

This is a simple web-based calculator built with HTML, CSS, and JavaScript.  
It lets users perform basic arithmetic operations in a clean button-based interface.

## Project Description

The calculator supports:
- Numbers (`0-9`)
- Decimal input (`.`)
- Arithmetic operators (`+`, `-`, `*`, `/`)
- `=` to calculate the result
- `Clear` to reset the current expression

The current calculation is saved in the browser using `localStorage`, so the expression remains visible after refreshing the page.

## How It Works

- `index.html` defines the calculator layout and buttons.
- `style.css` styles the calculator with dark and orange theme buttons.
- `script.js` handles all button clicks with event delegation.
- Each button adds values to a `calculation` string.
- Pressing `=` evaluates the string expression and shows the result.
- Pressing `Clear` empties the expression.
- The value is stored under the key `calculation` in `localStorage`.

## How to Run

1. Open the `calculator` project folder.
2. Double-click `index.html` to open it in your browser.

Optional (recommended for development):
1. Open the folder in VS Code or Cursor.
2. Start a local server (for example with Live Server extension).
3. Open the served URL in your browser.

## Tech Stack

- HTML
- CSS
- JavaScript (Vanilla JS)
