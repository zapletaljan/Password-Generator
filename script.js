const passwordLengthInput = document.getElementById("password-length-input")
const allowUppercaseCheckbox = document.getElementById("allow-uppercase-checkbox")
const allowLowercaseCheckbox = document.getElementById("allow-lowercase-checkbox")
const allowSymbolsCheckbox = document.getElementById("allow-symbols-checkbox")
const allowLookalikeCheckbox = document.getElementById("allow-lookalike-checkbox")
const allowNumbersCheckbox = document.getElementById("allow-numbers-checkbox")
const passwordOutput = document.getElementById("password")
const generateButton = document.getElementById("generate-btn")
const passwordContainer = document.getElementById("password-container")
const copyInfo = document.getElementById("copy-p")
const lengthError = document.getElementById("card-length-error")
const otherError = document.getElementById("card-other-error")
const errorPLength = document.getElementById("error-text-length")
const errorPCheckbox = document.getElementById("error-text-checkbox")

const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>/?";
const lookalike = /[iIlLoO01!|.,]/g;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function AnimationStart() {
    generateButton.disabled = true;
    let length = Number(passwordLengthInput.value);
    let text = ""
    for (let j = 0; j < length; j++) {
        text += "*"
        passwordOutput.style.fontSize = "24px";
        passwordOutput.innerHTML = text
        await sleep(30);
    }
    GeneratePassword()
}

function GeneratePassword() {
    let length = Number(passwordLengthInput.value);
    let error = false
    if (7 < length && length < 65) {
        lengthError.classList.remove("card-length-error-yes")
        lengthError.classList.add("card-length-error-no")
        errorPLength.classList.remove("error-text-yes")
        errorPLength.classList.add("error-text-length")
    } else {
        lengthError.classList.remove("card-length-error-no")
        lengthError.classList.add("card-length-error-yes")
        errorPLength.classList.remove("error-text-length")
        errorPLength.classList.add("error-text-yes")
        error = true
    }

    let randomPool = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>/?"
    let filter = ""
    let unCheckedCount = 0
    if (!allowUppercaseCheckbox.checked) {
        filter += uppercase
        unCheckedCount += 1
    }
    if (!allowLowercaseCheckbox.checked) {
        filter += lowercase
        unCheckedCount += 1
    }
    if (!allowSymbolsCheckbox.checked) {
        filter += symbols
        unCheckedCount += 1
    }
    if (!allowNumbersCheckbox.checked) {
        filter += numbers
        unCheckedCount += 1
    }
    if (!allowLookalikeCheckbox.checked) {
        filter += lookalike
    }
    if (unCheckedCount == 4) {
        otherError.classList.remove("card-other-error-no")
        otherError.classList.add("card-other-error-yes")
        errorPCheckbox.classList.remove("error-text-checkbox")
        errorPCheckbox.classList.add("error-text-yes")
        error = true
    }
    if (unCheckedCount < 4) {
        otherError.classList.remove("card-other-error-yes")
        errorPCheckbox.classList.remove("error-text-yes")
        errorPCheckbox.classList.add("error-text-checkbox")
        otherError.classList.add("card-other-error-no")
    }

    randomPool = randomPool.split("").filter(char => !filter.includes(char)).join("");
    let finalPassword = ""
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * randomPool.length);
        finalPassword += randomPool[randomIndex]
    }

    passwordOutput.innerHTML = finalPassword
    passwordOutput.style.color = "#fff";
    passwordOutput.style.fontSize = "18px";
    generateButton.disabled = false;
    if (error) {
        passwordOutput.innerHTML = "Error, try again!"
    }


}

async function CopyText() {
    let textToCopy = passwordOutput.innerHTML;
    try {
        await navigator.clipboard.writeText(textToCopy);

        passwordContainer.classList.remove("password-container");
        passwordOutput.style.color = "#5FD25F";
        passwordContainer.classList.add("copied");
        copyInfo.style.color = "#5FD25F";
        copyInfo.innerHTML = "Copied!"
        await sleep(1000);
        passwordContainer.classList.remove("copied");
        passwordContainer.classList.add("password-container");
        passwordOutput.classList.add("password");
        passwordOutput.style.color = "#FFF";
        copyInfo.style.color = "transparent";
        await sleep(250)
        copyInfo.innerHTML = "Click to copy"
        


    } catch (err) {
        console.error("Failed to copy!", err)
    }
}



