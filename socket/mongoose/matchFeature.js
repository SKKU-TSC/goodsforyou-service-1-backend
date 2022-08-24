const FeatureCorpus = require('../../models/featureCorpus');

const matchFeatures = async (searchingWord) => {
  const features = await FeatureCorpus.find({});
  let searchingFeatures = await features.filter(
    (feature) => feature.featureName.indexOf(searchingWord) >= 0
  );
  let usingItems = [];

  //usingFeatures를 뽑아내는 알고리즘 실행
  await searchingFeatures.forEach((feature) => {
    const newItems = feature.extractedItems
      .sort((a, b) => {
        if (a.vector < b.vector) {
          return 1;
        } else {
          return -1;
        }
      }) //벡터로 내림차순 정렬
      .slice(0, 8);
    usingItems.push(...newItems);
  });

  usingItems = await usingItems
    .sort((a, b) => {
      if (a.vector < b.vector) {
        return 1;
      } else {
        return -1;
      }
    })
    .slice(0, 8);

  return usingItems;
};

module.exports = matchFeatures;
