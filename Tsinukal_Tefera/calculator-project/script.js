const resultEle = document.querySelector('.result');

let opCollection = '';

function displayResult(result) {
        resultEle.innerHTML = result;
}

document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (event) => {
        const eventVal = event.target.textContent;
        let result = '';
        if(eventVal === '=') {
            result = eval(opCollection);
            opCollection = '';
            displayResult(result);
        } else if(eventVal === 'C') {
            opCollection = '';
            displayResult(opCollection);
        } else {
            opCollection += eventVal;
            displayResult(opCollection);
        }
    });
});