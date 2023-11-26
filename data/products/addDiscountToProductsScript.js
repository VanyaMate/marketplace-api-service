import fs from 'fs';


fs.readFile('products_1.json', {}, (err: any, data: any) => {
    console.log(data.length);
});