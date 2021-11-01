const url = "https://restcountries.com/v3.1/all";
const namesearchUrl = "https://restcountries.com/v3.1/name/";
const regionSearchUrl = "https://restcountries.com/v3.1/region/"

const select = document.querySelector(".select-list");
const dropdown = document.querySelector(".dropdown");
const countryContainer = document.querySelector(".countries-container");
const formSearch = document.querySelector(".search");
const input = document.querySelector(".search input");

formSearch.addEventListener('submit', (e) => {
    e.preventDefault();
    let searchTerm = formSearch.search.value;
    renderCountries(namesearchUrl+searchTerm);
    input.value = "";
})

async function fetchData(url) {
    const resp = await fetch(url);
    const data = await resp.json();
    // console.log(data);

    return data
}

const dropdownList = async () => {

    const data = await fetchData(url);

    // making array of regions
    let regions = data.map((region) => region.region)
    regions = [...new Set(regions)]

    return regions;
}

const renderCountries = async (completeUrl) => {

    const countries = await fetchData(completeUrl);

    let template = "";

    countries.forEach((country) => {

        const { name: { common }, population, capital, region, flags: { svg }, cca2} = country;
        // console.log(cca2)

        template += `
        <div class="country">
            <a href="./details.html?code=${cca2}">
                <div class="flag">
                    <img src=${svg} alt=${common}>
                </div>
                <div class="info">
                    <h1>${common}</h1>
                    <h3>Population: <span>${population}</span></h3>
                    <h3>Region: <span>${region}</span></h3>
                    <h3>Capital: <span>${capital}</span></h3>
                </div>
            </a>
        </div>
    `;
    })
    countryContainer.innerHTML = template;
}

const main = async () => {

    let regions = await dropdownList()
    renderCountries(url);

    // making region wise dropdown list
    let template = "";
    regions.forEach((region) => {
        template += `
          <div class="option">${region}</div>
          `;
    })
    select.innerHTML = template;

    dropdown.addEventListener('click', () => {
        let display = select.classList;
        if (display.contains("disable")) {
            display.remove("disable");
        } else {
            display.add("disable");
        }
    })

    const opts = document.querySelectorAll(".option");

    opts.forEach((opt) => {
        opt.addEventListener('click', (e) => {
            let region = e.target.textContent;
            renderCountries(regionSearchUrl+region)
            console.log(regionSearchUrl+region);
        })
    })

}

window.addEventListener('DOMContentLoaded', () => main())