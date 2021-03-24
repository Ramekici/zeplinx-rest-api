'use strict';
const productData = require('../data')
const validateProductsInput = require('../validation/validation');

exports.fetchProducts = async (req, res, next) => {

    try {
        const products = await productData.getProducts();
        res.status(201).json(products);
    } catch (err) {
        res.status(401).json(err);
    }

}

exports.fetchProductById = async (req, res, next) => {

    try {
        const id = req.params.productId;
        const product = await productData.getProductById(id);
        res.status(201).json(product);
    } catch (err) {
        res.status(401).json(err.message);
    }

}


exports.addProduct = async (req, res, next) => {

    try {
        const { errors, isValid } = validateProductsInput(req.body);
        if (!isValid) {
            return res.status(401).json(errors);
        }
        const name = req.body.ProductName;
        const desc = req.body.ProductDescription;
        const product = await productData.addProduct({ name, desc });
        res.status(201).json(product);

    } catch (err) {
        res.status(401).json(err.message);
    }
}

exports.deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.deleteId;
        const info = await productData.deleteProduct(id);
        if (info[0] === 0) {
            return res.status(401).json({ message: "Böyle bir ürün bulunamamıştır." });
        }
        res.status(201).json({ message: "Ürün silinmiştir." });
    } catch (err) {
        res.status(401).json(err.message);
    }

}
exports.updateProduct = async (req, res, next) => {

    try {
        const { errors, isValid } = validateProductsInput(req.body);
        if (!isValid) {
            return res.status(401).json(errors);
        }
        const id = req.params.updateId;
        const name = req.body.ProductName;
        const desc = req.body.ProductDescription;
        const info = await productData.updateProduct({ name, desc }, id);
        if (info[0] === 0) {
            return res.status(401).json({ message: "Ürün güncellenememiştir." });
        }
        res.status(201).json({ message: "Ürün güncellenmiştir" });

    } catch (err) {
        res.status(401).json(err.message);
    }

}