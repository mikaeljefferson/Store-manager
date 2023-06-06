const chai = require('chai');
const sinon = require('sinon');
const validations = require('../../../src/middlewares');

const { expect } = chai;

describe('Testa as validações', function () {
  const req = {};
  const res = {};
  const next = sinon.stub().returns();

  beforeEach(function () {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();
  });

  afterEach(function () {
    sinon.restore();
  });
  it('Testa retorno da validação se não exitir o nome', function () {
    req.body = {};
    validations.validateNewProduct(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWithExactly({
      message: '"name" is required',
    });
  });
  it('Testa retorna da validação se o nome for menor que 5 caracteres', function () {
    req.body = { name: 'aaa' };
    validations.validateNewProduct(req, res, next);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWithExactly({
      message: '"name" length must be at least 5 characters long',
    });
  });
  it('testa productId', function () {
    req.body = [{}];
    validations.validateNewSale(req, res, next);
    expect(res.status).to.have.been.calledWith(400);
    });
  }); 
