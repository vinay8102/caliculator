document.addEventListener("DOMContentLoaded", () => {
    const display = document.getElementById("display");
    const buttons = document.querySelectorAll(".btn");
    let currentInput = "";
    let previousInput = "";
    let operation = null;

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const value = button.textContent;

            if (button.classList.contains("operator")) {
                if (value === '%') {
                    handlePercentage();
                } else {
                    handleOperator(value);
                }
            } else if (button.classList.contains("equals")) {
                handleEquals();
            } else if (button.id === "clear") {
                clear();
            } else {
                handleNumber(value);
            }

            updateDisplay();
        });
    });

    function handleNumber(value) {
        if (currentInput.length >= 12) return; // Limit the input length
        if (currentInput === "0" && value === "0") return;
        if (currentInput === "0" && value !== ".") {
            currentInput = value;
        } else {
            currentInput += value;
        }
    }

    function handleOperator(value) {
        if (currentInput === "" && value === "-") {
            currentInput = "-";
            return;
        }
        if (previousInput !== "") {
            handleEquals();
        }
        operation = value;
        previousInput = currentInput;
        currentInput = "";
    }

    function handleEquals() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operation) {
            case "+":
                result = prev + current;
                break;
            case "-":
                result = prev - current;
                break;
            case "*":
                result = prev * current;
                break;
            case "/":
                result = prev / current;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operation = null;
        previousInput = "";
    }

    function handlePercentage() {
        if (currentInput === "") return;
        currentInput = (parseFloat(currentInput) / 100).toString();
    }

    function clear() {
        currentInput = "";
        previousInput = "";
        operation = null;
    }

    function updateDisplay() {
        display.textContent = currentInput === "" ? "0" : currentInput;
    }

    updateDisplay();
});
