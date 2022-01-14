// code for generating random lowercase
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
// code for generating random uppercase
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
// code for generating random number
function getRandomNumber() {
    return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}
//code for generating random symbols
function getRandomSymbol() {
    const symbols = "!@#$%^&*(){}[]=<>/,.";
    return symbols[Math.floor(Math.random() * symbols.length)];
}

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
};
//Event Listener to the generate button
const generate = document.getElementById("generateBtn");
generate.addEventListener("click", () => {
    const length = document.getElementById("PasswordLength").value;
    const hasUpper = document.getElementById("UpperCase").checked;
    const hasLower = document.getElementById("LowerCase").checked;
    const hasNumber = document.getElementById("numbers").checked;
    const hasSymbol = document.getElementById("symbols").checked;
    const result = document.getElementById("PasswordResult");
    result.innerText = generatePassword(
        hasLower,
        hasUpper,
        hasNumber,
        hasSymbol,
        length
    );
    result.style.border= "2px solid green";
});

//password Generation function
function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = "";
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
        (item) => Object.values(item)[0]
    );
    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach((type) => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }
    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
};
//Copy function
let button = document.getElementById("clipboardBtn");
let copyText = document.getElementById("PasswordResult");
button.addEventListener("click", (e) => {
    e.preventDefault();
    copyText.select();
    document.execCommand("copy");

   navigator.clipboard.writeText(copyText.value);
   window.alert("Copied the text: " + copyText.value);
});    



//Checking password length
function checkLen(){
    var passLen = document.getElementById("PasswordLength").value;
    var text = document.getElementById("numberHelp");
    var btnGen = document.getElementById("generateBtn");
    if(passLen == "" || (passLen >= 4 && passLen <= 20)){
        text.innerText= "";
        btnGen.removeAttribute("disabled");
    }else if(passLen < 4){
        text.innerText= "4 is the minimum";
        btnGen.setAttribute("disabled", "true");
    }else if(passLen > 20){
        text.innerText="20 is the maximum";
        btnGen.setAttribute("disabled", "true");
    }
}
