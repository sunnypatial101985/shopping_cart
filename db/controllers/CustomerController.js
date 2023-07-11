import Customer from "../models/customer.js";
import Order_item from "../models/order_item.js";

class CustomerController {
    static post = async(req, res) => {
        const { email, first_name, last_name, address_1, address_2, city, state, country, zipcode, phone, order_total, stripe_payment_id, hidden, items } = req.body
        const customerObj = new Customer()
        customerObj.email = email
        customerObj.first_name = first_name
        customerObj.last_name = last_name
        customerObj.address_1 = address_1
        customerObj.address_2 = address_2
        customerObj.city = city
        customerObj.state = state
        customerObj.country = country
        customerObj.zipcode = zipcode
        customerObj.phone = phone
        customerObj.order_total = order_total
        customerObj.stripe_payment_id = stripe_payment_id
        customerObj.hidden = hidden
        await customerObj.save().then((docs) => {
            let result = CustomerController.insertItems(docs._id, items)
            if (result) {
                res.send({ msg: "done", data: docs })
            } else {
                res.send({ msg: "Error at the time of insert." })
            }
        }).catch((error) => {
            res.send({ msg: "Error at the time of insert." })
        })
    }
    static insertItems = async(custId, itemArr) => {

        let cArr = []
        for (var k = 0; k < itemArr.length; k++) {
            const tObj = { customer_id: custId, product_id: itemArr[k].product_id, product_price: itemArr[k].product_price, quantity: itemArr[k].quantity, final_price: itemArr[k].final_price, hidden: false }
            cArr.push(tObj)
        }
        Order_item.insertMany(cArr).then(function() {
            return true;
        }).catch(function(error) {
            return false;
        });
    }
}
export default CustomerController;