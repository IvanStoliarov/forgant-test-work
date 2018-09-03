// toggle precent or absolute value
(function() {
  let percentTogglerList = $(".percent-toggler");

  percentTogglerList.click(function() {
    $(this).toggleClass("percent-toggler_is-off");
    $(this)
      .closest(".data-block")
      .toggleClass("data-block_absolute");
  });
})();

// add custom select
(function() {
  $("select").customSelect({
    block: "my-select"
  });
})();

// get data from API

(function() {
  function Data(url) {
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();

    if (request.status != 200) {
      alert(request.status + ": " + request.statusText);
    } else {
      return JSON.parse(request.responseText);
    }
  }

  // api links

  let btcLinks = {
    usd: "https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCUSD",
    eur: "https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCEUR",
    rub: "https://apiv2.bitcoinaverage.com/indices/global/ticker/BTCRUB"
  };

  let ethLinks = {
    usd: "https://apiv2.bitcoinaverage.com/indices/global/ticker/ETHUSD",
    eur: "https://apiv2.bitcoinaverage.com/indices/global/ticker/ETHEUR",
    rub: "https://apiv2.bitcoinaverage.com/indices/global/ticker/ETHRUB"
  };

  let ltcLinks = {
    usd: "https://apiv2.bitcoinaverage.com/indices/global/ticker/LTCUSD",
    eur: "https://apiv2.bitcoinaverage.com/indices/global/ticker/LTCEUR",
    rub: "https://apiv2.bitcoinaverage.com/indices/global/ticker/LTCRUB"
  };

  // Crypto currency constructor
  function CryptoCurrency(link) {
    this.rate = new Data(link);
  }

  // create Crypto currencies
  let btc, eth, ltc;

  // get delected currency
  let selectedCurrency = $("#currency").val();

  // get data for Crypto currencies
  function getCryptoCurrenciesData() {
    btc = new CryptoCurrency(btcLinks[selectedCurrency]);
    eth = new CryptoCurrency(ethLinks[selectedCurrency]);
    ltc = new CryptoCurrency(ltcLinks[selectedCurrency]);
  }

  getCryptoCurrenciesData();

  // Fill in html
  function fillInEth() {
    let ethBlock = $("#eth");
    ethBlock.find(".price__value").html(eth.rate.volume.toFixed(2).toLocaleString());
    ethBlock
      .find(".price-change-hour")
      .find(".percent-value")
      .html(eth.rate.changes.percent.hour);
    ethBlock
      .find(".price-change-day")
      .find(".percent-value")
      .html(eth.rate.changes.percent.day);
    ethBlock
      .find(".price-change-week")
      .find(".percent-value")
      .html(eth.rate.changes.percent.week);
    ethBlock
      .find(".price-change-month")
      .find(".percent-value")
      .html(eth.rate.changes.percent.month);
    ethBlock
      .find(".price-change-hour")
      .find(".absolute-value")
      .html(eth.rate.changes.price.hour);
    ethBlock
      .find(".price-change-day")
      .find(".absolute-value")
      .html(eth.rate.changes.price.day);
    ethBlock
      .find(".price-change-week")
      .find(".absolute-value")
      .html(eth.rate.changes.price.week);
    ethBlock
      .find(".price-change-month")
      .find(".absolute-value")
      .html(eth.rate.changes.price.month);
  }

  function fillInLtc() {
    let ltcBlock = $("#ltc");
    ltcBlock.find(".price__value").html(ltc.rate.volume.toFixed(2));
    ltcBlock
      .find(".price-change-hour")
      .find(".percent-value")
      .html(ltc.rate.changes.percent.hour);
    ltcBlock
      .find(".price-change-day")
      .find(".percent-value")
      .html(ltc.rate.changes.percent.day);
    ltcBlock
      .find(".price-change-week")
      .find(".percent-value")
      .html(ltc.rate.changes.percent.week);
    ltcBlock
      .find(".price-change-month")
      .find(".percent-value")
      .html(ltc.rate.changes.percent.month);
    ltcBlock
      .find(".price-change-hour")
      .find(".absolute-value")
      .html(ltc.rate.changes.price.hour);
    ltcBlock
      .find(".price-change-day")
      .find(".absolute-value")
      .html(ltc.rate.changes.price.day);
    ltcBlock
      .find(".price-change-week")
      .find(".absolute-value")
      .html(ltc.rate.changes.price.week);
    ltcBlock
      .find(".price-change-month")
      .find(".absolute-value")
      .html(ltc.rate.changes.price.month);
  }

  function fillInBtc() {
    let btcBlock = $("#btc");
    btcBlock.find(".price__value").html(btc.rate.volume.toFixed(2));
    btcBlock
      .find(".price-change-hour")
      .find(".percent-value")
      .html(btc.rate.changes.percent.hour);
    btcBlock
      .find(".price-change-day")
      .find(".percent-value")
      .html(btc.rate.changes.percent.day);
    btcBlock
      .find(".price-change-week")
      .find(".percent-value")
      .html(btc.rate.changes.percent.week);
    btcBlock
      .find(".price-change-month")
      .find(".percent-value")
      .html(btc.rate.changes.percent.month);
    btcBlock
      .find(".price-change-hour")
      .find(".absolute-value")
      .html(btc.rate.changes.price.hour);
    btcBlock
      .find(".price-change-day")
      .find(".absolute-value")
      .html(btc.rate.changes.price.day);
    btcBlock
      .find(".price-change-week")
      .find(".absolute-value")
      .html(btc.rate.changes.price.week);
    btcBlock
      .find(".price-change-month")
      .find(".absolute-value")
      .html(btc.rate.changes.price.month);
  }

  fillInEth();
  fillInLtc();
  fillInBtc();

  // format values depending on decrease or increase
  function negativeNumberTest() {
    // test for percent values
    let percentValueAreaList = document.querySelectorAll(".percent-value");
    for (let i = 0; i < percentValueAreaList.length; i++) {
      const valueArea = percentValueAreaList[i];
      const valueAreaNumber = parseInt(valueArea.textContent);
      if (valueAreaNumber > 0) {
        valueArea.innerHTML = "+" + valueAreaNumber + "%";
      } else {
        valueArea.classList.add("price-change__value_decrease");
        valueArea.innerHTML = valueAreaNumber + "%";
      }
    }

    //   test for absolute values
    let absoluteValueAreaList = document.querySelectorAll(".absolute-value");
    for (let i = 0; i < absoluteValueAreaList.length; i++) {
      const valueArea = absoluteValueAreaList[i];
      const valueAreaNumber = parseInt(valueArea.textContent);

      // set currency symbol depending on chosen currency
      let curencySymbol;
      switch (selectedCurrency) {
        case "usd":
          curencySymbol = "&#36;";
          break;
        case "eur":
          curencySymbol = "&euro;";
          break;
        case "rub":
          curencySymbol = "&#8381;";
          break;

        default:
          break;
      }
      if (valueAreaNumber > 0) {
        valueArea.innerHTML = "+" + valueAreaNumber + curencySymbol;
      } else {
        valueArea.classList.add("price-change__value_decrease");
        valueArea.innerHTML = valueAreaNumber + curencySymbol;
      }
    }
  }

  negativeNumberTest();

  // Format price depending on chosen currency
  function formatPrice() {
    let priceValue = $(".price__value");
    switch (selectedCurrency) {
      case "usd":
        priceValue.each(function() {
          let value = parseFloat($(this).html());
          $(this).html(value.toLocaleString("en-US", { style: "currency", currencyDisplay:"symbol",  currency: "USD" }).replace(",", " "));
        });
        break;
      case "eur":
        priceValue.each(function() {
          let value = parseFloat($(this).html());
          $(this).html(value.toLocaleString("en-US", { style: "currency", currencyDisplay:"symbol", currency: "EUR" }).replace(",", " "));
        });
        break;
      case "rub":
        priceValue.each(function() {
          let value = parseFloat($(this).html());
          $(this).html(value.toLocaleString("en-US", { style: "currency", currencyDisplay:"symbol", currency: "RUB" }).replace(",", " "));
        });
        break;
    }
  }

  formatPrice();

  // listener for currency select

  $("#currency").change(function() {
    selectedCurrency = $(this).val();
    getCryptoCurrenciesData();
    fillInEth();
    fillInLtc();
    fillInBtc();
    negativeNumberTest();
    formatPrice();
  });

})();
