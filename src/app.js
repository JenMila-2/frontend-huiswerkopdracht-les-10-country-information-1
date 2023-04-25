import axios, {all} from "axios";

const countryList = document.getElementById('countries');
const errorMessage = document.getElementById('error');

async function fetchCountries() {
    try {
        const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,flag,region,population');
        console.log(response.data);

        const allCountries = response.data;
        //Sorteert de landen op basis van population size van laag naar hoog
        allCountries.sort((a, b) => a.population - b.population);
        const allCountriesList = allCountries.map(country => {
            return `
           <li> 
            <p id="country-name" class="${fetchRegion(country.region)}"> ${country.flag} ${country.name.common}</p>
           </li>
           <li id="country-population">Has a poluation of ${country.population} people</li>
            `;
        });
        const countryListDisplay = allCountriesList.join('');
        countryList.innerHTML = countryListDisplay;

        //Code for een country
       /* countryList.innerHTML = `
        <li> ${response.data[0].flag} ${response.data[0].name.common} </li>
        <li>Has a poluation of ${response.data[0].population} people`</li>*/

    } catch(e) {
       console.error(e);
        //Code hierboven is bedoeld om errors af te vangen in de console

        if(e.response.status === 404) {
            errorMessage.textContent = "Page not found | 404";
        } else if (e.response.status === 500) {
            errorMessage.textContent = "Internal Service Error | 500";
        }
        //Code hierboven is bedoeld om errors te communiceren in de UI
    }
}
void fetchCountries();
//Krulletjes zijn zichtbaar omdat we een promise verwachten. Deze error is niet meer van toepassing. Je kunt deze error voorkomen door het woord 'void' voor de aanroep te plaatsen.

function fetchRegion(country) {
    switch (country) {
        case 'Africa':
            return 'blue';
        case 'Americas':
            return 'green';
        case 'Asia':
            return 'red';
        case 'Europe':
            return 'yellow';
        case 'Oceania':
            return 'purple';
        case 'Antarctic':
            return 'grey';
    }
}
//De hier boven vermelde return values worden via een class selector aangeroepen in de CSS file om de namen van de landen een kleur te geven op basis van hun regio.



//API Rest Countries
//https://restcountries.com/v3.1/name/{name}
//https://restcountries.com/#endpoints

//Stappenplan:
// GET request https://restcountries.com/v3.1/all
// GET request https://restcountries.com/v3.1/all?fields=name,flag,region,population

// 1. Installeer de dependency axios (npm install axios)
// 2. Schrijf een asynchrone functie
// 3. Maak een GET request met axios (met await)
// 4. Try / catch blok om de errors af te vangen
// 5. Element in HTML maken, referentie opslaan vanuit de JS
// 6. De data injecteren (map-methode!)