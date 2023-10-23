export function doesPathExistBFS(mergedData, guessedCountries) {
    const startCountryName = guessedCountries[0];
    const endCountryName = guessedCountries[1];

    const startCountry = mergedData.find(country => 
        country.restCountriesInfo && 
        (country.restCountriesInfo.name.common || country.restCountriesInfo.name.official) === startCountryName
    );
    
    const endCountry = mergedData.find(country =>
        country.restCountriesInfo && 
        (country.restCountriesInfo.name.common || country.restCountriesInfo.name.official) === endCountryName
    );

    const queue = [startCountry.restCountriesInfo.cca3];
    const visited = new Set();

    while (queue.length > 0) {    
        const currentCountryCca3 = queue.shift();

        if (currentCountryCca3 === endCountry.restCountriesInfo.cca3) {
            return true;
        }

        visited.add(currentCountryCca3);

        const currentCountry = mergedData.find(country => 
            country.restCountriesInfo && country.restCountriesInfo.cca3 === currentCountryCca3
        );
        
        const borderingCountries = (currentCountry.restCountriesInfo?.borders || []).filter(borderCca3 => !visited.has(borderCca3));

        borderingCountries.forEach(borderCca3 => {
            const country = mergedData.find(country => 
                country.restCountriesInfo && country.restCountriesInfo.cca3 === borderCca3
            );
            if (country && guessedCountries.includes(country.restCountriesInfo.name.common || country.restCountriesInfo.name.official)) {
                queue.push(borderCca3);
            }
        });
    }

    return false;
}
