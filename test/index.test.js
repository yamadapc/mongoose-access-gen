var should   = require('should'),
    mongoose = require('mongoose'),
    access   = require('../index');

describe('Schema', function() {
  var Comedian, doc, joke, humor;

  before(function(done) {
    var ComedianSchema = new mongoose.Schema({
      jokes: [{ type: String }],
      humor:  { type: String }
    });
    ComedianSchema.plugin(access);
    Comedian = mongoose.model('Comedian', ComedianSchema);
    done();
  });

  before(function(done) {
    doc = new Comedian();
    done();
  });

  describe('#addJoke', function() {
    var n_jokes;

    before(function(done) {
      n_jokes = doc.jokes.length;
      done();
    });

    it('should have been added to the Schema', function(done) {
      doc.should.have.property('addJoke');
      done();
    });

    it('should add a joke to the doc', function(done) {
      joke = 'A haskell programmer walks into a bar ...';
      doc.addJoke(joke);
      doc.jokes.should.have.lengthOf(n_jokes+1);
      doc.jokes.should.include(joke);
      done();
    });
  });

  describe('#delJoke', function() {
    var n_jokes;

    before(function(done) {
      n_jokes = doc.jokes.length;
      done();
    });

    it('should have been added to the Schema', function(done) {
      doc.should.have.property('delJoke');
      done();
    });

    it('should add a joke to the doc', function(done) {
      var joke = 'A haskell programmer walks into a bar ...';
      doc.delJoke(joke);
      doc.jokes.should.have.lengthOf(n_jokes-1);
      doc.jokes.should.not.include(joke);
      done();
    });
  });

  describe('#setHumor', function() {
    it('should have been added to the Schema', function(done) {
      doc.should.have.property('setHumor');
      done();
    });

    it('should set doc\'s humor', function(done) {
      var humor = 'null';
      doc.setHumor(humor);
      doc.humor.should.equal(humor);
      done();
    });
  });

  describe('#unsetHumor', function() {
    it('should have been added to the Schema', function(done) {
      doc.should.have.property('unsetHumor');
      done();
    });

    it('should unset doc\'s humor', function(done) {
      var humor = 'null';
      doc.unsetHumor(humor);
      should.not.exist(doc.humor);
      done();
    });
  });
});
