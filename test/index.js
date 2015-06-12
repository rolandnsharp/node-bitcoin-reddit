

// Before each test, load the fixture data to ensure consistent tests.
var fixtures = require('./fixtures');

beforeEach(function beforeEachTest(done) {
    // drop db then load fixtures

    require('../app.js');
    done();

});
