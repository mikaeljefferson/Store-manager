const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productController } = require('../../../src/controllers');
const { productService } = require('../../../src/services');
const { products, newProduct } = require('./Mock/product.contoller.mock');

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
  afterEach(function () {
    sinon.restore();
  });
});
});
});