(function () {
    'use strict';

    function AngiocMock(angioc){
        var self = this;

        angioc.resolve(['$provide'], function($provide){
            self.angiocMocks = AngiocMock;
            self.inject = function(callback){
                return function(){
                    angioc.resolve(callback);
                };
            };
            self.definition = function(callback){
                return function(){
                    var dependencyNames = getParameterNames(callback);
                    var definitions = [];
                    dependencyNames.forEach(function (dependencyName) {
                        definitions.push($provide.getDefinition(dependencyName));
                    });
                    callback.apply(this, definitions);
                };
            };
        });

        registerMocks();

        // ----- Internal logic
        function registerMocks(){
            angioc
                .register('$mock', Mock)
                .asClass()
                .asSingleton()
                .withDependencies(['$provide']);

            function Mock($provide){
                var self = this;

                self.set = function(name, value){
                    $provide.replaceDependencyNameByConstant(name, value);
                };
            }
        }

        var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
        var ARGUMENT_NAMES = /([^\s,]+)/g;
        function getParameterNames(func) {
            var fnStr = func.toString().replace(STRIP_COMMENTS, '');
            var result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(ARGUMENT_NAMES);
            if (result === null)
                result = [];
            var final = [];
            result.forEach(function (item) {
                final.push(item.split('_').join(''));
            });
            return final;
        }
    }

    function injectInstance(factory) {
        if (typeof define === 'function' && define.amd) {
            define([], factory);
        } else if (typeof exports === 'object') {
            module.exports = factory;
        } else {
            window.angiocMocks = factory;
        }
    }
    function getAngiocInstance(){
        if (typeof define === 'function' && define.amd) {
            return require('angioc');
        } else if (typeof exports === 'object') {
            return require('angioc');
        } else {
            return window.angioc;
        }
    }

    injectInstance(new AngiocMock(getAngiocInstance()));
}());