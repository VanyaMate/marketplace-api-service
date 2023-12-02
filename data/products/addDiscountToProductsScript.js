import fs from 'fs';


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

let items = '';
fs.readFile('products_2.json', "utf-8", (err, data) => {
    items = JSON.parse(data);

    const getRandomPrice = function () {
        return getRandomInt(100, 99999);
    }

    const getRandomDiscountPercent = function () {
        return getRandomInt(1, 100);
    }

    const getRandomDiscountFixed = function (price) {
        return getRandomInt(1, price);
    }

    items.forEach((item) => {
        const haveDiscount = getRandomInt(0, 2) * getRandomInt(0, 2) * getRandomInt(0, 2);
        item.price = getRandomPrice();

        if (haveDiscount) {
            item.discountType = (getRandomInt(0, 2) === 0) ? 'fixed' : 'percent';
            if (item.discountType === 'fixed') {
                item.discount = getRandomDiscountFixed(item.price);
            } else {
                item.discount = getRandomDiscountPercent();
            }
        } else {
            item.discount = 0;
            item.discountType = 'fixed';
        }
    })

    fs.writeFile('products_2.json', JSON.stringify(items), "utf-8", () => {
        console.log('finish');
    })
});

