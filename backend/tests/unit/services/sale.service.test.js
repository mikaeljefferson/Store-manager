const { expect } = require('chai');
const sinon = require('sinon');
const { saleService } = require('../../../src/services');
const { saleModel } = require('../../../src/models');
const { sales, saleById, newSale } = require('./Mock/sale.service.mock');

const INVALID_VALUE = 'INVALID_VALUE';
describe('Testes da camada service sale', function () {
  describe('Lista  todas as vendas', function () {
    it('Retorna a lista de vendas', async function () {
      sinon.stub(saleModel, 'findAll').resolves(sales);

      const result = await saleService.findAll();

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(sales);
    });
  });

  describe('Lista vendas por ID', function () {
    it('Retorna uma única venda caso o ID exista', async function () {
      sinon.stub(saleModel, 'findById').resolves(saleById);

      const result = await saleService.findById(1);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal(saleById);
    });
    it('Retorna um erro caso o ID seja inválido', async function () {
      const result = await saleService.findById('a');

      expect(result.type).to.be.equal(INVALID_VALUE);
      expect(result.message).to.deep.equal('"id" must be a number');
    });
    it('Retorna um erro caso a venda não exista', async function () {
      sinon.stub(saleModel, 'findById').resolves([]);

      const result = await saleService.findById(999);

      expect(result.type).to.be.equal('SALE_NOT_FOUND');
      expect(result.message).to.deep.equal('Sale not found');
    });
  });
  it('Testa se cadastrar uma nova sale', async function () {
    sinon.stub(saleModel, 'insertSale').resolves(newSale);
    const result = await saleModel.insertSale();
    expect(result).to.be.deep.equal(newSale);
  });
  describe('Remoção de uma venda', function () {
    it('Retorna sucesso quando deleta uma venda', async function () {
      sinon.stub(saleModel, 'findById').resolves(saleById);
      sinon.stub(saleModel, 'removeSaleById').resolves();

      const result = await saleService.removeSaleById(1);

      expect(result.type).to.be.equal(null);
      expect(result.message).to.deep.equal('');
    });

    it('Retorna um erro caso o ID seja inválido', async function () {
      const result = await saleService.removeSaleById('a');

      expect(result.type).to.be.equal(INVALID_VALUE);
      expect(result.message).to.deep.equal('"id" must be a number');
    });

    it('Retorna um erro caso o ID não exista', async function () {
      sinon.stub(saleModel, 'findById').resolves([]);

      const result = await saleService.removeSaleById(999);

      expect(result.type).to.be.equal('SALE_NOT_FOUND');
      expect(result.message).to.deep.equal('Sale not found');
    });
  });
  afterEach(function () {
    sinon.restore();
  });
});