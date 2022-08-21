const FeatureCorpus = require('../models/featureCorpus');

const addItemToFeature = async (req, res) => {
  const feature = await FeatureCorpus.findOne({
    featureName: req.body.featureName,
  });
  if (req.body.addType === 'defaultItems') {
    feature.defaultItems.push(req.body.item);
  } else {
    feature.extractedItems.push(req.body.item);
  }
  feature
    .save()
    .then(() =>
      res.status(200).json({
        status: 'success',
        message: `${req.body.item} added`,
      })
    )
    .catch((error) =>
      res.status(400).json({
        status: 'fail',
        error,
      })
    );
};

const createFeature = (req, res) => {
  const feature = new FeatureCorpus(req.body);
  feature
    .save()
    .then(() =>
      res.status(200).json({
        status: 'success',
        message: 'created success',
      })
    )
    .catch((error) =>
      res.status(400).json({
        status: 'fail',
        error,
      })
    );
};
module.exports = {
  addItemsToFeature,
  createFeature,
};
