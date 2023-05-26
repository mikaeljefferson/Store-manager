const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productController } = require('../../../src/controllers');
const { productService } = require('../../../src/services');
const { Products } = require('./Mock/product.contoller.mock');

const { expect } = chai;
chai.use(sinonChai);
describe('Testes da camada  controller product', function () {
    it('Deve retornar o status 200 e a lista de produtos', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'getAll').resolves({ type: null, message: Products });

      await productController.getAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(Products);
    });
    describe('Listando produto por id', function () {
    it('se produto existir retorna status 200', async function () {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'getById').resolves({ type: null, message: Products[0] });

      await productController.getById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(Products[0]);
    });
    afterEach(function () {
        sinon.restore();
      });
    });
});