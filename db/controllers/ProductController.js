import Product from "../models/product.js";

class ProductController {
    static post = async(req, res) => {
        const { title, description, price, disc_price, categorie_id, hidden } = req.body
        const productObj = new Product()
        productObj.title = title
        productObj.description = description
        productObj.categorie_id = categorie_id
            // productObj.image = req.file["filename"]
        productObj.image = req.body.filename
        productObj.price = price
        productObj.disc_price = disc_price
        productObj.hidden = hidden
        await productObj.save().then((docs) => {
            res.send(docs)
        }).catch((error) => {
            res.send({ msg: "Error at the time of insert." })
        })
    }
    static getById = async(req, res) => {
        Product.find({ categorie_id: req.params.id }).select({ "title": 1, "_id": 1, "description": 1, "image": 1, "price": 1, "disc_price": 1 }).then((docs) => {
            res.send({ status: 1, data: docs })
        }).catch((error) => {
            res.send({ status: 0, data: [] })
        })
    }
    static getAll = async(req, res) => {
        Product.find().select({ "title": 1, "_id": 1, "description": 1, "image": 1, "price": 1, "disc_price": 1 }).then((docs) => {
            res.send({ status: 1, data: docs })
        }).catch((error) => {
            res.send({ status: 0, data: [] })
        })
    }
    static getFeatured = async(req, res) => {
        Product.aggregate([{ $sample: { size: 8 } }]).then((docs) => {
            res.send({ status: 1, data: docs })
        }).catch((error) => {
            res.send({ status: 0, data: [] })
        })
    }
}
export default ProductController;