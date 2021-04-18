const router = require('express').Router();
let Label = require('../models/label.model');

router.route('/').get((req, res) => {
  Label.find()
    .then(labels => res.json(labels))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const label = req.body.label;

  const newLabel = new Label({ label });

  newLabel.save()
    .then(() => res.json('Label added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;