import Subscription from '../models/subscription.js'

class SubscriptionController {
    static post = async(req, res) => {
        const { email, hidden } = req.body
        const subsObj = new Subscription()
        subsObj.email = email
        subsObj.hidden = hidden
        await subsObj.save().then((docs) => {
            res.send({ status: 1, data: docs, msg: "Thanks for subscribe." })
        }).catch((error) => {
            res.send({ status: 0, msg: "Already subscribed." })
        })
    }
}
export default SubscriptionController;