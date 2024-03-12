const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const placesRoutes = require('./routes/places-routes');
const userRoutes = require('./routes/users-routes');

const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accespt, Authorization'
        )
    next();
})

app.use('/api/places/', placesRoutes);
app.use('/api/users/', userRoutes); 

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route', 404);
    throw error;
})

app.use((error, req, res, next) => {
    if(req.headerSent){
        return next(error);
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occurred!'});
});


mongoose.connect('mongodb+srv://nishita:nishita123@cluster0.dble6bs.mongodb.net/mern?retryWrites=true&w=majority&appName=Cluster0')
.then(()=>{
    app.listen(5000);
})
.catch(()=>{
    console.log(err);
})
