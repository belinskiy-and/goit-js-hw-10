import './css/styles.css'; 
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetch-countries';

const DEBOUNCE_DELAY = 300;
let country = null;

//----------------------------------------

const refs = {
  searchBox: document.querySelector('#search-box'), 
  countriesList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

function clearData() { 
  refs.countriesList.innerHTML = '';
  refs.countryInfo.innerHTML = '';
}

function searchAction(event) {
  const inputValue = event.target.value.trim();
  if (inputValue === '') { 
    clearData();
    return;
  }
    
  fetchCountries(inputValue)
    .then(countries => { 
      if (countries.length > 10) {
        clearData();
        Notiflix.Notify.info('Too many matches found. Please enter a more specific query!');
        return;
      }
      else if (countries.length === 1) {
        clearData();
        renderCountry(countries[0]);
        return; 
      }
        renderCountries(countries);
      
    })
    .catch(error => {
      clearData()
      Notiflix.Notify.failure('Oops, there is no country with that name!');
    }
    );
}

function renderCountry(country) {
  refs.countryInfo.innerHTML = ` 
      <div class="info-title">
        <img src = "${country.flags.svg}" alt = Flag of"${country.name.official} class = "flag" ">
        <h1>${country.name.official}</h1>
        <p><span>Capital:</span> ${country.capital}</p>
        <p><span>Population:</span> ${country.population}</p>
        <p><span>Language:</span> ${Object.values(country.languages).join(', ')}</p> 
      </div>`; 
} 

function renderCountries(countries) {
  clearData();
  countries.map(country => {
    const countryItem = `
      <li>
        <img src = "${country.flags.svg}" alt = Flag of"${country.name.official} ">
        <span>${country.name.official}</span>
      </li>`; 
    refs.countriesList.insertAdjacentHTML('beforeend', countryItem);
  }
);}

//----------------------------------------

refs.searchBox.addEventListener('input', debounce(searchAction, DEBOUNCE_DELAY));  // подключаем обработчик ожидания ввода