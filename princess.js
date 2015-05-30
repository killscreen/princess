/*global module*/

/*
Copyright (c) 2015 Victor Woeltjen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/


/**
 * @file princess
 * @author Victor Woeltjen <vwoeltjen@gmail.com>
 * @project princess
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */
(function () {
  /**
   * A minimalist scoped dependency injector.
   * @module princess
   */
  "use strict";
  
  /**
   * A dependency injection scope.
   *
   * @interface Scope
   */
  function Scope(parents) {
    var registered = {},
      instantiated = {};
    
    function find(dep) {
      var i;
      for (i = 0; i < parents.length; i += 1) {
        if (parents[i].has(dep)) {
          return parents[i].get(dep);
        }
      }
    }
    
    function instantiate(dep) {
      var fn = registered[dep];
      return fn ? fn() : find(dep);
    }
    
    function lookup(dep) {
      return (instantiated[dep] = instantiated[dep] || instantiate(dep));
    }
    
    function run(deps, fn) {
      return fn.apply(null, deps.map(lookup));
    }
    
    function self(name, deps, fn, scope) {
      scope = scope || self;
      registered[name] = registered[name] || function () {
        return scope.run(deps, fn);
      };
      return self;
    }
    
    /**
     * Run a function using dependencies.
     * @method Scope#run
     * @param {string[]} deps dependencies of this function
     * @param {Function} fn a function to invoke with that dependency
     * @returns {*} the return value of the provided function
     */
    self.run = run;
    
    /**
     * Look up a dependency from this scope.
     * @method Scope#get
     * @param {string} name name of the object to look up
     * @returns {*} the registered object
     */
    self.get = lookup;
    
    /**
     * Create a new scope.
     *
     * If no argument is provided, this will be a child of the
     * current scope.
     *
     * If an array of scopes is provided, this will be a child
     * of those scopes.
     *
     * An empty array can be provided to create a detached scope
     * which inherits from no other scopes.
     *
     * @method Scope#scope
     * @param {Scope[]} [scopes] parent scopes
     * @returns {Scope} the new scope
     */
    self.scope = function (scopes) {
      return new Scope(scopes !== undefined ? scopes : [self]);
    };
    
    /**
     * Check if something of this name has been registered.
     * @method Scope#has
     * @param {string} name name of the registered object
     */
    self.has = function (name) {
      return registered[name] !== undefined || parents.some(function (scope) {
        return scope.has(name);
      });
    };

    /**
     * Register an object in this dependency injection scope.
     * @method Scope#register
     * @param {string} name name of the object to register
     * @param {string[]} deps dependencies of the registered object
     * @param {Function} fn function which will return this object
     * @param {Scope} [scope] scope from which to look up dependencies
     *        (if omitted, will use the same scope.)
     * @returns {Scope} the current scope
     */
    self.register = self;
    
    // Default to no parent scopes
    parents = parents || [];
    
    return self;
  }
  
  /**
   * @type {Scope}
   */
  module.exports = new Scope();
}());

