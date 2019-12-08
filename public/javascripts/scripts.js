// let paragraph = document.getElementById('dateTime');
// let date = new Date();
// paragraph.innerText = date.toUTCString();

document.getElementById('dateTime').innerText = new Date().toLocaleString("da-DK");

// You can't use the "require" in a browser
// let button = document.getElementById('button');
// let conveterWatt = require('../../converterWatt');
// button.addEventListener("click", () => {
//     let wattField = document.getElementById('watt');
//     let kwField = document.getElementById('kw');
//     console.log("asdasd");
//     return kwField.innerText = conveterWatt(wattField.innerText);
// });
// console.log(button);
