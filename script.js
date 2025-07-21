const countriesContainer = document.querySelector('.countries-container')
const filterByRegion = document.querySelector('.filter-by-region')
const searchInput = document.querySelector('.search-container input')
const themeChanger = document.querySelector('.theme-changer')

let allCountriesData

fetch(
  'https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region#'
)
  .then((res) => res.json())
  .then((data) => {
    renderCountries(data)
    allCountriesData = data
  })

filterByRegion.addEventListener('change', (e) => {
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then((data) => {
      renderCountries(data)
    })
})

function renderCountries(data) {
  countriesContainer.innerHTML = ''
  data.forEach((country) => {
    //   console.log(country)
    const countryCard = document.createElement('a')
    countryCard.href = `/country.html?name=${country.name.common}`
    countryCard.classList.add('country-card')
    const cardHtml = `
         <img src="${country.flags.svg}" alt="${country.name.common} flag" />
         <div class="card-text">
           <h3 class="card-title">${country.name.common}</h3>
           <p><b>Population: </b>${country.population.toLocaleString(
             'en-In'
           )}</p>
           <p><b>Region: </b>${country.region}</p>
           <p><b>Capital: </b>${country.capital?.[0]}</p>
          </div>`
    countryCard.innerHTML = cardHtml
    countriesContainer.append(countryCard)
  })
}

searchInput.addEventListener('input', (e) => {
  const filteredCountries = allCountriesData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  )
  renderCountries(filteredCountries)
})

themeChanger.addEventListener('click', () => {
  document.body.classList.toggle('dark')
})
