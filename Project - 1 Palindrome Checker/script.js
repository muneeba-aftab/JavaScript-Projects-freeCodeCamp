document.getElementById("check-btn").addEventListener("click", function () {
    const inputField = document.getElementById("text-input");
    const resultElement = document.getElementById("result");
    const inputValue = inputField.value.trim();

    if (inputValue === "") {
        alert("Please input a value.");
        return;
    }

    // Preserve original input for result message
    const originalText = inputValue;

    // Normalize input: remove non-alphanumeric characters and convert to lowercase
    const cleanedInput = inputValue.toLowerCase().replace(/[^a-z0-9]/g, "");
    const reversedInput = cleanedInput.split("").reverse().join("");

    if (cleanedInput === reversedInput) {
        resultElement.textContent = `${originalText} is a palindrome.`;
    } else {
        resultElement.textContent = `${originalText} is not a palindrome.`;
    }
});
