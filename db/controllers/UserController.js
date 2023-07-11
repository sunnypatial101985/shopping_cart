import User from "../models/user.js";
import bcrypt from 'bcrypt'

class UserController {
    static post = async(req, res) => {
        const { name, email, password, mobile, hidden } = req.body
        const saltRound = parseInt(process.env.SALT_ROUND)
        const salt = bcrypt.genSaltSync(saltRound);
        const hash = bcrypt.hashSync(password, salt);
        const userObj = new User()
        userObj.name = name
        userObj.email = email
        userObj.password = hash
        userObj.mobile = mobile
        userObj.hidden = hidden
        await userObj.save().then((docs) => {
            res.send(docs)
        }).catch((error) => {
            res.send({ msg: "Error at the time of insert." })
        })
    }
}
export default UserController;