var _ = require('underscore');

module.exports = function(schema) {

  /**
   * Private functions
   * ------------------------------------------------------------------------*/

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
      // Del item from property
      this[key] = this[key].filter(function(value) {
        if(value.toString) value = value.toString();
        if(item.toString)  item  = item.toString();
        return value != item;
      });

      // Save the document, if a callback is provided
      if(callback) {
        this.save(callback);
      }

      // Return 'this' as a momadic value
      return this;
    };
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
    };
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
    };
  };

  /**
   * Util functions
   * ------------------------------------------------------------------------*/

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function methodName(method_type, node_name) {
    var method_name = method_type + capitalize(node_name);
    return _.last(method_name) === 's' ? _.initial(method_name).join('') : method_name;
  }

  /**
   * Function generation
   * ------------------------------------------------------------------------*/

  _.each(schema.tree, function(node, node_name) {
    var method_types = node instanceof Array ? ['add', 'del'] : ['set', 'unset'];
    _.each(method_types, function(method_type) {
      var method_name = methodName(method_type, node_name),
          method = schema.methods['_gen'+capitalize(method_type)](node_name);
      schema.methods[method_name] = method;
    });
  });
};
