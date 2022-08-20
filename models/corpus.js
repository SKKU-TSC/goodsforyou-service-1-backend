const mongoose = require('mongoose');

const corpusSchema = new mongoose.Schema({
  corpusName: {
    type: 'string',
    required: true,
    unique: true,
    description: 'corpusname is required and unique',
  },
  corpusArray: {
    type: [{ point: Number, keyword: String }],
    required: true,
    corpusArray: 'corpusArray is required',
  },
});

const Corpus = mongoose.model('Corpus', corpusSchema);
module.exports = Corpus;
