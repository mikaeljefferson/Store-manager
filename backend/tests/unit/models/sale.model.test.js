const { expect } = require('chai');
const sinon = require('sinon');
const { saleModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { sales, saleById, newSaleProducts } = require('./Mock/sale.model.mock');

describe('Testes da camada sale model', function () {
  it(' lista todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([sales]);

    const result = await saleModel.findAll();

    expect(result).to.deep.equal(sales);
  });

  it(' exiba vendas por ID', async function () {
    sinon.stub(connection, 'execute').resolves([saleById]);

    const result = await saleModel.findById(1);

    expect(result).to.deep.equal(saleById);
  });
  it('Recupera itens da lista de vendas por ID', async function () {
    sinon.stub(connection, 'execute').resolves([saleById]);

    const result = await saleModel.findById(1);

    expect(result).to.deep.equal(saleById);
  });
  it('Remove uma venda', async function () {
    sinon.stub(connection, 'execute').resolves(newSaleProducts);

    const result = await saleModel.removeSaleById(1);

    expect(result[0].affectedRows).to.be.deep.equal(2);
    expect(result[0].changedRows).to.be.deep.equal(2);
  });
  afterEach(function () {
    sinon.restore();
  });
});