const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"
const selectOptions = document.querySelectorAll(".selectCountry")
const btn = document.querySelector(".btn")
const amt = document.querySelector(".amount-text")
const fromCountry = document.querySelector(".fromCountry select")
const toCountry = document.querySelector(".toCountry select")
const msg = document.querySelector(".msg")
for (let selectOp of selectOptions) {
  for (currCode in countryList) {
    let newOption = document.createElement("option")
    newOption.value = currCode;
    newOption.innerHTML = currCode;
    if (selectOp.name === "to" && currCode === "INR") {

      newOption.selected = "selected"
    }
    if (selectOp.name === "from" && currCode === "USD") {

      newOption.selected = "selected"
    }
    selectOp.appendChild(newOption)
  }
  selectOp.addEventListener("change", (evt) => {
    updateFlag(evt.target)

  })
}

const updateFlag = (ele) => {

  let currCode = ele.value;
  let countryCode = countryList[currCode]

  const imgURl = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = ele.parentElement.querySelector("img")
  img.src = imgURl
}

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = amt.value ;
  if (amount < 0 || amount === "") {
    alert("Please Enter a Valid Value")
  }
  
const UPDATED_BASE_URL = `${BASE_URL}/${fromCountry.value.toLowerCase()}/${toCountry.value.toLowerCase()}.json`

const response = await fetch(UPDATED_BASE_URL)
const data = await response.json();
let rate = data[toCountry.value.toLowerCase()]

const result = amount* rate;
  
   if(amount > 0  && amount != ""){
      msg.innerHTML = `${amount} ${fromCountry.value} =  ${result.toFixed(2)} ${toCountry.value} `
   }
})