const { getProductsFromDb, registerSale } = require("../database/repository")

const getAllProducts = async (req, res) => {
    try {
        const products = await getProductsFromDb();
        if (!products) return res.status(500).json({ message: "Something went wrong when accessing the database" });

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const postSale = async (req, res) => {
    const { product_id, amount } = req.body;
    if (!product_id || !amount) return res.status(400).json({ message: "Please inform product_id and amount" });
    if (Object.keys(req.body).length > 2) return res.status(400).json({ message: "You may inform only one sale per request" });

    const sale = { product_id, amount };
    const response = await registerSale(sale);

    if (!response) return res.status(500).json({ message: "Something went wrong when registering the sale" });

    return res.status(201).json(response);
}

module.exports = {
    getAllProducts,
    postSale

}