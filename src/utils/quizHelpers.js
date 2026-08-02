export function shuffleArray(items) {
    const shuffled = [...items];

    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const randomIndex = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[randomIndex]] = [
            shuffled[randomIndex],
            shuffled[i]
        ];
    }

    return shuffled;
}

export function createQuestion(countries, optionCount = 4) {
    const correctCountry =
        countries[Math.floor(Math.random() * countries.length)];

    const incorrectCountries = shuffleArray(
        countries.filter(function (country) {
            return country.name !== correctCountry.name;
        })
    ).slice(0, optionCount - 1);

    const options = shuffleArray([
        correctCountry,
        ...incorrectCountries,
    ]);

    return {
        correctCountry,
        options,
    };
}

export function createGameSession(
    countries,
    questionCount = 10,
    optionCount = 4
) {
    const selectedCountries = shuffleArray(countries).slice(
        0,
        Math.min(questionCount, countries.length)
    );

    return selectedCountries.map(function (correctCountry) {
        const incorrectCountries = shuffleArray(
            countries.filter(function (country) {
                return country.name !== correctCountry.name;
            })
        ).slice(0, optionCount - 1);

        return {
            correctCountry,
            options: shuffleArray([
                correctCountry,
                ...incorrectCountries,
            ]),
        };
    });
}