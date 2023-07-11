import Blog from '../models/blog.js'

class BlogController {
    static post = async(req, res) => {
        const { uid, title, description, image, hidden } = req.body
        const blogObj = new Blog()
        blogObj.uid = uid
        blogObj.title = title
        blogObj.description = description
        blogObj.image = image
        blogObj.hidden = hidden
        await blogObj.save().then((docs) => {
            res.send(docs)
        }).catch((error) => {
            res.send({ msg: "Error at the time of insert." })
        })
    }
    static retrieve = async(req, res) => {
        Blog.find().populate('uid').then((docs) => {
            res.send(docs)
        }).catch(() => {
            res.send({ msg: "Error at the time of fetch." })
        })
    }
    static retrieveById = async(req, res) => {
        Blog.find({ _id: req.params.id }).then((docs) => {
            res.send(docs)
        }).catch(() => {
            res.send({ msg: "Error at the time of fetch." })
        })
    }
    static recentblogs = async(req, res) => {
        Blog.find().sort({ inserted_at: "desc" }).limit(3).populate('uid').then((docs) => {
            res.send(docs)
        }).catch(() => {
            res.send({ msg: "Error at the time of fetch." })
        })
    }
}
export default BlogController;