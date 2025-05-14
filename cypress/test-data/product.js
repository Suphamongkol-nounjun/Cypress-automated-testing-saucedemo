const addItems = [
  {
    method: 'addBackpack',
    clickMethod: 'clickBackpackProduct',
    expectedUrl: '/inventory-item.html?id=4',
    expectedCount: '1',
  },
  {
    method: 'addBikelike',
    clickMethod: 'clickBikeLightProduct',
    expectedUrl: '/inventory-item.html?id=0',
    expectedCount: '2',
  },
  {
    method: 'addBoltTshirt',
    clickMethod: 'clickBoltTshirtProduct',
    expectedUrl: '/inventory-item.html?id=1',
    expectedCount: '3',
  },
  {
    method: 'addFleeceJacket',
    clickMethod: 'clickFleeceJacketProduct',
    expectedUrl: '/inventory-item.html?id=5',
    expectedCount: '4',
  },
  {
    method: 'addOnesie',
    clickMethod: 'clickOnesieProduct',
    expectedUrl: '/inventory-item.html?id=2',
    expectedCount: '5',
  },
  {
    method: 'addRedTshirt',
    clickMethod: 'clickRedTshirtProduct',
    expectedUrl: '/inventory-item.html?id=3',
    expectedCount: '6',
  },
];


const removeItems = [
  { method: 'removeBackpack', expectedCount: '5' },
  { method: 'removeBikelike', expectedCount: '4' },
  { method: 'removeBoltTshirt', expectedCount: '3' },
  { method: 'removeFleeceJacket', expectedCount: '2' },
  { method: 'removeOnesie', expectedCount: '1' },
  { method: 'removeRedTshirt', expectedCount: '' },
];
  module.exports = {
    addItems,
    removeItems,
    addItemsCount: addItems.length,
    removeItemsCount: removeItems.length,

  };