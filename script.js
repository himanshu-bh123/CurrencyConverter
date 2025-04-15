document.addEventListener('DOMContentLoaded', () => {
  console.log("Main.js working");

  const droplist = document.querySelectorAll(".drop-list select");
  console.log(droplist);
  const formCurrency = document.querySelector(".form select");
  const toCurrency = document.querySelector(".to select");
  const exchangeRateTxt = document.querySelector(".exchange-rate");

  // apiKey(actual API key)
  const apiKey = "1068cd3543285c928c49c8f4"; 

  if (typeof country_code !== 'undefined') {
      // Loop through in each dd
      for (let i = 0; i < droplist.length; i++){
          // Loop through currency codes in country_code
          for (let currency_code in country_code) {

              //  option tag for each currency
              let optionTag = `<option value="${currency_code}">${currency_code}</option>`;
              droplist[i].insertAdjacentHTML("beforeend", optionTag);
          }
      }
  } else {
      console.error("country_code not defined.");
  }

  // Update flag when dd change
  droplist.forEach(dropdown => {
      dropdown.addEventListener("change", (e) => {
          loadFlag(e.target);
      });
  });

  // Load flag 
  function loadFlag(element) {
      for (let code in country_code) {
          if (code === element.value) {
              let imgTag = element.parentElement.querySelector("img");
              imgTag.src = `https://flagsapi.com/${country_code[code]}/flat/64.png`;
          }
      }
  }

  // Fetch exchange rate
  function getExchangeRate() {
      const amountVal = parseFloat(document.querySelector(".amount input").value);
      if (isNaN(amountVal)) {
          exchangeRateTxt.innerText = "enter a amount.";
          return;
      }

      let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${formCurrency.value}`;
      
      fetch(url)
          .then(response => response.json())
          .then(result => {
              if (result.result === "success") {
                  const exchangeRate = result.conversion_rates[toCurrency.value];
                  const totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
                  exchangeRateTxt.innerText = `${amountVal} ${formCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
              } 
          })
  }

  // for button click 
  const getButton = document.querySelector("form button");
  getButton.addEventListener("click", (e) => {
      e.preventDefault();
      getExchangeRate();
  });
});