const FeatureCorpus = require('../../models/featureCorpus');

const matchFeatures = async (searchingWord) => {
  const features = await FeatureCorpus.find({});
  const searchingFeatures = await features.filter(
    (feature) => searchingWord.indexOf(feature) >= 0
  );
  let usingItems = [];

  //usingFeatures를 뽑아내는 알고리즘 실행
  await searchingFeatures.forEach((feature) => {
    const newItems = feature.extractedItems
      .sort((item) => -item.vector) //벡터로 내림차순 정렬
      .slice(0, 8);
    usingItems.push(...newItems);
  });

  usingItems = await usingItems.sort((item) => -item.vector).slice(0, 8);
  return usingItems;
};

module.exports = matchFeatures;
