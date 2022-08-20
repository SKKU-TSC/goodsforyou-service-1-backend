const mongoose = require('mongoose');
const { itemCorpusSchema } = require('./itemCorpus');

const featureCorpusSchema = new mongoose.Schema({
  featureName: {
    type: String,
    required: true,
    unique: true,
  },
  defaultItems: {
    type: [itemCorpusSchema],
  },
  //vector: 백분율
  extractedItems: {
    type: [{ vector: Number, item: itemCorpusSchema }],
  },
});

const FeatureCorpus = mongoose.model('FeatureCorpus', featureCorpusSchema);
module.exports = FeatureCorpus;
