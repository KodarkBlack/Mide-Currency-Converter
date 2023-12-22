const dropList = document.querySelectorAll(".drop-list select")
getButton = document.querySelector("form button")
fromCurrency = document.querySelector(".from select")
toCurrency = document.querySelector(".to select")


for (let i = 0; i < dropList.length; i++) {
    for(currency_code in country_code){
        let selected
        if(i == 0){
            selected = currency_code =="USD" ? "selected" : "";
        } else if (i == 1 ) {
            selected = currency_code == "EUR" ? "selected" : "";
        }
        let optionTag = `<option value"${currency_code}">${currency_code}</option>`
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }

    dropList[i].addEventListener("change", e => {
        loadFlag(e.target)
    })
    
}

function loadFlag(element) {
    for(let code in country_code){
        if(code === element.value){
            let imgTag = element.parentElement.querySelector("img")
            imgTag.src = `https://www.countryflags.io/${country_code[code]}/flat/64.png`
        }
    }
}


window.addEventListener("load", () => {
    getExchangeRate()
})

getButton.addEventListener("click", e => {
    e.preventDefault()
    getExchangeRate()
})

const exchangeIcon = document.querySelector(".drop-list .icon");
exchangeIcon.addEventListener("click", () => {
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode;
    getExchangeRate()
})


function getExchangeRate() {
    const amount = document.querySelector(".amount input");
     exchangeRateTxt = document.querySelector(".exchange-rate")
    let amountVal = amount.value;

    if (amountVal == "" || amountVal == "0") {
        amount.value = "1"
        amountVal = 1
    }


    exchangeRateTxt.innerText = "Getting the exchange rate......"
    let URL = `https://v6.exchangerate-api.com/v6/fce350b6799d56c96127d076/latest/${fromCurrency.value}`
    fetch(URL)
    .then(response => response.json())
    .then(result => {
        let exchangeRate = result.conversion_rates[toCurrency.value]
        let totalExchangeRate = (amountVal * exchangeRate).toFixed(2)
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency}`
    });
}