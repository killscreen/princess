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

(function () {
  "use strict";
  
  function scope(parents) {
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
    
    // A di scope is a function used to register tings
    function self(name, deps, fn, scope) {
      scope = scope || self;
      registered[name] = registered[name] || function () {
        return scope.run(deps, fn);
      };
    }
        
    self.run = run;
    self.get = lookup;
    self.scope = function (scopes) {
      return scope(scopes !== undefined ? scopes : [self]);
    };
    self.has = function (name) {
      return registered[name] !== undefined || parents.some(function (scope) {
        return scope.has(name);
      });
    };
    
    // Default to no parent scopes
    parents = parents || [];
    
    return self;
  }
  
  module.exports = scope();
}());

