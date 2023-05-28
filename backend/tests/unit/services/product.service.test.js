const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const { products } = require('./Mock/product.service.mock');

describe('Testa a camada service de produto', function () {
  describe('Lista todos os peodutos', function () {
    it('Retorna a lista de produtos', async function () {
      sinon.stub(productModel, 'findAll').resolves(products);

      const result = await productService.findAll();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(products);
    });
  });

  describe('Lista  um unico produto', function () {
    it('Retorna um erro caso o produto não exista', async function () {
      sinon.stub(productModel, 'findById').resolves(undefined);

      const result = await productService.findById(999);
      expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
      expect(result.message).to.deep.equal('Product not found');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});