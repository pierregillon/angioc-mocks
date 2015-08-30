(function () {
    'use strict';

    describe('[Instance injection] A customer controller', function () {

        var customerController;
        var parameters;

        beforeEach(angiocMocks.inject(function($mock){
            $mock.set('parameters', {customerCount: 1});
        }));
        beforeEach(angiocMocks.inject(function (_customerController_, _parameters_) {
            customerController = _customerController_;
            parameters = _parameters_;
        }));

        it('should be defined.', function () {
            expect(customerController).toBeDefined();
        });

        it('should feed the customer list with exact count when initialized.', function () {
            customerController.initialize();
            expect(customerController.customers.length).toBe(1);
        });
    });

    describe('[Instance creation] A customer controller', function () {
        var customerController;

        beforeEach(angiocMocks.definition(function (_customerController_) {
            var customerServiceMock = {
                getCustomers: function () {
                    return [
                        {name: 'Mock customer'},
                        {name: 'Mock customer2'}
                    ];
                }
            };
            var parametersMock = {
                customerCount: 1
            };
            customerController = new _customerController_(customerServiceMock, parametersMock);
        }));

        it('should be defined.', function () {
            expect(customerController).toBeDefined();
        });

        it('should feed the customer list with exact count when initialized.', function () {
            customerController.initialize();
            expect(customerController.customers.length).toBe(1);
        });
    });
}());