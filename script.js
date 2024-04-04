let search = document.getElementById('searchinput');
let sortbutton = document.getElementById('Sortcap');
let sortbyperbutton = document.getElementById('Sortpercentage');
let dataContainer = document.getElementById('data_Container');

let cryptoData; 

function createElement(crypto) {
    let div = document.createElement('div');
    div.className = 'data';
    
    let first = document.createElement('div');
    let img = document.createElement('img');
    img.src = crypto.image;
    img.className = 'cryptoimage';
    
    let cryptoName = document.createElement('div');
    cryptoName.textContent = crypto.name;
    first.className = 'name_container';

    let symbol = document.createElement('div');
    symbol.textContent = crypto.symbol.toUpperCase();

    let price = document.createElement('div');
    price.textContent = "$" + crypto.current_price.toFixed(2).toLocaleString();

    let volume = document.createElement('div');
    volume.textContent = "$" + crypto.total_volume.toLocaleString();

    let percentage = document.createElement('div');
    percentage.textContent = crypto.price_change_percentage_24h.toFixed(2)+ "%";
    if (crypto.price_change_percentage_24h < 0) {
        percentage.style.color = 'red';
    } else {
        percentage.style.color = 'green';
    }

    let mktcap = document.createElement('div');
    mktcap.textContent = "Mkt Cap: $" + crypto.market_cap.toLocaleString();

    first.appendChild(img);
    first.appendChild(cryptoName);
    div.appendChild(first);
    div.appendChild(symbol);
    div.appendChild(price);
    div.appendChild(volume);
    div.appendChild(percentage);
    div.appendChild(mktcap);
    return div;
}


function renderData(data) {
    dataContainer.innerHTML = ''; 

    data.forEach(crypto => {
        let div = createElement(crypto);
        dataContainer.appendChild(div);

        let underline = document.createElement('div');
        underline.className = 'underline';
        dataContainer.appendChild(underline);
    });
}


function filterData(searchTerm) {
    const filteredData = cryptoData.filter(crypto => {
        return crypto.name.toLowerCase().includes(searchTerm) || crypto.symbol.toLowerCase().includes(searchTerm);
    });
    renderData(filteredData);
}


function sortByMarketCap() {
    const sortedData = [...cryptoData].sort((a, b) => b.market_cap - a.market_cap);
    renderData(sortedData);
}


function sortByPercentageChange() {
    const sortedData = [...cryptoData].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    renderData(sortedData);
}


async function fetchData() {
    try {
        const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true';
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        cryptoData = await response.json();
        renderData(cryptoData);
    } catch (error) {
        console.error('There was a problem fetching the data:', error);
    }
}


search.addEventListener('input', () => {
    filterData(search.value.toLowerCase());
});

sortbutton.addEventListener('click', () => {
    sortByMarketCap();
});

sortbyperbutton.addEventListener('click', () => {
    sortByPercentageChange();
});


fetchData();

// let arr=[
//     {
//       "id": "bitcoin",
//       "symbol": "btc",
//       "name": "Bitcoin",
//       "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
//       "current_price": 65430,
//       "market_cap": 1288423922662,
//       "market_cap_rank": 1,
//       "fully_diluted_valuation": 1375350180095,
//       "total_volume": 32057955231,
//       "high_24h": 66945,
//       "low_24h": 65135,
//       "price_change_24h": -703.836964762704,
//       "price_change_percentage_24h": -1.06426,
//       "market_cap_change_24h": -12798047722.3254,
//       "market_cap_change_percentage_24h": -0.98354,
//       "circulating_supply": 19672737,
//       "total_supply": 21000000,
//       "max_supply": 21000000,
//       "ath": 73738,
//       "ath_change_percentage": -11.15775,
//       "ath_date": "2024-03-14T07:10:36.635Z",
//       "atl": 67.81,
//       "atl_change_percentage": 96510.24492,
//       "atl_date": "2013-07-06T00:00:00.000Z",
//       "roi": null,
//       "last_updated": "2024-04-04T05:26:02.347Z"
//     },
//     {
//       "id": "ethereum",
//       "symbol": "eth",
//       "name": "Ethereum",
//       "image": "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
//       "current_price": 3287.01,
//       "market_cap": 394565083996,
//       "market_cap_rank": 2,
//       "fully_diluted_valuation": 394565083996,
//       "total_volume": 15745923250,
//       "high_24h": 3365.2,
//       "low_24h": 3251.72,
//       "price_change_24h": -21.3855085701598,
//       "price_change_percentage_24h": -0.6464,
//       "market_cap_change_24h": -2616686507.8938,
//       "market_cap_change_percentage_24h": -0.65881,
//       "circulating_supply": 120068372.18484,
//       "total_supply": 120068372.18484,
//       "max_supply": null,
//       "ath": 4878.26,
//       "ath_change_percentage": -32.5419,
//       "ath_date": "2021-11-10T14:24:19.604Z",
//       "atl": 0.432979,
//       "atl_change_percentage": 759932.96087,
//       "atl_date": "2015-10-20T00:00:00.000Z",
//       "roi": {
//         "times": 66.1594942651941,
//         "currency": "btc",
//         "percentage": 6615.94942651941
//       },
//       "last_updated": "2024-04-04T05:25:51.409Z"
//     },
//     {
//       "id": "tether",
//       "symbol": "usdt",
//       "name": "Tether",
//       "image": "https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661",
//       "current_price": 0.999642,
//       "market_cap": 106057186808,
//       "market_cap_rank": 3,
//       "fully_diluted_valuation": 106057186808,
//       "total_volume": 59843868611,
//       "high_24h": 1.003,
//       "low_24h": 0.995522,
//       "price_change_24h": -0.000412058855395858,
//       "price_change_percentage_24h": -0.0412,
//       "market_cap_change_24h": 767370501,
//       "market_cap_change_percentage_24h": 0.72882,
//       "circulating_supply": 106149786847.074,
//       "total_supply": 106149786847.074,
//       "max_supply": null,
//       "ath": 1.32,
//       "ath_change_percentage": -24.37014,
//       "ath_date": "2018-07-24T00:00:00.000Z",
//       "atl": 0.572521,
//       "atl_change_percentage": 74.78051,
//       "atl_date": "2015-03-02T00:00:00.000Z",
//       "roi": null,
//       "last_updated": "2024-04-04T05:25:59.576Z"
//     },
//     {
//       "id": "binancecoin",
//       "symbol": "bnb",
//       "name": "BNB",
//       "image": "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970",
//       "current_price": 578.52,
//       "market_cap": 89026653589,
//       "market_cap_rank": 4,
//       "fully_diluted_valuation": 89026653589,
//       "total_volume": 2147271189,
//       "high_24h": 580.04,
//       "low_24h": 551.16,
//       "price_change_24h": 22.63,
//       "price_change_percentage_24h": 4.07129,
//       "market_cap_change_24h": 3528411393,
//       "market_cap_change_percentage_24h": 4.12688,
//       "circulating_supply": 153856150,
//       "total_supply": 153856150,
//       "max_supply": 200000000,
//       "ath": 686.31,
//       "ath_change_percentage": -15.57726,
//       "ath_date": "2021-05-10T07:24:17.097Z",
//       "atl": 0.0398177,
//       "atl_change_percentage": 1455028.96174,
//       "atl_date": "2017-10-19T00:00:00.000Z",
//       "roi": null,
//       "last_updated": "2024-04-04T05:26:25.799Z"
//     },
//     {
//       "id": "solana",
//       "symbol": "sol",
//       "name": "Solana",
//       "image": "https://assets.coingecko.com/coins/images/4128/large/solana.png?1696504756",
//       "current_price": 182.3,
//       "market_cap": 81065111998,
//       "market_cap_rank": 5,
//       "fully_diluted_valuation": 104462288484,
//       "total_volume": 4469378343,
//       "high_24h": 191.63,
//       "low_24h": 180.32,
//       "price_change_24h": -6.04153637829063,
//       "price_change_percentage_24h": -3.20784,
//       "market_cap_change_24h": -2659421130.41118,
//       "market_cap_change_percentage_24h": -3.17639,
//       "circulating_supply": 444813097.181282,
//       "total_supply": 573195952.411258,
//       "max_supply": null,
//       "ath": 259.96,
//       "ath_change_percentage": -29.94297,
//       "ath_date": "2021-11-06T21:54:35.825Z",
//       "atl": 0.500801,
//       "atl_change_percentage": 36265.67338,
//       "atl_date": "2020-05-11T19:35:23.449Z",
//       "roi": null,
//       "last_updated": "2024-04-04T05:25:37.584Z"
//     },
//     {
//       "id": "usd-coin",
//       "symbol": "usdc",
//       "name": "USDC",
//       "image": "https://assets.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
//       "current_price": 0.999183,
//       "market_cap": 32844508299,
//       "market_cap_rank": 6,
//       "fully_diluted_valuation": 32994362356,
//       "total_volume": 10185435553,
//       "high_24h": 1.004,
//       "low_24h": 0.995656,
//       "price_change_24h": 0.00030194,
//       "price_change_percentage_24h": 0.03023,
//       "market_cap_change_24h": 44547129,
//       "market_cap_change_percentage_24h": 0.13581,
//       "circulating_supply": 32871250999.3446,
//       "total_supply": 33021227070.3007,
//       "max_supply": null,
//       "ath": 1.17,
//       "ath_change_percentage": -14.82999,
//       "ath_date": "2019-05-08T00:40:28.300Z",
//       "atl": 0.877647,
//       "atl_change_percentage": 13.80366,
//       "atl_date": "2023-03-11T08:02:13.981Z",
//       "roi": null,
//       "last_updated": "2024-04-04T05:26:20.426Z"
//     },
//     {
//       "id": "staked-ether",
//       "symbol": "steth",
//       "name": "Lido Staked Ether",
//       "image": "https://assets.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206",
//       "current_price": 3280.07,
//       "market_cap": 31340768505,
//       "market_cap_rank": 7,
//       "fully_diluted_valuation": 31340768505,
//       "total_volume": 93916165,
//       "high_24h": 3358.88,
//       "low_24h": 3248.32,
//       "price_change_24h": -23.8575719320834,
//       "price_change_percentage_24h": -0.7221,
//       "market_cap_change_24h": -253990057.971336,
//       "market_cap_change_percentage_24h": -0.8039,
//       "circulating_supply": 9554624.52794538,
//       "total_supply": 9554702.59522044,
//       "max_supply": null,
//       "ath": 4829.57,
//       "ath_change_percentage": -32.08133,
//       "ath_date": "2021-11-10T14:40:47.256Z",
//       "atl": 482.9,
//       "atl_change_percentage": 579.27229,
//       "atl_date": "2020-12-22T04:08:21.854Z",
//       "roi": null,
//       "last_updated": "2024-04-04T05:25:56.199Z"
//     },
//     {
//       "id": "ripple",
//       "symbol": "xrp",
//       "name": "XRP",
//       "image": "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png?1696501442",
//       "current_price": 0.569215,
//       "market_cap": 31252286601,
//       "market_cap_rank": 8,
//       "fully_diluted_valuation": 56874935360,
//       "total_volume": 1504966312,
//       "high_24h": 0.592032,
//       "low_24h": 0.56334,
//       "price_change_24h": -0.0170391456476697,
//       "price_change_percentage_24h": -2.90644,
//       "market_cap_change_24h": -964658499.533707,
//       "market_cap_change_percentage_24h": -2.99426,
//       "circulating_supply": 54942400126,
//       "total_supply": 99987738355,
//       "max_supply": 100000000000,
//       "ath": 3.4,
//       "ath_change_percentage": -83.24512,
//       "ath_date": "2018-01-07T00:00:00.000Z",
//       "atl": 0.00268621,
//       "atl_change_percentage": 21097.40505,
//       "atl_date": "2014-05-22T00:00:00.000Z",
//       "roi": null,
//       "last_updated": "2024-04-04T05:26:17.135Z"
//     },
//     {
//       "id": "dogecoin",
//       "symbol": "doge",
//       "name": "Dogecoin",
//       "image": "https://assets.coingecko.com/coins/images/5/large/dogecoin.png?1696501409",
//       "current_price": 0.17503,
//       "market_cap": 25161426843,
//       "market_cap_rank": 9,
//       "fully_diluted_valuation": 25162244326,
//       "total_volume": 2765541599,
//       "high_24h": 0.187069,
//       "low_24h": 0.171171,
//       "price_change_24h": -0.0103533080318623,
//       "price_change_percentage_24h": -5.5848,
//       "market_cap_change_24h": -1460679820.0723,
//       "market_cap_change_percentage_24h": -5.48672,
//       "circulating_supply": 143738606383.705,
//       "total_supply": 143743276383.705,
//       "max_supply": null,
//       "ath": 0.731578,
//       "ath_change_percentage": -76.02911,
//       "ath_date": "2021-05-08T05:08:23.458Z",
//       "atl": 0.0000869,
//       "atl_change_percentage": 201693.0734,
//       "atl_date": "2015-05-06T00:00:00.000Z",
//       "roi": null,
//       "last_updated": "2024-04-04T05:26:21.637Z"
//     },
//     {
//       "id": "cardano",
//       "symbol": "ada",
//       "name": "Cardano",
//       "image": "https://assets.coingecko.com/coins/images/975/large/cardano.png?1696502090",
//       "current_price": 0.571017,
//       "market_cap": 20130173139,
//       "market_cap_rank": 10,
//       "fully_diluted_valuation": 25680456379,
//       "total_volume": 461146424,
//       "high_24h": 0.59344,
//       "low_24h": 0.561905,
//       "price_change_24h": -0.0151262050249746,
//       "price_change_percentage_24h": -2.58063,
//       "market_cap_change_24h": -548022635.156757,
//       "market_cap_change_percentage_24h": -2.65024,
//       "circulating_supply": 35274209222.0096,
//       "total_supply": 45000000000,
//       "max_supply": 45000000000,
//       "ath": 3.09,
//       "ath_change_percentage": -81.49012,
//       "ath_date": "2021-09-02T06:00:10.474Z",
//       "atl": 0.01925275,
//       "atl_change_percentage": 2867.80282,
//       "atl_date": "2020-03-13T02:22:55.044Z",
//       "roi": null,
//       "last_updated": "2024-04-04T05:26:49.836Z"
//     }
//   ]

//   createElement(arr);