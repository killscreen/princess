/*global require,describe,it,expect*/

(function () {
  "use strict";
  
  var di = require('../princess');
  
  describe("The dependency injector", function () {
    it("wires together dependencies", function () {
      di('foo', [], function () {
        return 'FOO!';
      });
      di('bar', ['foo'], function (foo) {
        return foo + ' BAR!';
      });
      expect(di.run(['bar'], function (bar) {
        return bar;
      })).toEqual('FOO! BAR!');
    });
    
    it("reports whether or not a dependency has been registered", function () {
      var child = di.scope([]);
      expect(child.has('xyz')).toBeFalsy();
      child('xyz', [], function () {});
      expect(child.has('xyz')).toBeTruthy();
    });
    
    it("reports dependency registration among children", function () {
      var parent = di.scope([]), child = parent.scope();
      expect(child.has('xyz')).toBeFalsy();
      parent('xyz', [], function () {});
      expect(child.has('xyz')).toBeTruthy();
    });
    
    it("exposes dependencies directly", function () {
      var child = di.scope([]);
      child('xyz', [], function () { return "XYZ!"; });
      expect(child.get('xyz')).toEqual("XYZ!");
    });
    
    it("allows child scopes to override dependencies", function () {
      var parent = di.scope([]), child = parent.scope();
      parent('foo', [], function () {
        return 'FOO!';
      });
      child('bar', ['foo'], function (foo) {
        return foo + ' BAR?';
      });
      expect(child.run(['bar'], function (bar) {
        return bar;
      })).toEqual('FOO! BAR?');
    });
    
    it("finds dependencies among parents", function () {
      var parents = [di.scope([]), di.scope([])],
        child = di.scope(parents);
      parents[1]('foo', [], function () {
        return 'FOO!';
      });
      child('bar', ['foo'], function (foo) {
        return foo + ' BAR?';
      });
      expect(child.run(['bar'], function (bar) {
        return bar;
      })).toEqual('FOO! BAR?');
    });
  });
  
  
}());