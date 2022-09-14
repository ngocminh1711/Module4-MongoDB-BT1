import {Router} from "express";
import {Customer} from '../schemas/customer.model'
import multer from "multer";

const upload = multer();

const customerRouter = Router();


customerRouter.get('/create', (req, res, next) => {
    res.render('customerCreate')
})
customerRouter.post('/create', upload.none(), async (req, res, next) => {
    try {
        let data = req.body;
        let newCustomer = new Customer(data)
        let customer = await newCustomer.save();
        if (customer) {
            res.status(200).json({
                message: 'Create Sucessfully'
            });
        } else {
            res.status(503).json({
                message: 'Error'
            });
        }
    } catch (err) {
        res.status(503).json({
            message: err.message
        });
    }
})
customerRouter.get('/list', async (req, res) => {
    const customers = await Customer.find()
    res.render('customerList', {customers: customers})
    customerRouter.delete('/delete/:id', async (req, res) => {
        try {
            const customer = await Customer.findOne({_id: req.params.id})


            if (customer) {
                customer.remove();
                res.status(200).json({
                    message: 'Customer deleted successfully'
                })
            } else {
                res.status(503).json({
                    message: 'Error'
                })
            }
        } catch (err) {
            res.status(500).json({
                message: err.message
            })
        }
    })
})
customerRouter.get('/update/:id', async (req, res) => {
        res.render('customerUpdate')

})
export default customerRouter;


