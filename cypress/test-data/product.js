  const operations = [
    // การเพิ่มสินค้า
    { type: 'add', method: 'addBackpack', expectedCount: '1' },
    { type: 'add', method: 'addBikelike', expectedCount: '2' },
    { type: 'add', method: 'addBoltTshirt', expectedCount: '3' },
    { type: 'add', method: 'addFleeceJacket', expectedCount: '4' },
    { type: 'add', method: 'addOnesie', expectedCount: '5' },
    { type: 'add', method: 'addRedTshirt', expectedCount: '6' },
    
    // การลบสินค้า
    { type: 'remove', method: 'removeBackpack', expectedCount: '5' },
    { type: 'remove', method: 'removeBikelike', expectedCount: '4' },
    { type: 'remove', method: 'removeBoltTshirt', expectedCount: '3' },
    { type: 'remove', method: 'removeFleeceJacket', expectedCount: '2' },
    { type: 'remove', method: 'removeOnesie', expectedCount: '1' },
    { type: 'remove', method: 'removeRedTshirt', expectedCount: '' }
  ];

  module.exports = {
    operations,
  };