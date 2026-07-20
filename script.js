const passwordLengthInput = document.getElementById("password-length-input")
const allowUppercaseCheckbox = document.getElementById("allow-uppercase-checkbox")
const allowLowercaseCheckbox = document.getElementById("allow-lowercase-checkbox")
const allowSymbolsCheckbox = document.getElementById("allow-symbols-checkbox")
const allowLookalikeCheckbox = document.getElementById("allow-lookalike-checkbox")

const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>/?";
const lookalike = /[iIlLoO01!|.,]/g;