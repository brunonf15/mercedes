// helpers.js

const fs = require('fs');

async function getHighestAndLowestPrices(items) {
    let highestPrice = Number.NEGATIVE_INFINITY; // Initialize highest price to negative infinity
    let lowestPrice = Number.POSITIVE_INFINITY; // Initialize lowest price to positive infinity

    for (const item of items) {
        const text = await item.evaluate(el => el.textContent); // Get the text content of the element
        const price = parseFloat(text.replace(/[^\d.]/g, '')); // Extract numeric value from text
        if (!isNaN(price)) { // Check if extracted value is a valid number
            if (price > highestPrice) { // Update highest price if necessary
                highestPrice = price;
            }
            if (price < lowestPrice) { // Update lowest price if necessary
                lowestPrice = price;
            }
        }
    }

    return [highestPrice, lowestPrice];
}

function writePricesToFile(prices) {
    fs.writeFileSync('prices.txt', prices.join('\n'));
}

module.exports = { getHighestAndLowestPrices, writePricesToFile };
