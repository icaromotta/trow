var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
var Banner = mongoose.model("Banner");

/* POST banners */
router.post('/create', (req, res, next) => {
  let banner = new Banner({ 
    title:  req.body.title,
    description: req.body.description,
    bannerImage: req.body.bannerImage
  });
  banner.save((err) => {
    if (err) return handleError(err);
    res.send({ok: true})
  });
});
/* GET banners */
router.get('/list', (req, res, next) => {
  Banner.find({}, (err, banners) => {
    if (err) return handleError(err);
    res.send(banners);
  });
});
/* DELETE banner */
router.delete('/delete/:id', (req, res, next) => {
  Banner.deleteOne({_id: req.params.id}, (err) => {
    if (err) return handleError(err);
    res.send({ok: true})
  });
}); 
/* PUT */
router.put('/update/:id', (req, res, next) => {
  let banner = {
    title: req.body.title,
    description: req.body.description,
    bannerImage: req.body.bannerImage
  }
  Banner.findOneAndUpdate({_id: req.params.id}, banner, (err, banner) => {
    if (err) return handleError(err);
    banner.save(banner)
    res.send({
      ok: true
    })
  });
});
/* GET banner by id */
router.get('/:id', (req, res, next) => {
  if (!req.params.id) res.status(400).send({ok: false})
  Banner.findById({_id: req.params.id}, (err, banner) => {
    res.status(200).send(banner)
  })
});

module.exports = router;
