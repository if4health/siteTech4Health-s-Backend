const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const WhiteList = require('../../schema/whitelist');

const { DB_URI, DB_NAME } = process.env;

mongoose.connect(DB_URI, {
    dbName : DB_NAME, 
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => {
    console.log('whiteList - Mongoose Connected to Database')
    console.log('------------------------------------------')

    router.get('/', (req, res) => {
        WhiteList.find()
        .then((results) => {
            res.render('whiteList', { whiteList: results });
        });
    });

    router.get('/:email', (req, res) => {
        WhiteList.find({ "email": req.params.email })
        .then((results) => {
            res.status(200).send(results);
        });
    });

    router.post('/add', (req, res) => {
        const body = new WhiteList({ email: req.body.email });
        try{
            body.save().then(() => {
                res.status(200).redirect('/whiteList');
            });
        } catch(err){
            console.log(err);
            res.status(504).send("error");
        }
    });

    router.delete('/delete/:email', (req, res) => {
        try{
            WhiteList.deleteOne({ email: req.params.email }).then(() => {
                res.status(200).redirect('/')
            });
        } catch(err){
            console.log(err);
            res.status(504).send("error");
        }
    });
});

module.exports = router;
