function getRandomCountries(mergedData) {
  const independentCountries = mergedData.filter(country => {
    const restCountriesInfo = country.restCountriesInfo;
    return restCountriesInfo && (
      restCountriesInfo.independent === true ||
      restCountriesInfo.name.common ==="Palestine" ||
      restCountriesInfo.name.common === "Kosovo" ||
      restCountriesInfo.name.common === "Taiwan"
    ) && restCountriesInfo.borders.length !== 0;
  });
  
  console.log(independentCountries);
  
  const randomCountries = [];
  while (randomCountries.length < 2) {
    const randomIndex = Math.floor(Math.random() * independentCountries.length);
    const randomCountry = independentCountries[randomIndex];
  
    if (randomCountry && randomCountry.properties && randomCountry.properties.name) {
      if (!randomCountries.includes(randomCountry.properties.name)) {
        randomCountries.push(randomCountry.properties.name);
      }
    }
  }
  
  return randomCountries;  
}

export { getRandomCountries };