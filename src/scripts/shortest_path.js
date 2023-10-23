function shortestPathBFS(mergedData, startCountryName, endCountryName) {
    const startCountry = mergedData.find(country => country.restCountriesInfo && (country.restCountriesInfo.name.common || country.restCountriesInfo.name.official) === startCountryName);
    const endCountry = mergedData.find(country => country.restCountriesInfo && (country.restCountriesInfo.name.common || country.restCountriesInfo.name.official) === endCountryName);

    const queue = [[startCountry]];
    const visited = new Set();

    while (queue.length > 0) {
        const path = queue.shift();
        const currentCountry = path[path.length - 1];

        if (currentCountry.restCountriesInfo.cca3 === endCountry.restCountriesInfo.cca3) {
            return path;
        }

        visited.add(currentCountry.restCountriesInfo.cca3);

        const borderingCountries = getBorderingCountries(mergedData, currentCountry);

        for (const border of borderingCountries) {
            if (border && !visited.has(border.restCountriesInfo.cca3)) {
                const newPath = [...path, border];
                queue.push(newPath);
            }
        }
    }
    return null;
}

function getBorderingCountries(mergedData, currentCountry) {
    return (currentCountry.restCountriesInfo?.borders || []).map(borderCca3 => {
        return mergedData.find(country => country.restCountriesInfo?.cca3 === borderCca3);
    });
}

export { shortestPathBFS };
