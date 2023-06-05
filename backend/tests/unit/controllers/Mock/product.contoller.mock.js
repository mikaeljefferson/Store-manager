const validName = 'ProductX';
const products = [
    {
      id: 1,
      name: 'Martelo de Thor',
    },
    {
      id: 2,
      name: 'Traje de encolhimento',
    },
    {
      id: 3,
      name: 'Escudo do Capitão América',
    },
  ];
  const newProduct = {
    name: validName,
  };
  const updatedProduct = {
    id: 1,
    name: validName,
  };

  module.export = {
products,
newProduct,
updatedProduct,
  };