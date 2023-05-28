const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { products } = require('./Mock/product.model.mock');

describe('Testes de unidade do model product', function () {
  it(' lista todos  produtos', async function () {
    sinon.stub(connection, 'execute').resolves([products]);

    const result = await productModel.findAll();

    expect(result).to.deep.equal(products);
  });

  afterEach(function () {
    sinon.restore();
  });
});