## Modules
<dl>
<dt><a href="#module_princess">princess</a></dt>
<dd><p>A minimalist scoped dependency injector.</p>
</dd>
</dl>
<a name="module_princess"></a>
## princess
A minimalist scoped dependency injector.

<a name="exp_module_princess--module.exports"></a>
### module.exports : <code>[Scope](#Scope)</code> ⏏
**Kind**: Exported member  
<a name="Scope"></a>
## Scope
A dependency injection scope.

**Kind**: global interface  

* [Scope](#Scope)
  * [.run(deps, fn)](#Scope+run) ⇒ <code>\*</code>
  * [.get(name)](#Scope+get) ⇒ <code>\*</code>
  * [.scope([scopes])](#Scope+scope) ⇒ <code>[Scope](#Scope)</code>
  * [.has(name)](#Scope+has)
  * [.register(name, deps, fn, [scope])](#Scope+register) ⇒ <code>[Scope](#Scope)</code>

<a name="Scope+run"></a>
### scope.run(deps, fn) ⇒ <code>\*</code>
Run a function using dependencies.

**Kind**: instance method of <code>[Scope](#Scope)</code>  
**Returns**: <code>\*</code> - the return value of the provided function  

| Param | Type | Description |
| --- | --- | --- |
| deps | <code>Array.&lt;string&gt;</code> | dependencies of this function |
| fn | <code>function</code> | a function to invoke with that dependency |

<a name="Scope+get"></a>
### scope.get(name) ⇒ <code>\*</code>
Look up a dependency from this scope.

**Kind**: instance method of <code>[Scope](#Scope)</code>  
**Returns**: <code>\*</code> - the registered object  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name of the object to look up |

<a name="Scope+scope"></a>
### scope.scope([scopes]) ⇒ <code>[Scope](#Scope)</code>
Create a new scope.

If no argument is provided, this will be a child of the
current scope.

If an array of scopes is provided, this will be a child
of those scopes.

An empty array can be provided to create a detached scope
which inherits from no other scopes.

**Kind**: instance method of <code>[Scope](#Scope)</code>  
**Returns**: <code>[Scope](#Scope)</code> - the new scope  

| Param | Type | Description |
| --- | --- | --- |
| [scopes] | <code>[Array.&lt;Scope&gt;](#Scope)</code> | parent scopes |

<a name="Scope+has"></a>
### scope.has(name)
Check if something of this name has been registered.

**Kind**: instance method of <code>[Scope](#Scope)</code>  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name of the registered object |

<a name="Scope+register"></a>
### scope.register(name, deps, fn, [scope]) ⇒ <code>[Scope](#Scope)</code>
Register an object in this dependency injection scope.

**Kind**: instance method of <code>[Scope](#Scope)</code>  
**Returns**: <code>[Scope](#Scope)</code> - the current scope  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | name of the object to register |
| deps | <code>Array.&lt;string&gt;</code> | dependencies of the registered object |
| fn | <code>function</code> | function which will return this object |
| [scope] | <code>[Scope](#Scope)</code> | scope from which to look up dependencies        (if omitted, will use the same scope.) |

