const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { saleController } = require('../../../src/controllers');
const { saleService } = require('../../../src/services');
const { sales, saleById, newSale } = require('./Mock/sale.contoller.mock');

const { expect } = chai;
chai.use(sinonChai);
const SALE_NOT_FOUND = 'SALE_NOT_FOUND';
const INVALID_VALUE = 'INVALID_VALUE';
const msg = '"id" must be a number';
const msg2 = 'Sale not found';
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
    it('Retorna um erro caso ocorra algo inesperado', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'findAll').resolves({ type: 500, message: 'Server error' });

      await saleController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith('Server error');
    });
    it('Deve retornar um erro caso o ID não exista', async function () {
      const req = {
        params: {
          id: 999,
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(saleService, 'findById').resolves({ type: SALE_NOT_FOUND,
         message: 'Sale not found',
        });

      await saleController.findById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
    });
  });
    it('Testando se é possível cadastrar uma nova venda', async function () {
      sinon.stub(saleService, 'insertSale').resolves(newSale);
      const result = await saleService.insertSale(201);
      expect(result).to.be.deep.equal(newSale);
    });
    describe('Deletando uma venda', function () {
      it('Deve retornar o status 204 ao deletar a venda com sucesso', async function () {
        const req = {
          params: {
            id: 1,
          },
        };
        const res = {};
  
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(saleService, 'removeSaleById').resolves({ type: null, message: '' });
  
        await saleController.removeSaleById(req, res);
  
        expect(res.status).to.have.been.calledWith(204);
        expect(res.json).to.have.been.calledWith('');
      });
  
      it('Deve retornar um erro caso o ID seja inválido', async function () {
        const req = {
          params: {
            id: 'a',
          },
        };
        const res = {};
  
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(saleService, 'removeSaleById').resolves({ type: INVALID_VALUE, message: msg });
  
        await saleController.removeSaleById(req, res);
  
        expect(res.status).to.have.been.calledWith(422);
        expect(res.json).to.have.been.calledWith({ message: '"id" must be a number' });
      });
  
      it('Deve retornar um erro caso o ID não exista', async function () {
        const req = {
          params: {
            id: 999,
          },
        };
        const res = {};
  
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(saleService, 'removeSaleById').resolves({ type: SALE_NOT_FOUND, message: msg2 });
  
        await saleController.removeSaleById(req, res);
  
        expect(res.status).to.have.been.calledWith(404);
        expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
      });
    });
  afterEach(function () {
    sinon.restore();
  });
});
});