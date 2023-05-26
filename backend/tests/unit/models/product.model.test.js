const { expect } = require('chai');
const sinon = require('sinon');
const { productModel } = require('../../../src/models');
const { Products } = require('./Mock/product.model.mock');
const connection = require('../../../src/models/connection');

describe('Testes da camada  controller product', function () {
    it('Lista todos produtos ', async function () {
      sinon.stub(connection, 'execute').resolves([Products]);
  
      const result = await productModel.getAll();
  
      expect(result).to.deep.equal(Products);
    });
  
    it('Recupera um item da lista de produtos pelo id', async function () {
      sinon.stub(connection, 'execute').resolves([[Products[0]]]);
  
      const result = await productModel.getById(1);
  
      expect(result).to.deep.equal(Products[0]);
    });
  afterEach(function () {
      sinon.restore();
    });
  });