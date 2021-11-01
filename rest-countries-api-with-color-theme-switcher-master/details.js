const codeUrl = "https://restcountries.com/v3.1/alpha/";
const code = new URLSearchParams(window.location.search).get("code");

const detailContainer = document.querySelector(".details-container");

async function fetchData(url) {
    const resp = await fetch(url);
    const data = await resp.json();
    // console.log(data);

    return data
}

const renderSingleCountry = async (completeUrl) => {

    const singleCountry = await fetchData(completeUrl);
    const { name: { common, nativeName }, population, region, subregion, capital, tld, currencies, flags: { svg } } = singleCountry[0];
    
    console.log(singleCountry,currencies);

    let template = "";

    template += `
        <div class="image-container">
            <img src=${svg} alt=${common}>
        </div>
        <div class="detail-info">
            <h1>${common}</h1>
            </br>
            <h3>Native Name: <span></span></h3>
            <h3>Population: <span>${population}</span></h3>
            <h3>Region: <span>${region}</span></h3>
            <h3>Sub Region: <span>${subregion}</span></h3>
            <h3>Capital: <span>${capital}</span></h3>
            </br>
            <h3>Top Level Domain: <span>${tld[0]}</span></h3>
            <h3>Currencies: <span></span></h3>
            <h3>Languages<span></span></h3>
            </br>
            <div class="border-countries">
                <h3>Border Countries</h3>
                <div class="neighbours">
                    <div class="button n">france</div>
                    <div class="button n">germany</div>
                    <div class="button n">neitherland</div>
                </div>
            </div>
        </div>
    `;

    detailContainer.innerHTML = template;
}

window.addEventListener('DOMContentLoaded', () => renderSingleCountry(codeUrl + code))