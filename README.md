#angioc-mocks

A library to help you testing application that is using angioc. You can find angioc library here : https://github.com/pierregillon/angioc

## Install

With npm

    npm install angioc-mocks

With bower

    bower install angioc-mocks

## Import

AMD loader	

    define('myApplication', ['angioc-mocks'], function() {
        ...
    });	
    
Node.js
	
    var angiocMocks = require('angioc-mocks');
	
Plain HTML5

    <script src="angioc-mocks.js"></script>
    
### Introduction

Angioc-mocks help you to test your application that is using Angioc.

## How to use

### Inject dependencies for better testing

Angioc provides features to help you testing your application.
If you are using Jasmine or Mocha, you can use the 'inject' function to get dependencies from Angioc.

    describe('A customer controller', function () {
        beforeEach(angiocMocks.inject(function (customerController, parameters) {
            // ...
        }));
    });
 
You can surround parameter name by '_' to easy initialize test variables.

    describe('A customer controller', function () {
        var customerController;
        var parameters;

        beforeEach(angiocMocks.inject(function (_customerController_, _parameters_) {
            customerController = _customerController_;
            parameters = _parameters_;
        }));
    });
    
When you are injecting dependencies, you probably want to replace a specific instance by a mock object. You can use the
'$mock' object to do this purpose.

    describe('A customer controller', function () {
        beforeEach(angiocMocks.inject(function($mock){
            $mock.set('parameters', {customerCount: 1});
        }));
        beforeEach(angiocMocks.inject(function (_customerController_, _parameters_) {
            customerController = _customerController_;
            parameters = _parameters_;
        }));
    });
    
Be careful to set your mocks before calling the angiocMocks.inject() that inject the instances you want to test.

### Inject class definition for better testing

If you are using Jasmine or Mocha, you can use the 'definition' function to get the original function. This let you instanciate
you class by the hand, and to directly provide mocks to the constructor.

    describe('A customer controller', function () {
        beforeEach(angiocMocks.definition(function (customerController) {
            _customerController = new customerController(customerServiceMock, parametersMock);
        }));
    });
  
You can surround parameter name by '_' to easy initialize test variables.

    describe('A customer controller', function () {
        beforeEach(angiocMocks.definition(function (_customerController_) {
            customerController = new _customerController_(customerServiceMock, parametersMock);
        }));
    });

## How to develop

Run unit test

    gulp test
    
Run unit tests in continuous mode

    gulp test-dev
    
Run example tests

    gulp test-example
    
