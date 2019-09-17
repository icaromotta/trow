var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var Category = mongoose.model("Category");

router.post('/create', (req, res) => {
    let category = new Category({
        name: req.body.name
    });

    category.save((err) => {
        if (err) return handleError(err);
        res.status(201).send(category); 
    });
});

router.get('/list', (req, res) => {
    Category.find({}, (err, categories) => {
        if (err) return handleError(err);
        res.status(200).send(categories);
    });
});

router.get('/:id', (req, res) => {
    if(!req.params.id) res.status(400).send({ok: false});
    Category.findById({_id: req.params.id}, (err, category) => {
        if(!category) return res.send({message: 'Empty'});
        res.status(200).send(category);      
    })
});

router.put('/update/:id', (req, res) => {
    let category = {
        name: req.body.name
    }
    Category.findByIdAndUpdate({_id: req.params.id}, category, (err, category) => {
        if (err) return handleError(err);
        if (!category) return res.status(204).send({message: 'no content'});
        category.save(category);
        res.send(category);
    })
});

router.delete('/delete/:id', (req, res) => {
    Category.findOneAndDelete({_id: req.params.id}, (err, category) => {
        if (!category) return res.status(400).send({message: "Not Found"});
        Category.deleteOne({_id: req.params.id}, (err) => {
            if (err) return handleError(err);
            res.send({ok: remove})
        })
    })
});

module.exports = router;