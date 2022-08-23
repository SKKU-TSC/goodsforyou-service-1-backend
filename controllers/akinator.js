const FeatureCorpus = require('../models/featureCorpus');

//['견과류', ['(검지보다)작다', 1], ['한국이름이다', 0]];

const getResult = async (req, res) => {
  try {
    const options = req.body.options;
    const rootFeature = await FeatureCorpus.findOne({
      featureName: options[0],
    });
    let usingItems = [...rootFeature.defaultItems];
    if (options.length < 1) {
      res.status(400).json({
        status: 'fail',
        message: 'option 없이는 추천할 수 없습니다.',
      });
    } else {
      for (let i = 1; i < options.length; i++) {
        const feature = await FeatureCorpus.findOne({
          featureName: options[i][0],
        });
        if (options[i][1]) {
          usingItems = usingItems.filter((using) => {
            let isPassed = false;
            feature.defaultItems.forEach((dItem) => {
              if (using.itemName === dItem.itemName) {
                isPassed = true;
              }
            });
            return isPassed;
          });
        } else {
          usingItems = usingItems.filter((using) => {
            let isPassed = true;
            feature.defaultItems.forEach((dItem) => {
              if (using.itemName === dItem.itemName) {
                isPassed = false;
              }
            });
            return isPassed;
          });
        }
      }
      res.status(200).json({ status: 'success', usingItems });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: 'fail', err });
  }
};

module.exports = { getResult };
