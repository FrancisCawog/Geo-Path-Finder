async function merge() {
  const worldAtlasData = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json').then(res => res.json());
  const restCountriesData = await fetch('https://restcountries.com/v3.1/all?fields=name,ccn3,cca3,borders,independent').then(res => res.json());

  const countryPropertyMap = {
    "Macedonia": "North Macedonia",
    "S. Sudan": "South Sudan",
    "Côte d'Ivoire": "Ivory Coast",
    "Dominican Rep.": "Dominican Republic",
    "eSwatini": "Eswatini",
    "Bosnia and Herz.": "Bosnia and Herzegovina",
    "Eq. Guinea": "Equatorial Guinea",
    "Dem. Rep. Congo": "Democratic Republic of the Congo",
    "Vatican": "Vatican City",
    "Congo": "Republic of the Congo",
    "Central African Rep.": "Central African Republic",
    // "United States of America": "United States"
  };

  worldAtlasData.objects.countries.geometries.forEach(country => {
    const newName = countryPropertyMap[country.properties.name];
    if (newName) {
      country.properties.name = newName;
    } else if (country.properties.name === "Kosovo") {
      country.id = "383";
    }
  });

  restCountriesData.forEach(country => {
    if (country.name.common === "Kosovo" || country.name.common === "Palestine" || country.name.common === "Taiwan" || country.name.common === "Zambia") {
      country.independent = true;
    }
    if (country.name.common === "Kosovo") {
      country.ccn3 = "383";
    }
    if (country.name.common === "DR Congo") {
    country.name.common = "Democratic Republic of the Congo"; 
    }
    if (country.name.common === "United States") {
      country.name.common = "United States of America"; 
    }
    if (country.name.official === "Republic of Chad") {
      country.name.official = "Chad"; 
    }
  });

  const restCountriesMap = {};
  restCountriesData.forEach(country => {
    restCountriesMap[country.ccn3] = country;
  });

  return worldAtlasData.objects.countries.geometries.map(geometry => {
    const ccn3 = geometry.id;
    if (restCountriesMap[ccn3]) {
      return {
        ...geometry,
        restCountriesInfo: restCountriesMap[ccn3]
      };
    } else {
      return geometry;
    }
  });
}

export default merge;