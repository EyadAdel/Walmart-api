const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const customerRoutes = require('./routes/customer');
const productRoutes = require('./routes/products');
const reviewsRoutes = require('./routes/reviews');
const adminRoutes = require('./routes/admin');
const sellerRoutes = require('./routes/seller');
const departmentsRoutes = require('./routes/deprtments');
const orderRoutes = require('./routes/orders');

const exp = require('constants');
const app = express();

dotenv.config(); //to read .env file and parse the contents, assign it to process.env, and return an Object with a parsed key containing the loaded content.
 
mongoose.connect(process.env.MONGO_URL).then(() => console.log("DBconnection Successfull")).catch((err) => console.log(err))
//mongoose.connect('mongodb+srv://walmart:1111@cluster0.4yzfnh4.mongodb.net/walmart').then(() => console.log("DBconnection Successfull")).catch((err) => console.log(err))

//Middlewares
app.use(express.json());


app.use('/customer', customerRoutes);
app.use('/product', productRoutes );
app.use('/reviews', reviewsRoutes );
app.use("/admin", adminRoutes);
app.use("/seller", sellerRoutes);
app.use('/department', departmentsRoutes);
app.use('/order', orderRoutes);


//Backend Server || Port
app.listen(5000, () => {
    console.log('Backend Server is running!')
})