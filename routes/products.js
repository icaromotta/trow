var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var Product = mongoose.model("Product");

router.post('/create', (req, res) => {
    let product = new Product({
        name: req.params.name,
        type: req.params.type,
        price: req.params.price,
        upc: req.params.uqc,
        shipping: req.params.shipping,
        description: req.params.description,
        manufacturer: req.params.manufacturer,
        model: req.params.model,
        url: req.params.url,
        image: req.params.image
    });

    product.save((err) => {
        if (err) return handleError(err);
        res.send({ok: true});
    });
});
router.get('/list', (req, res) => {
    Product.find({}, (err, products) => {
        if (err) return handleError(err);
        res.send(products);
    })
});
router.get('/product/:id', (req, res) => {
    if(!req.params.id) res.status(400).send({ok: false});
    Product.findById({_id: req.params.id}, (err, product) => {
        res.status(200).send(product);
    })
});
router.put('/update/:id', (req, res) => {
    let product = {
        name: req.params.name,
        type: req.params.type,
        price: req.params.price,
        upc: req.params.uqc,
        shipping: req.params.shipping,
        description: req.params.description,
        manufacturer: req.params.manufacturer,
        model: req.params.model,
        url: req.params.url,
        image: req.params.image
    }
    Product.findOneAndUpdate({_id: req.params.id}, product, (err, product) => {
        if (err) return handleError(err);
        product.save(product);
        res.send({ok: "true"});
    })
});
router.delete('/delete/:id', (req, res) => {
    Product.findOneAndDelete({_id: req.params.id}, (err, product) => {
        if (!product) return res.status(400).send({message: "Not Found"});
        Product.deleteOne({_id: req.params.id}, (err) => {
            if (err) return handleError(err);
            res.send({ok: true})
        })
    })
})

module.exports = router;
