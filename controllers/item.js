const ItemCorpus = require('../models/itemCorpus');

const createItem = (req, res) => {
  const item = new ItemCorpus(req.body);
  item
    .save()
    .then(() =>
      res.status(200).json({
        status: 'success',
        message: 'Item created',
      })
    )
    .catch((error) =>
      res.status(400).json({
        status: 'fail',
        error,
      })
    );
};

module.exports = { createItem };
