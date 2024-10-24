require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDb = require('./config/db');


const app = express();
app.use(cookieParser());

connectToDb();

app.use(cors());
app.use(express.json());

const productRoute = require('./routers/productRouter');
const categoryRoute = require('./routers/categoryRouter');




app.get('/', (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'it is working'
    });
});
app.use('/api/product', productRoute);
app.use('/api/category', categoryRoute);

app.listen(process.env.PORT || 5000, () => {
    console.log('app is working on 5000');
});