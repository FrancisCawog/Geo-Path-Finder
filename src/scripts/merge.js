async function merge() {
  const worldAtlasData = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json').then(res => res.json());
  const restCountriesData = await fetch('https://restcountries.com/v3.1/all?fields=name,ccn3,cca3,borders,independent').then(res => res.json());

  worldAtlasData.objects.countries.geometries.forEach(country => {
    if (country.properties.name === "Macedonia") {
      country.properties.name = "North Macedonia";
    } else if (country.properties.name === "S. Sudan") {
      country.properties.name = "South Sudan";
    } else if (country.properties.name === "Côte d'Ivoire") {
      country.properties.name = "Ivory Coast";
    } else if (country.properties.name === "Dominican Rep.") {
      country.properties.name = "Dominican Republic";
    } else if (country.properties.name === "eSwatini") {
      country.properties.name = "Eswatini";
    } else if (country.properties.name === "Bosnia and Herz.") {
      country.properties.name = "Bosnia and Herzegovina";
    } else if (country.properties.name === "Eq. Guinea") {
      country.properties.name = "Equatorial Guinea";
    } else if (country.properties.name === "Dem. Rep. Congo") {
      country.properties.name = "Democratic Republic of the Congo";
    } else if (country.properties.name === "Vatican") {
      country.properties.name = "Vatican City";
    } else if (country.properties.name === "Congo") {
      country.properties.name = "Republic of the Congo";
    } else if (country.properties.name === "Central African Rep.") {
      country.properties.name = "Central African Republic";
    } else if (country.properties.name === "Kosovo") {
      country.id = "383";
    }
  });

  restCountriesData.forEach(country => {
    if (country.name.common === "Kosovo") {
      country.ccn3 = "383";
      country.independent = true;
    } else if (country.name.common === "Palestine") {
      country.independent = true;
    } else if (country.name.common === "Taiwan") {
      country.independent = true;
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
