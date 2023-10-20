async function merge() {
  return Promise.all([
    fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-10m.json').then(res => res.json()),
    fetch('https://restcountries.com/v3.1/all?fields=name,ccn3,cca3,borders,independent').then(res => res.json())
  ])
  .then(([worldAtlasData, restCountriesData]) => {
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
  })
}

export default merge;
