import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import * as path from "path";
import customerRouter from "./src/router/customer.router";
import appRoot from "app-root-path";

const PORT = 8000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

const DB_URL = 'mongodb://localhost:27017/ngocminh'

mongoose.connect(DB_URL).then(() => {
    console.log('Connected')
}).catch(err => {
    err.message = 'Error connecting to MongoDB'
})
app.use('/customer', customerRouter)

app.listen(PORT, function(){
    console.log('http://localhost:'+PORT)
})
