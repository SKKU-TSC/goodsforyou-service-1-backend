require('dotenv').config();
const fs = require('fs');
const mongoose = require('mongoose');
const FeatureCorpus = require('./models/featureCorpus');

const USING_WORD = process.argv[2];

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Connected to mongodb'))
  .catch(() => console.log('mongodb connection failed'));

//READ JSON FILES
let extractedData = JSON.parse(
  fs.readFileSync(`${__dirname}/data/extractedItems/${USING_WORD}.json`, 'utf8')
);

extractedData.forEach((feature) => {
  delete feature.defaultItems;
});

const importData = () => {
  try {
    extractedData.forEach(async (feature) => {
      const oldFeature = await FeatureCorpus.findOne({
        featureName: feature.featureName,
      });
      if (oldFeature) {
        oldFeature.extractedItems = [
          ...oldFeature.extractedItems,
          ...feature.extractedItems,
        ];
        oldFeature.save();
      } else {
        await FeatureCorpus.create(feature);
      }
    });
    console.log('data uploaded successfully');
  } catch (error) {
    console.log(error);
  }
};

importData();
