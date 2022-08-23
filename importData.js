require('dotenv').config();
const fs = require('fs');
const mongoose = require('mongoose');
const { ItemCorpus } = require('./models/itemCorpus');
const FeatureCorpus = require('./models/featureCorpus');

//몽고디비 연결
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log('Connected to mongodb'))
  .catch(() => console.log('mongodb connection failed'));

//READ JSON FILES
let featureCorpusData = JSON.parse(
  fs.readFileSync(`${__dirname}/data/featureCorpus.json`, 'utf8')
);

const itemCorpusData = JSON.parse(
  fs.readFileSync(`${__dirname}/data/itemCorpus.json`, 'utf8')
);

featureCorpusData.forEach((feature) => {
  delete feature.extractedItems;
});

//IMPORT DATA INTO DATABASE
const importItemData = async () => {
  try {
    await ItemCorpus.create(itemCorpusData);
    console.log('Items successfully imported');
  } catch (err) {
    console.log(err);
  }
};

const importFeatureData = async () => {
  try {
    await FeatureCorpus.create(featureCorpusData);
    console.log('Features successfully imported');
  } catch (err) {
    console.log(err);
  }
};

//DELETE ALL DATA FROM COLLECTION
const deleteItemData = async () => {
  try {
    await ItemCorpus.deleteMany(); //collection에 있는 모든 document를 삭제한다.
    console.log('item successfully deleted');
  } catch (err) {
    console.log(err);
  }
};

const deleteFeatureData = async () => {
  try {
    await FeatureCorpus.deleteMany(); //collection에 있는 모든 document를 삭제한다.
    console.log('feature successfully deleted');
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === '--importItem') importItemData();
if (process.argv[2] === '--importFeature') importFeatureData();
if (process.argv[2] === '--deleteItem') deleteItemData();
if (process.argv[2] === '--deleteFeature') deleteFeatureData();
