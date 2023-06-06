const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { productController } = require('../../../src/controllers');
const { productService } = require('../../../src/services');
const { products, newProduct, updateProduct } = require('./Mock/product.contoller.mock');

const INVALID_VALUE = 'INVALID_VALUE';
const msg = '"name" length must be at least 5 characters long';
const msg2 = '"id" must be a number';
const m = 'Product not found';
const PRODUCT_NOT_FOUND = 'PRODUCT_NOT_FOUND';
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
    it('Deve retornar um erro ao enviar um nome com menos de 5 caracteres', async function () {
      const req = {
        body: {
          name: 'abcd',
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'insertProduct').resolves({ type: INVALID_VALUE, message: msg });

      await productController.insertProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: msg });
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
      sinon.stub(productService, 'updateProduct').resolves({ type: INVALID_VALUE, message: msg });

      await productController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(422);
      expect(res.json).to.have.been.calledWith({ message: msg });
    });
    it('Deve retornar o status 200 produto', async function () {
      const req = {
        params: {
          id: 1,
        },
        body: {
          name: 'ProductX',
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'updateProduct').resolves({ type: null, message: updateProduct });

      await productController.updateProduct(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(updateProduct);
    });
  });
  describe('Deletando um produto', function () {
    it('Deve retornar o status 204 ao deletar o produto com sucesso', async function () {
      const req = {
        params: {
          id: 1,
        },
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();
      sinon.stub(productService, 'deleteproduct').resolves({ type: null, message: '' });

      await productController.deleteproduct(req, res);

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
      sinon.stub(productService, 'deleteproduct').resolves({ type: INVALID_VALUE, message: msg2 });

      await productController.deleteproduct(req, res);

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
      sinon.stub(productService, 'deleteproduct').resolves({ type: PRODUCT_NOT_FOUND, message: m });

      await productController.deleteproduct(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });

  afterEach(function () {
    sinon.restore();
  });
});