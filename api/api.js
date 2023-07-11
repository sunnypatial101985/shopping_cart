import express from 'express'
import multer from 'multer'
var storage = multer.diskStorage({
    destination: './public/images/',
    filename: function(req, file, cb) {
        let nameArr = file.originalname.split(".");
        cb(null, nameArr[0].trim() + '-' + Date.now() + "." + nameArr[1]);
    }
});
var upload = multer({ storage: storage });
import UserController from '../db/controllers/UserController.js'
import BlogController from '../db/controllers/BlogController.js'
import CategorieController from '../db/controllers/CategorieController.js'
import ProductController from '../db/controllers/ProductController.js'
import CustomerController from '../db/controllers/CustomerController.js';
import SubscriptionController from '../db/controllers/SubscriptionController.js';
import EmailController from '../db/controllers/EmailController.js';
const router = express.Router()

router.post('/user/insert', UserController.post)
router.post('/blog/insert', BlogController.post)
router.post('/categorie/insert', CategorieController.post)
    // router.post('/product/insert', upload.single('uploaded_file'), ProductController.post);
router.post('/product/insert', ProductController.post);
router.get('/blogs', BlogController.retrieve)
router.get('/categories', CategorieController.getCategories)
router.get('/recentblogs', BlogController.recentblogs)
router.get('/blog/detail/:id', BlogController.retrieveById)
router.get('/products', ProductController.getAll);
router.get('/products/feature', ProductController.getFeatured);
router.get('/products/:id', ProductController.getById);
// CUSTOMER DETAIL
router.post('/customer/insert', CustomerController.post);
// SUBSCRIBE EMAIL
router.post('/subscribe/insert', SubscriptionController.post)
    // SEND EMAIL
router.post('/send/email', EmailController.sendContactEmail)
export default router