var common = require("../common");
var expect = common.expect;
var utils = common.utils;

describe('utils', function() {

    describe('#isPositiveInt()', function() {

        it('should check if is positive int', function() {

            var testsTrue = [1, 15, '32'];

            testsTrue.forEach(function(test){
                var isPositive = utils.isPositiveInt(test);
                var expected = true;
                expect(isPositive).equal(expected);
            });

            var testsFalse = [0, -1, '0', '-7', 3.14, undefined, '', 'test1'];

            testsFalse.forEach(function(test){
                var isPositive = utils.isPositiveInt(test);
                var expected = false;
                expect(isPositive).equal(expected);
            });
        });
    });

    describe('#getNbOfPages()', function() {

        it('should return the number of pages', function() {

            // Currently, the website uses SITE_PATIENTS_PERPAGE = 15
            var tests = [
                { value:  0, expected: 0 },
                { value:  1, expected: 1 },
                { value: 14, expected: 1 },
                { value: 15, expected: 1 },
                { value: 16, expected: 2 },
                { value: 47, expected: 4 }
            ];

            tests.forEach(function(test){
                var nbOfPages = utils.getNbOfPages(test.value);
                expect(nbOfPages).equal(test.expected);
            });
        });
    });

    describe('#convertEstomatoDateToJSDate()', function() {

        it('should convert EstomatoWeb date to JavaScript date', function() {

            var tests = [
                { value: '31/ 5 /1985', expected: new Date('1985-5-31') },
                { value: '31/ 12 /1985', expected: new Date('1985-12-31') },
                { value: '5/ 5 /1985', expected: new Date('1985-5-5') },
                { value: '5/ 12 /1985', expected: new Date('1985-12-5') },
                { value: '31/ 5 /1900', expected: new Date('1900-5-31') }
            ];

            tests.forEach(function(test){
                var date = utils.convertEstomatoDateToJSDate(test.value);
                expect(date).to.equalDate(test.expected);
            });
        });
    });

    describe('#getYearOfDiagnosis()', function() {

        it('should return the correct year', function() {

            var tests = [
                { reg: '15/94528', expected: new Date('2015-01-01') },
                { reg: '11/82345', expected: new Date('2011-01-01') },
                { reg: '98/44528', expected: new Date('1998-01-01') },
                { reg: '00/72452', expected: new Date('2000-01-01') }
            ];

            tests.forEach(function(test){
                var year = utils.getYearOfDiagnosis(test.reg);
                expect(year).to.equalDate(test.expected);
            });
        });
    });

    describe('#getDateDiff()', function() {

        it('should return the difference in years', function() {

            var tests = [
                { date1: new Date('1954-12-1'), date2: new Date('1982-3-13'), expected: 27 },
                { date1: new Date('1954-3-1'), date2: new Date('1982-3-13'), expected: 28 },
                { date1: new Date('1954-3-12'), date2: new Date('1982-3-13'), expected: 28 },
                { date1: new Date('1954-3-13'), date2: new Date('1982-3-13'), expected: 28 },
                { date1: new Date('1954-3-14'), date2: new Date('1982-3-13'), expected: 27 }
            ];

            tests.forEach(function(test){
                var diff = utils.getDateDiff(test.date1, test.date2);
                expect(diff).equal(test.expected);
            });
        });
    });
});