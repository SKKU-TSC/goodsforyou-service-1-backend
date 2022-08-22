const { ItemCorpus } = require('../../models/itemCorpus');

const matchItems = async (searchingWord) => {
  const searchedItemsWithItem = await ItemCorpus.find({
    itemName: { $regex: `.*${searchingWord}.*` },
  });
  return searchedItemsWithItem.slice(0, 8);
};

module.exports = matchItems;
