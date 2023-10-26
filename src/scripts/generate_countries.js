function getRandomCountries(mergedData) {
  const independentCountries = mergedData.filter(country => {
    const restCountriesInfo = country.restCountriesInfo;
    return restCountriesInfo?.independent === true && restCountriesInfo.borders.length > 0;
  });

  const randomCountries = [];

  while (randomCountries.length < 2) {
    const randomIndex = Math.floor(Math.random() * independentCountries.length);
    const randomCountry = independentCountries[randomIndex];

    if (randomCountry && randomCountry.properties && randomCountry.properties.name) {
      randomCountries.push(randomCountry.properties.name);
      independentCountries.splice(randomIndex, 1);
    }
  }

  return randomCountries;
}

function countryList(mergedData) {
  const independentCountries = mergedData.filter(country => {
    const restCountriesInfo = country.restCountriesInfo;
    return restCountriesInfo?.independent === true && restCountriesInfo.borders.length > 0;
  });
  return (independentCountries.map(country => country.restCountriesInfo.name.common));
}

export { getRandomCountries, countryList };