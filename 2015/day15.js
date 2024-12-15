const calculateHighestCookieScore = (ingredients) => {
    let maxScore = 0;
    for (let i = 0; i <= 100; i++) {
        for (let j = 0; j <= 100 - i; j++) {
            for (let k = 0; k <= 100 - i - j; k++) {
                let l = 100 - i - j - k;
                const quantities = [i, j, k, l];
                let capacity = 0;
                let durability = 0;
                let flavor = 0;
                let texture = 0;
                for (let m = 0; m < ingredients.length; m++) {
                    capacity += quantities[m] * ingredients[m].capacity;
                    durability += quantities[m] * ingredients[m].durability;
                    flavor += quantities[m] * ingredients[m].flavor;
                    texture += quantities[m] * ingredients[m].texture;
                }
                capacity = Math.max(0, capacity);
                durability = Math.max(0, durability);
                flavor = Math.max(0, flavor);
                texture = Math.max(0, texture);
                const score = capacity * durability * flavor * texture;
                maxScore = Math.max(maxScore, score);
            }
        }
    }
    return maxScore;
}
const ingredients = [
    { capacity: 2, durability: 0, flavor: -2, texture: 0, calories: 3 },
    { capacity: 0, durability: 5, flavor: -3, texture: 0, calories: 3 },
    { capacity: 0, durability: 0, flavor: 5, texture: -1, calories: 8 },
    { capacity: 0, durability: -1, flavor: 0, texture: 5, calories: 8 }
];

const highestScore = calculateHighestCookieScore(ingredients);
console.log(highestScore);
