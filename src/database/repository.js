const fs = require('fs/promises');


async function getProductsFromDb() {
    try {
        const products = JSON.parse(await fs.readFile('./src/database/products.json'));
        return products
    } catch (error) {
        console.log(error.message);
        return undefined
    }
}

async function getSalesFromDb() {
    try {
        const sales = JSON.parse(await fs.readFile('./src/database/sales.json'));
        return sales;
    } catch (error) {
        console.log(error.message);
        return undefined
    }
}

const registerSale = async (saleData) => {
    const { product_id, amount } = saleData;
    if (!product_id || !amount) return false;
    const product = await getProductFromDb(product_id);
    if (!product) return false;

    const { id, nome: name, valor: value } = product;


    const sale = {
        product: { id, name, value }, amount
    }


    try {
        const salesDb = await getSalesFromDb()
        if (!salesDb) return
        salesDb.push(sale);

        const stringfiedDb = JSON.stringify(salesDb);
        await fs.writeFile('./src/database/sales.json', stringfiedDb);
        return sale;

    } catch (error) {
        console.log(error.message);
        return undefined
    }


}

async function getProductFromDb(product_id) {
    const products = await getProductsFromDb();
    if (!products) return
    const product = products.find(product => product.id === +product_id);
    return product
}

module.exports = {
    getProductsFromDb,
    getProductFromDb,
    getSalesFromDb,
    registerSale

}