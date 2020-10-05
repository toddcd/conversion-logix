const parse = require('csv-parse');
const fs = require('fs');

const BigmacService = {
    getPricing() {
        return new Promise((resolve, reject) =>{
            try {
                const bigMacData = [];
                fs.createReadStream(__dirname +`../../../src/data/big-mac-index.csv`)
                    .pipe(
                        parse({delimiter: ','})
                    )
                    .on('data', (dataRow)=>{
                        bigMacData.push(dataRow)
                    })
                    .on('end', ()=>{
                        const countiesPricing = bigMacData.reduce((countries, country) => {
                            let date = country[1]
                            if(date === "2016-01-01"){
                                let key = country[0];
                                let data =  {
                                    localPrice: country[2],
                                    dollarEx: country[3],
                                    dollarPrice: country[4],
                                    dollarPpp: country[5],
                                    dollarValuation: country[6],
                                }
                                countries[key] = data
                            }
                            return countries
                        } , {});
                        resolve(countiesPricing);
                    })
            }catch (e) {
                reject(e)
            }
        })
    },
};

module.exports = BigmacService;