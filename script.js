const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("button");
let fromCode = document.querySelector(".from select");
let toCode = document.querySelector(".to select");
let Amnt = document.querySelector("input");
let msg = document.querySelector("#msg");

for (let select of dropdowns) {
  for (let code in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = code;
    select.append(newOption);

    if (select.name === "from" && code === "USD") {
      newOption.selected = "selected";
    }
    if (select.name === "to" && code === "PKR") {
      newOption.selected = "selected";
    }
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

let updateFlag = (el) => {
  let currCode = el.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let flag = el.parentElement.querySelector("img");
  flag.src = newSrc;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  let rate = getExchangeRate();
});

let getExchangeRate = async () => {
    if(Amnt.value == " " || Amnt.value < 1){
        Amnt.value = 1;
    }
  let URL = `${BASE_URL}/${fromCode.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = await data[fromCode.value.toLowerCase()][
    toCode.value.toLowerCase()
  ];
  let finalAmnt = rate * Amnt.value;
  msg.innerText = `${Amnt.value} ${fromCode.value} = ${finalAmnt.toFixed(2)} ${
    toCode.value
  }`;
};

window.addEventListener("load",()=>{
    getExchangeRate();
})

var emoji = String.fromCharCode(0x2764);
console.log(`made with love by Riyyan Siddiqui ${emoji}`)