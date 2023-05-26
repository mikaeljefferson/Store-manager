const { expect } = require('chai');
const sinon = require('sinon');
const { productService } = require('../../../src/services');
const { productModel } = require('../../../src/models');
const { Products } = require('./Mock/product.service.mock');

describe('Testes da camada  controller product', function () {
  describe('Listagem de todos os produtos', function () {
    it('Retorna todos produtos ', async function () {
      sinon.stub(productModel, 'findAll').resolves(Products);

      const result = await productService.getAll();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(Products);
    });
  });

  describe('Listagem de um único produto', function () {
    it('Retorna um único produto caso o ID exista', async function () {
      sinon.stub(productModel, 'findById').resolves(Products[0]);

      const result = await productService.getById(1);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(Products[0]);
    });
    afterEach(function () {
        sinon.restore();
      });
    });
    });
