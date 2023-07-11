import Categorie from "../models/categorie.js";

class CategorieController {
    static post = async(req, res) => {
        const { title, hidden } = req.body
        const catObj = new Categorie()
        catObj.title = title
        catObj.hidden = hidden
        await catObj.save().then((docs) => {
            res.send(docs)
        }).catch((error) => {
            res.send({ msg: "Error at the time of insert." })
        })
    }
    static getCategories = async(req, res) => {
        await Categorie.find().select({ "title": 1, "_id": 1 }).then((docs) => {
            res.send({ status: 1, categories: docs })
        }).catch((error) => {
            res.send({ status: 0, msg: "Error at the time of fetching." })
        })
    }
}
export default CategorieController;