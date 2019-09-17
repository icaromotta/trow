var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var Store = mongoose.model("Store");

router.post('/create', (req, res) => {
    let store = new Store({
        name: req.body.name,
        type: req.body.type,
        address: req.body.address,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        lat: req.body.lat,
        lng: req.body.lng,
        hours: req.body.hours
    });

    store.save((err) => {
        if (err) return handleError(err);
        res.send(store);
    });
});
router.get('/list', (req, res) => {});
router.get('/:id', (req, res) => {});
router.put('/update/:id', (req, res) => {});
router.delete('/delete/:id', (req, res) => {});

module.exports = router;