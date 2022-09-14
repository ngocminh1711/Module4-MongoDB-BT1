"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const customer_model_1 = require("../schemas/customer.model");
const multer_1 = __importDefault(require("multer"));
const upload = (0, multer_1.default)();
const customerRouter = (0, express_1.Router)();
customerRouter.get('/create', (req, res, next) => {
    res.render('customerCreate');
});
customerRouter.post('/create', upload.none(), async (req, res, next) => {
    try {
        let data = req.body;
        let newCustomer = new customer_model_1.Customer(data);
        let customer = await newCustomer.save();
        if (customer) {
            res.status(200).json({
                message: 'Create Sucessfully'
            });
        }
        else {
            res.status(503).json({
                message: 'Error'
            });
        }
    }
    catch (err) {
        res.status(503).json({
            message: err.message
        });
    }
});
customerRouter.get('/list', async (req, res) => {
    const customers = await customer_model_1.Customer.find();
    res.render('customerList', { customers: customers });
    customerRouter.delete('/delete/:id', async (req, res) => {
        try {
            const customer = await customer_model_1.Customer.findOne({ _id: req.params.id });
            if (customer) {
                customer.remove();
                res.status(200).json({
                    message: 'Customer deleted successfully'
                });
            }
            else {
                res.status(503).json({
                    message: 'Error'
                });
            }
        }
        catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
    });
});
customerRouter.get('/update/:id', async (req, res) => {
    res.render('customerUpdate');
});
exports.default = customerRouter;
//# sourceMappingURL=customer.router.js.map