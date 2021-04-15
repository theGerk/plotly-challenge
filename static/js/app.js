console.log('loaded app.js');

d3.json('../../samples.json').then((importedData) => {
    console.log(importedData);
});