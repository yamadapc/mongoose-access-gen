var _ = require('underscore');

module.exports = function(schema) {

  /**
   * #_genAdd(key)
   * Generates the adding function for a document's 'key' property
   * @param {String} key
   * @returns {Function} add(item, callback)
   */

  schema.methods._genAdd = function(key) {
    return function(item, callback) {
      // Set property or add item to it (if its an Array)
      this[key].push(item);

      // Save the document, if a callback is provided
      if(callback) {
        this.save(callback);
      }

      // Return 'this' as a monadic value
      return this;
    };
  };

  /**
   * #_genDel(key)
   * Generates the deletion function for a document's 'key' property
   * @param {String} key
   * @returns {Function} del(item, callback)
   */

  schema.methods._genDel = function(key) {
    return function(item, callback) {
      // Unset property or del item from it (if its an Array) 
      this[key] = _.without(this[key], item);

      // Save the document, if a callback is provided
      if(callback) {
        this.save(callback);
      }

      // Return 'this' as a nomadic value
      return this;
    };
  };
};
