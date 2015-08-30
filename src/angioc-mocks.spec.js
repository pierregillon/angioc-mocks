(function (window, describe, it, Angioc, AngularMocks) {
    'use strict';

    describe('Angioc mocks', function () {

        var angiocMocks;
        var angioc;

        beforeEach(function(){
            angioc = new Angioc();
            angiocMocks = new AngularMocks(angioc);
        });

        describe('can inject', function () {
            it('dependencies', function () {
                // Actors
                var constant = {value: 'hello world'};

                // Actions
                angioc
                    .register('MyConstant', constant)
                    .asConstant();

                // Asserts
                angiocMocks.inject(function (MyConstant) {
                    expect(MyConstant).toBe(constant);
                })();
            });
            it('dependencies with _', function () {
                // Actors
                var constant = {value: 'hello world'};

                // Actions
                angioc
                    .register('MyConstant', constant)
                    .asConstant();

                // Asserts
                angiocMocks.inject(function (_MyConstant_) {
                    expect(_MyConstant_).toBe(constant);
                })();
            });
            it('definitions', function () {
                // Actors
                function MyClass() {
                }

                // Actions
                angioc
                    .register('test', MyClass)
                    .asClass();

                // Asserts
                angiocMocks.definition(function (test) {
                    expect(test).toBe(MyClass);
                })();
            });
            it('definitions with _', function () {
                // Actors
                function MyClass() {
                }

                // Actions
                angioc
                    .register('test', MyClass)
                    .asClass();

                // Asserts
                angiocMocks.definition(function (_test_) {
                    expect(_test_).toBe(MyClass);
                })();
            });
            it('$mocks to modify dependencies with mock objects.', function () {
                // Actors
                function MyClass(dependency) {
                    this.get = function(){
                        return dependency.value;
                    }
                }
                var mockObject = {value: 'hello world'};

                // Actions
                angioc
                    .register('test', MyClass)
                    .asClass()
                    .withDependencies(['MyDependency']);

                // Asserts
                angiocMocks.inject(function($mock){
                    $mock.set('MyDependency', mockObject);
                })();
                angiocMocks.inject(function (test) {
                    expect(test).toBeDefined();
                    expect(test.get()).toBe('hello world');
                })();
            });
        });
    });

}(window, describe, it, angioc.constructor, angiocMocks.constructor));