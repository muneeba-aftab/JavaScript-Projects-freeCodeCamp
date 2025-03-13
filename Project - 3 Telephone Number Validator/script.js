document.getElementById("check-btn").addEventListener("click", function () {
    let phoneNumber = document.getElementById("user-input").value.trim();
    let resultDiv = document.getElementById("results-div");

    if (phoneNumber === "") {
        alert("Please provide a phone number");
        return;
    }

    if (validateUSPhoneNumber(phoneNumber)) {
        resultDiv.textContent = "Valid US number: " + phoneNumber;
        resultDiv.style.color = "green";
    } else {
        resultDiv.textContent = "Invalid US number: " + phoneNumber;
        resultDiv.style.color = "red";
    }
});

document.getElementById("clear-btn").addEventListener("click", function () {
    document.getElementById("user-input").value = "";
    document.getElementById("results-div").textContent = "";
});

function validateUSPhoneNumber(number) {
    let regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
    return regex.test(number);
}
