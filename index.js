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
      // Add item to property
      this[key].push(item);

      // Save the document, if a callback is provided
      if(callback) {
        this.save(callback);
      }

      // Return 'this' as a monadic value
      return this;
    }.bind(this);
  };

  /**
   * #_genDel(key)
   * Generates the deletion function for a document's 'key' property
   * @param {String} key
   * @returns {Function} del(item, callback)
   */

  schema.methods._genDel = function(key) {
    return function(item, callback) {
      // Del item from property
      this[key] = _.without(this[key], item);

      // Save the document, if a callback is provided
      if(callback) {
        this.save(callback);
      }

      // Return 'this' as a momadic value
      return this;
    }.bind(this);
  };

  /**
   * #_genSet(key)
   * Generates a setter for a document's 'key' property
   * @param {String} key
   * @returns {Function} set(item, callback)
   */

  schema.methods._genSet = function(key) {
    return function(item, callback) {
      // Set property as item
      this[key] = item;

      // Save the document, if a callback is provided
      if(callback) {
        this.save(callback);
      }

      // Return 'this' as a momadic value
      return this;
    }.bind(this);
  };

  /**
   * #_genSet(key)
   * Generates a unsetter for a document's 'key' property
   * @param {String} key
   * @returns {Function} unset(callback)
   */

  schema.methods._genUnset = function(key) {
    return function(callback) {
      // Unset property
      this[key] = undefined;

      // Save the document, if a callback is provided
      if(callback) {
        this.save(callback);
      }

      // Return 'this' as a momadic value
      return this;
    }.bind(this);
  };
};
