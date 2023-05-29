const { expect } = require('chai');
const sinon = require('sinon');
const { saleService } = require('../../../src/services');
const { saleModel } = require('../../../src/models');
const {
  allSales, saleById } = require('./Mock/sale.service.mock');

describe('Testes da camada service sale', function () {
  describe('Lista  todas as vendas', function () {
    it('Retorna a lista de vendas', async function () {
      sinon.stub(saleModel, 'findAll').resolves(allSales);

      const result = await saleService.findAll();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(allSales);
    });
  });

  describe('Lista vendas por ID', function () {
    it('Retorna uma única venda caso o ID exista', async function () {
      sinon.stub(saleModel, 'findById').resolves(saleById);

      const result = await saleService.findById(1);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(saleById);
    });

    it('Retorna um erro caso a venda não exista', async function () {
      sinon.stub(saleModel, 'findById').resolves([]);

      const result = await saleService.findById(999);

      expect(result.type).to.be.equal('SALE_NOT_FOUND');
      expect(result.message).to.deep.equal('Sale not found');
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});