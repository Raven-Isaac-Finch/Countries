const selectedCountryContainer = document.getElementById('selected-country-container');
const neighborsContainer = document.getElementById('neighbors-container');

const searchBar = document.getElementById('search');

const getCountry = async (country) => {
    try {
        let url = `https://restcountries.com/v3.1/name/${country}`;
        let res = await fetch(url);
        let data = await res.json();

        generateCountryCard(data);

        data[0].borders.forEach((country) => {
            const countryGeneral = country.toLowerCase();
            getNeighbors(countryGeneral);
        });

    } catch {
        alert("Please Enter a Valid Input");
    }
};

const getNeighbors = async (border) => {
    let url = `https://restcountries.com/v3.1/alpha/${border}`;
    let res = await fetch(url);
    let data = await res.json();

    generateNeighborCard(data);
};

function generateCountryCard(data) {
    const countryFlag = data[0].flags.png;
    const countryName = data[0].name.common;
    const countryCode = data[0].cca2;
    const countryCapital = data[0].capital[0];
    const coutryRegion = data[0].region;
    const countryPop = (data[0].population / 1000000).toFixed(1);
    const countryLangs = Object.values(data[0].languages);
    const countryCurrencies = Object.values(Object.values(data[0].currencies)[0]);
    const countryTimeZone = data[0].timezones[0];

    selectedCountryContainer.innerHTML = `
        <div id="selected" class="country-card">
            <div class="top-container">
                <img src="${countryFlag}" alt="${countryName}">
                <h4>${countryName} <span>- [${countryCode}]</span></h4>
            </div>
            <p><i class="fa-solid fa-landmark-flag"></i> - ${countryCapital}</p>
            <p><i class="fa-solid fa-earth-americas"></i> - ${coutryRegion}</p>
            <p><i class="fa-solid fa-people-group"></i> - ${countryPop} Million</p>
            <p><i class="fa-solid fa-language"></i> - ${countryLangs}</p>
            <p><i class="fa-solid fa-coins"></i> - ${countryCurrencies}</p>
            <p><i class="fa-solid fa-clock"></i> - ${countryTimeZone}</p>
        </div>
    `;
}

function generateNeighborCard(data) {
    const countryFlag = data[0].flags.png;
    const countryName = data[0].name.common;
    const countryCode = data[0].cca2;
    const countryCapital = data[0].capital[0];
    const coutryRegion = data[0].region;
    const countryPop = (data[0].population / 1000000).toFixed(1);
    const countryLangs = Object.values(data[0].languages);
    const countryCurrencies = Object.values(data[0].currencies)[0].name;
    const countryTimeZone = data[0].timezones[0];

    const html = `
        <div class="country-card">
            <div class="top-container">
                <img src="${countryFlag}" alt="${countryName}">
                <h4>${countryName} <span>- [${countryCode}]</span></h4>
            </div>
            <p><i class="fa-solid fa-landmark-flag"></i> - ${countryCapital}</p>
            <p><i class="fa-solid fa-earth-americas"></i> - ${coutryRegion}</p>
            <p><i class="fa-solid fa-people-group"></i> - ${countryPop} Million</p>
            <p><i class="fa-solid fa-language"></i> - ${countryLangs}</p>
            <p><i class="fa-solid fa-coins"></i> - ${countryCurrencies}</p>
            <p><i class="fa-solid fa-clock"></i> - ${countryTimeZone}</p>
        </div>
    `;

    neighborsContainer.insertAdjacentHTML("beforeend", html);
}

searchBar.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') {
        e.preventDefault();
        selectedCountryContainer.innerHTML = '';
        neighborsContainer.innerHTML = '';

        const whichCountry = searchBar.value.toLowerCase();
        getCountry(whichCountry);
        searchBar.value = '';

        console.log(whichCountry);
    } else {
        return;
    }
});