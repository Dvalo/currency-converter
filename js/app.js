const firstCurrAmount = $("#firstCurrInp");
const secondCurrName = $(".secondCurrency .currName");
const secondCurrAmount = $("#secondCurrInp");
const secondCurrAbbreviation = $(".secondCurrency .abbr");
const secondCurrFlag = $(".secondCurrency .flag img");
const secondCurrSymbol = $(".secondCurrency .symbol");

const currencyList = [{
        name: "Canadian Dollars",
        abbreviation: "CAD",
        symbol: "&#36;",
    },
    {
        name: "Hong Kong Dollars",
        abbreviation: "HKD",
        symbol: "&#36;",
    },
    {
        name: "Iceland Krona",
        abbreviation: "ISK",
        symbol: "&#36;",
    },
    {
        name: "Philippines Pesos",
        abbreviation: "PHP",
        symbol: "&#8369;",
    },
    {
        name: "Denmark Krone",
        abbreviation: "DKK",
        symbol: "&#36;",
    },
    {
        name: "Hungary Forint",
        abbreviation: "HUF",
        symbol: "&#36;",
    },
    {
        name: "Czech Koruna",
        abbreviation: "CZK",
        symbol: "&#36;",
    },
    {
        name: "United Kingdom Pounds",
        abbreviation: "GBP",
        symbol: "&#163;",
    },
    {
        name: "Romanian Leu",
        abbreviation: "RON",
        symbol: "&#36;",
    },
    {
        name: "Sweden Krona",
        abbreviation: "SEK",
        symbol: "&#36;",
    },
    {
        name: "Indonesia Rupiah",
        abbreviation: "IDR",
        symbol: "&#36;",
    },
    {
        name: "India Rupees",
        abbreviation: "INR",
        symbol: "&#8377;",
    },
    {
        name: "Brazilian real",
        abbreviation: "BRL",
        symbol: "&#36;",
    },
    {
        name: "Russia Rubles",
        abbreviation: "RUB",
        symbol: "&#8381;",
    },
    {
        name: "Croatian kuna",
        abbreviation: "HRK",
        symbol: "&#36;",
    },
    {
        name: "Japan Yen",
        abbreviation: "JPY",
        symbol: "&#165;",
    },
    {
        name: "Thailand Baht",
        abbreviation: "THB",
        symbol: "&#3647;",
    },
    {
        name: "Switzerland Francs",
        abbreviation: "CHF",
        symbol: "&#36;",
    },
    {
        name: "Euro",
        abbreviation: "EUR",
        symbol: "&#8364;",
    },
    {
        name: "Malaysia Ringgit",
        abbreviation: "MYR",
        symbol: "&#36;",
    },
    {
        name: "Bulgarian Lev",
        abbreviation: "BGN",
        symbol: "&#36;",
    },
    {
        name: "Turkish Lira",
        abbreviation: "TRY",
        symbol: "&#8378;",
    },
    {
        name: "China Yuan Renmimbi",
        abbreviation: "CNY",
        symbol: "&#165;",
    },
    {
        name: "Norway Kroner",
        abbreviation: "NOK",
        symbol: "&#36;",
    },
    {
        name: "New Zealand Dollars",
        abbreviation: "NZD",
        symbol: "&#36;",
    },
    {
        name: "South Africa Rand",
        abbreviation: "ZAR",
        symbol: "&#36;",
    },
    {
        name: "United States Dollars",
        abbreviation: "USD",
        symbol: "&#36;",
    },
    {
        name: "Mexico Pesos",
        abbreviation: "MXN",
        symbol: "&#36;",
    },
    {
        name: "Singapore Dollars",
        abbreviation: "SGD",
        symbol: "&#36;",
    },
    {
        name: "Australia Dollars",
        abbreviation: "AUD",
        symbol: "&#36;",
    },
    {
        name: "Israel Shekels",
        abbreviation: "ILS",
        symbol: "&#x20AA;",
    },
    {
        name: "Korea Won",
        abbreviation: "KRW",
        symbol: "&#x20A9;",
    },
    {
        name: "Poland Zloty",
        abbreviation: "PLN",
        symbol: "&#36;",
    }
]

const tempExchangeRates = [];

const apiURL = "https://api.exchangeratesapi.io/latest?base=USD";

$(document).ready(function() {
    $("#modal").iziModal({
        overlayClose: true,
        overlayColor: 'rgba(0, 0, 0, 0.7)',
        width: '80%',
        padding: 20
    });
    cacheExchangeRates();
    populateModal();
});

function cacheExchangeRates() {
    getCurrencyRates();
}

function updateAmount(value) {
    if (isNaN(value) || value === "" || value == null) {
        updateTargetConversion(0);
    } else {
        let currentValue = parseInt(value);
        let targetCurrency = $(".secondCurrency .abbr").html();
        let targetCurrencyRate = tempExchangeRates[0][targetCurrency];
        let tempConvert = currentValue * targetCurrencyRate;
        updateTargetConversion(tempConvert);
    }

}

function getCurrencyRates() {
    $.getJSON(apiURL, function(json) {
        tempExchangeRates.push(json.rates);
    });
}

function populateModal() {
    currencyList.forEach(key => {
        let currencyFullName = key.name;
        let currencyAbbreviation = key.abbreviation;
        let currencySymbol = key.symbol;
        let flagName = currencyAbbreviation.substring(0, 2);
        $("#currencyList").append(`
    <div class='currencyChoice ${currencyAbbreviation}' data-izimodal-open='' data-iziModal-transitionOut='fadeOutDown'>
      <div class="currencyWrapper"><img src='https://www.countryflags.io/${flagName}/flat/64.png'>
        <div class="currencyExtraWrapper"><span class="currencyname">${currencyFullName}</span>
          <div class="currencyExtra">
            <span class="currencyAbbr">${currencyAbbreviation}</span>
            <span class="currencySymb">${currencySymbol}</span>
          </div>
        </div>
      </div>
    </div>`);
    });
    updateTargetDisplay();
}

function updateTargetDisplay() {
    $(".currencyChoice").click(function() {
        let currencyFullName = $(this).closest('div').find('span').html();
        let currencyFlagSrc = $(this).closest('div').find('img').attr('src');
        let currencySymbol = $(this).closest('div').find('.currencySymb').html();
        let currencyAbbreviation = $(this).closest('div').find('.currencyAbbr').html();

        firstCurrAmount.val("");
        secondCurrAmount.val("");

        secondCurrName.html(currencyFullName);
        secondCurrFlag.attr('src', currencyFlagSrc);
        secondCurrSymbol.html(currencySymbol);
        secondCurrAbbreviation.html(currencyAbbreviation);
    });
}

function updateTargetConversion(amount) {
    secondCurrAmount.val(amount.toFixed(2));
}