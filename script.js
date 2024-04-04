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

