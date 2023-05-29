const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { saleController } = require('../../../src/controllers');
const { saleService } = require('../../../src/services');
const { sales, saleById } = require('./Mock/sale.contoller.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Testes da camada  controller sale', function () {
  describe('Lista todas as vendas', function () {
    it('Deve retornar o status 200 e a lista de vendas', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'findAll').resolves({ type: null, message: sales });

      await saleController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(sales);
    });

  describe('Lista vendas por ID', function () {
    it('Deve retornar o status 200 e as vendas caso elas existam', async function () {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'findById').resolves({ type: null, message: saleById });

      await saleController.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleById);
    });

  afterEach(function () {
    sinon.restore();
  });
});
});
});