(function(require){
    'use strict';

    var expect = require('chai').expect;
    var angiocMocks = require('./angioc-mocks');

    describe('Angioc mocks', function(){
        it('should be well imported with require statement.', function(){
            expect(angiocMocks).to.be.defined;
        });
    });
}(require));