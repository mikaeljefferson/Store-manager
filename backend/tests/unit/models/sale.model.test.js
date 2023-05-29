const { expect } = require('chai');
const sinon = require('sinon');
const { saleModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const { sales, saleById } = require('./Mock/sale.model.mock');

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
  afterEach(function () {
    sinon.restore();
  });
});