(function (window, describe, it) {
    'use strict';

    describe('Angioc mocks', function () {
        it('should be injected in the window.', function () {
            expect(window.angiocMocks).toBeDefined();
        });
    });
}(window, describe, it));