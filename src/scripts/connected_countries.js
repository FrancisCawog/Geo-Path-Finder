function findConnection(mergedData, startCountryName, endCountryName) {
  const startCountry = mergedData.find(country => country.restCountriesInfo && (country.restCountriesInfo.name.common || country.restCountriesInfo.name.official) === startCountryName);
  const endCountry = mergedData.find(country => country.restCountriesInfo && (country.restCountriesInfo.name.common || country.restCountriesInfo.name.official) === endCountryName);

  if (!startCountry || !endCountry) {
    return false;
  }

  const visited = new Set();
  const queue = [startCountry];

  while (queue.length > 0) {
    const currentCountry = queue.shift();
    visited.add(currentCountry.restCountriesInfo.cca3);
    if (currentCountry.restCountriesInfo.cca3 === endCountry.restCountriesInfo.cca3) {
      return true;
    }

    const borderingCountries = getBorderingCountries(mergedData, currentCountry);
    for (const border of borderingCountries) {
      if (border && !visited.has(border.restCountriesInfo.cca3)) {
        queue.push(border);
      }
    }
  }

  return false;
}

function getBorderingCountries(mergedData, currentCountry) {
  return (currentCountry.restCountriesInfo?.borders || []).map(borderCca3 => {
    return mergedData.find(country => country.restCountriesInfo?.cca3 === borderCca3);
  });
}

export { findConnection };
