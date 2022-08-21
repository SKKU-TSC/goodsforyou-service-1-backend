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
    default: [],
  },
  //vector: 백분율
  extractedItems: {
    type: [{ vector: Number, item: itemCorpusSchema }],
    default: [],
  },
});

const FeatureCorpus = mongoose.model('FeatureCorpus', featureCorpusSchema);
module.exports = FeatureCorpus;
