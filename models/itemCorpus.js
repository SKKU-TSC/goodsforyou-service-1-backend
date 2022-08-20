const mongoose = require('mongoose');

const itemCorpusSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
    unique: true,
  },
});

const ItemCorpus = mongoose.model('ItemCorpus', itemCorpusSchema);
module.exports = ItemCorpus;
module.exports = {
  itemCorpusSchema: itemCorpusSchema,
};
