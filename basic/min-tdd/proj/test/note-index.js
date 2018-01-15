const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

describe('Note Index', function() {
    var window;
    let $ = function (sel) {
        return window.document.querySelector(sel);
    }
    before(function() {
        window = null;
    })
    it('should display a number of note titles', function() {
        expect($('h2.note').length).to.above(0);
    })
})