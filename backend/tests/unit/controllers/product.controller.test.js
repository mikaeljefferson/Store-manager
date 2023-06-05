const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productController } = require('../../../src/controllers');
const { productService } = require('../../../src/services');
const { products, newProduct } = require('./Mock/product.contoller.mock');

const INVALID_VALUE = 'INVALID_VALUE';
const { expect } = chai;
chai.use(sinonChai);

describe('Testa a camada controller', function () {
  describe('Lista todos  produtos', function () {
    it('Deve retornar o status 200 e a lista dos produtos', async function () {
      const res = {};
      const req = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'findAll').resolves({ type: null, message: products });

      await productController.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(products);
    });
    describe('Cadastra um novo produto', function () {
      it('se o produto criado ao enviar dados válidos', async function () {
        const req = {
          body: {
            name: 'ProductX',
          },
        };
        const res = {};
  
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns();
        sinon.stub(productService, 'insertProduct').resolves({ type: null, message: newProduct });
  
        await productController.insertProduct(req, res);
  
        expect(res.status).to.have.been.calledWith(201);
        expect(res.json).to.have.been.calledWith(newProduct);
      });
    });
  });
  describe('Atualizando um produto', function () {
    it('Deve retornar um erro ao enviar um nome com menos de 5 caracteres', async function () {
      const req = {
        params: {
          id: 1,
        },
        body: {
          name: 'abcd',
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      // eslint-disable-next-line max-len
      sinon.stub(productService, 'updateProduct').resolves({ type: INVALID_VALUE, message: '"name" length must be at least 5 characters long' });

      await productController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      // eslint-disable-next-line max-len
      expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});