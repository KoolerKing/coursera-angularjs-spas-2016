Coursera - Single Page Webapps using AngularJS - 2016-09-07
=====

## Lecture Notes:

### Week3

#### Lecture 24,  Parts 1 and 2 - Asynchronous Behaviour with Promises and $q

Promise API part of New ES6 API. In angular promises are created with the $q service.

$q.defer() creates the asnyc environment with all the hooks into it along with the promise object.

```javascript
    function asyncFunction () {
    var deferred = $q.defer();

    if (...) { deferred.resolve(result)}; //marks successful completion and wraps the data for the promise.

    else { deferred.reject(error); } //marks unsuccessful completion, wraps data for the promise.

    return deferred.promise; //Returns promise to caller (a hook back to this entire process.)
    }
```
So then:
``` javascript
    var promise = asyncFunction();

    promise.then(function (result)) {
      // do something with result
    },

    function (error) {
      // do something with the error
    });
```
**multiple promises can be done in parrallel:**
```javascript
    $q.all([promise1, promise2]).then(function (result){
         // do something with the result
      })

      .catch (function(error)) {
        // do something with the error
      });
```
**You can chain promises:**
```javascript
    var promise = asyncFunction();
    promise
    .then(function(){ stuff})
    .then(function(){stuff2})
    .catch(function(errorResponse){
      console.log(errorResponse.message);
      });
```

#### Lecture 25 Part 1 - Ajax with $http Service

  $http is based on the promise API.
```javascript
  $http({
    method: "GET",
    url: "http://someurl",
    params: {param1: "value1"}
    }).then(
      function success(response) {
        // do something with the response.data
      },
      function error(response) {
        // do something with the error response
      });
```
  - the url property is the only required one. If no method is given, "GET" is the default.
  - params in the params object end up being url encoded.

#### Lecture 25 Part 2

on the angular module you can declare a constant:

```javascript
angular.module('myapp',[])
.controller(...)
.controller(...)
.service(...)
.constant('Const1', "const-value")
.constant('BasePath', "http:someplace.org");

SomeService.$inject = ['Const1','BasePath'];
function SomeService(Const1, BasePath) {
  // use them
};
```
then you inject it into the functions you need.

#### Lecture 26, Parts 1 & 2- Directives Dynamic HTML

A Directive is a marker on a DOM element that tells Angular's HTML compiler to attach a specified behaviour to that DOM element
* The compiler can even transform/change the DOM elements and its children
* A marker can be an attribute, element name, comment or CSS class (usually just the first two)
* It can also change the HTML elements themselves
* You register the name of the directive with (normalized) CamelCase
* The registered factory function must return a DDO
  * The factory function gets invoked only once
* With custom directives, the HTML colding becomes
  * Reusable
  * Semantically relevant to the actual web app we're building

Register your directives just like controllers, services etc.

```javascript
angular.module('app', [])
.controller('MyCtrl', MyCtrl)
.directive('myTag', MyTag);
```
where
* myTag is a Normalized name that will appear in the HTML, and
* MyTag is a factory function that returns a DDO (Directive Definition Object)

```javascript
MyTag.$inject = [...]; // inject other services, controllers etc.
function MyTag(...){
  var ddo = {
    template: 'Hello World!', // OR! not both
    templateUrl: "src/somefile.html"
    ...
  };
  return ddo;
};
```
Note that the denormalized name for myTag becomes `<my-tag></my-tag>`, and that it starts with a lowercase letter.

#### Lecture 27 The Restrict Property

```javascript
function MyDirective() {
  var ddo = {
    restrict: "AE", // A - attribute, E - element so 'A', 'E' or both 'AE'
    templateUrl: "src/somefile.html"
  };
  return ddo;
}
```
Angular will only recognize the specific element type you restrict to.

##### Summary

* The DDO's restrict property determines what AngularJS compiler should look for to detect your custom directive.
* Using directive as a different restrict type than defined will cause the compiler to simply ignore it.
* Best Practice: Use 'E' for element when directive has content along with possible behaviour.
* Best Practice: Use 'A' for attribute when directive has no content and only extends the behaviour of host element
* Class and comment directives are possible, but not used, so don't use them

#### Lecture 28, Part 1 and 2 - Directives Isolate scope "=" and "@"

Previous examples had a problem: they might be called too tightly coupled. To fix snippets need to be redone to make them independent of their caller.

```javascript
function MyDirective() {
  var ddo = {
    scope: {
      myProp1: "=attributeName", // or
      myProp2: "=", // or
      myProp3: "=?", // or
      myProp4: '@myAttribute'
    }
  };
  return ddo;
};
```
* '=' a start with an equals sign means the binding is Bi-directional
* '=attributeName' associates myProp1 with attributeName
* '=' defaults to an attributeName of my-prop2
* '=?' means the binding/attributeName is optional and it may not be present at all
* '@myArribute' binds myProp to the value of DOM attribute my-attribute (always a string). And is always a one way binding.

So in the snippet/code segment this becomes:

```html
<my-directive my-prop="outerProp"></my-directive> for = and
```

```html
<my-directive my-attribute="{{outerProp}}"></my-directive> for @ or even   
<my-directive my-attribute="{{outerProp + '!'}}"></my-directive>
```
##### Summary
* Having isolate scope on the directive
  * Breaks the prototypal inheritance of the scope from the parent  
  * Makes the directive more independent, less coupled with the controller  
* We pass values into the directive using scope bindings in the DDO  
* Bi-directional bindings ('=') are such that directive scope property changes affect the bound property and visa versa
* DOM attribute value bindings ('@') always result in directive properties being strings
  * Changes to DOM attributes values are propogated to the directive, but not the other way around. (one-way)

#### Lecture 29 Parts 1 and 2 - Using Controllers Inside Directives

Sometimes you want to add behaviour to the directives (inside the template).

```javascript
function MyDirective () {
  var ddo = {
    scope: {
      prop: '=', // is a Bi-directional binding or
      prop: '<', // is a one-way binding the _Preferred_ method because it
                // conserves resources
    },
    controller: ControllerFunction,
    bindToController: true,
    controllerAs: 'myCtrl', // use in the directive
    templateUrl: 'template.html'
  };
  return ddo;
};

ControllerFunction.$inject = ['Service'];
function ControllerFunction(Service) {
  var myCtrl = this;

  myCtrl.method = function () {
    var name = "Hello " + myCtrl.prop;
  };
};
```
and then use it in the template

```html
<div ng-if="myCtrl.method()">
  {{myCtrl.prop}}
</div>
```

##### Summary
* To add functionality to the directive, one choice is to use a controller that's declared directly on the DDO
* User controller property to declare the controller in the DDO
* Use the bindToController and controllerAs props to bind the properties declared in the isolate scope directly to the controller instance
* Then define the controller function as usual
* Whenever possible, use '<' for one-way bindings to save resources instead of the Bi-directional binding with '='

#### Lecture 30, Part 1 and 2 - Directive APIs and "&"

Sometimes the directives need to refer to the parent to provide info only the directive would know about. Or maybe call some parent method, all while get the appropriate scope correct. Parent methods need to execute in the parent's scope not the isolate scope declared in the directive's DDO.

Step 1: Define Method in Controller
```javascript
function Controller() {
  this.method = function(arg1) {
    this.prop = "Hi " + arg1;
  };
  // 'this' refers to the parent controller instance
  // arg1 needs to come from the child directive
};
```

Step 2: Declare Method Reference in directive
```javascript
function MyDirective() {
  var ddo = {
    scope: {
      myMethod: '&method'
    },
    ...
    templateUrl: 'template.html'
  };
  return ddo;
};
```
* myMethod is a property name to reference the parent method in the directive
* method is the attribute name to use in the parent template on this directive

Step 3: Declare In Parent's Template
```html
<div ng-controller="Controller as ctrl">
  <my-directive method="ctrl.method(myArg)">
  </my-directive>
</div>
```
* ctrl.method is a reference to method in controller
* myArg is a Placeholder label for value to be passed from the directive

Step 4: Map Method & Args in Directive's Template
```html
<button ng-click="dirCtrl.myMethod({myArg: 'v1'});">Remove Item</button>
```
* myMethod is the Method name from the isolate scope mapping
* myArg - map of parent template declare arg name to value from directive. What's been passed into the method is a map object.

##### Summary
* '&' binding allows us to execute an expression (such as a function value) in the context of the parent scope
* Parent template must declare an attribute providing:
  * Method reference to call on the parent
  * Argument keys for directive to bind values to
* Directive:
  * Calls the referenced method
  * Provides a map of argument key to value pairs
  * Allows directive to pass data back to parent from isolate scope

#### Lecture 31, Parts 1 & 2 - Manipulating the DOM with link

Step 1: Declare Link function

```javascript
function MyDirective() {
  var ddo = {
    scope: {
      link: LinkFunction
    },
    ...
    templateUrl: 'template.html'
  };
  return ddo;
};
```
Step 2: Define the Link Function
```javascript
function LinkFunction(scope, element, attrs, controller) {
  ...// scope is not $scope but just passed in
  //
  // attrs is an object
}
```

##### Summary

* DOM manipulation is usually done inside of the link function
  * Which is declared on the DDO
* Link function does not support injection
  * to use injected components, services etc. just inject them into the directive and pass them to the call them directly
* 'scope' parameter is the exact $scope in the directive's controller
* 'element' object represents the element of the directive
  * Top level element
  * It's jqLite object or jQuery object (if jQuery is included)

#### Lecture 32, Parts 1 & 2 - Using Directive's transclude to Wrap Other Elements

Directive that have the transclude property in the DDO's scope set, can have template content that isn't evaluated in the directive's scope but in the parent's scope.

Step1: Set transclude to true

```javascript
function MyDirective() {
  var ddo = {
    scope: {
      transclude: true
    },
    ...
    templateUrl: 'template.html'
  };
  return ddo;
};
```

Step 2: Wrap some Parent Content
```html
<my-directive>
  <span>
    WARNING! WARNING! {{ctrl.someProp}}
  </span>
<my-directive>
```
ctrl.someProp will be evaluated in the parent controller, NOT in our directive.

Step 3: Use ng-transclude to Place Wrapped Content in our directive
```html
<div>
  ...
  <div ng-transclude></div>
</div>
```

##### Summary

* transclude allows whole templates to be passed into a directive
* The wrapped content is evaluated in the parent's context, NOT in the directive's context
* In the DDO:
  * transclude: true
* In directive's template:
  * ng-transclude attribute designates the place for the evaluated wrapped content to be inserted.
