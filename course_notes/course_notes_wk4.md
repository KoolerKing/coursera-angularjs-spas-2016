Coursera - Single Page Webapps using AngularJS - 2016-09-07
=====

## Lecture Notes:

### Week4

#### Module 4

It's an intro to component based architecture and finishes with some coverage of ui-router.

#### Lecture 33, Part 1 - Components and Component Based architecture

* Components only control their own View and Data.
   * Never modify data or DOM outside their own scope.
   * Modifying creates side-effects that lead to chaos
   * Therefore, Angular components always use isolate scope
* Components have well-defined public API - Inputs and Outputs
   * Inputs: use '<' and '@' bindings only
   * Never change any property of passed in objects or arrays
   * Outputs: use '&' for component event callbacks
   * Pass data to callback through a param map {key: val}
* Components have well-defined lifecycles
  * they pre-defined methods you can tap into during the lifecycle of the component
  * $onInit - controller initialization
  * $onChanges(changeObj) -  called Whenever one-way bindings are updated.
    * it has changeObj.currentValue, changeObj.previousValue and other things
  * $postLink - similar to 'link' method in directive, called after this element and its children have been linked.
  * $onDestroy - when the scope is about to be destroyed
  * $doCheck() - gets called on each turn of the digest cycle. (only is later versions of AngularJS >= v1.5.8), useful when checking deep object changes that AngularJS's change detector might miss. It is invoked with no arguments, you must store pervious values for comparison/action on your own. So you don't have to set up your own watches which means you have to inject $scope, just use this hook.
* So Application should be viewed as a tree of Components
  * entire app should be comprised of Components
  * Each one would have a well-defined input and output
  * 2-way binding is minimized as much as possible - which helps predict when and where data changes.

Steps to create a component:

Step 1: Register the Component
```javascript
angular.module('App', [])
.component('myComponent', {
   templateUrl: 'template.html',
   controller: ComponentController,
   bindings: {
      prop1: '<',
      prop2: '@',
      onAction: '&'
   }
});
```
* the component name is normalized, so in html this would be my-component
* the config object is a simple object literal

Step 2: Configure the Component
* you almost always have a template or templateUrl.
* you are not required tro have a controller. An empty function is provided automatically and place it on the scope with the label '$ctrl'. You only provide one if you need to extend the functionality.
* you don't see scope there because in components it's always there as isolate scope and you can't change it. Instead you have the 'bindings' property. 'bindings' is the isolate scope parameter mapping definition.

Step 3: Reference Properties in The Component Template
```html
<div ng-click="$ctrl.onAction({myArg: 'val'})">
   {{ $ctrl.prop1.prop }} and {{ $ctrl.prop2 }}
</div>
```

Step 4: Use Component in HTML
```html
<my-component prop1="val-1" prop2="@parentProp" on-action="parentFunction(myArg)">
  {{ $ctrl.prop1.prop }} and {{ $ctrl.prop2 }}
</my-component>
```
It's use is the same as the directives we've used before.

##### Summary
* Components encourage component-based architecture
  * But they don't enforce it 100%, so we must follow conventions.
* Components should never modify data or DOM that doesn't belong to them
  * That's why it always has isolate scope and well-defined API
* Register component with .component('name', configObj) - a configuration object, not a function/factory-function.
* Provide a controller only if you are adding extra functionality
  * Otherwiise, AngularJS already provides an empty function for us.


#### Lecture 34 - AngularJS Event System

The publish-subscribe design patter can help solve some of the problems that can arise when trying to communicate between different components in the DOM. Publishers send messages to subscribers on a common channel.

* Publishers:
  * Mark messages with a classification
  * Don't know subscribers or even if there are any
* subscribers:
  * Sign up to listen for messages with a particular classification
  * Don't know publishers or even if there are any
* In AngularJS, the common channel is scope
  * Messages are events that can hold data

Publishing an Event:
* Publishers have two methods to publish events
  * $scope.$emit sends events up the scope chain
  * $scope.$broadcast sends events down the scope chain
  * events are of the form: event('eventName', {msg: 'StringData'})

Subscribing to an event:
* use the $scope.$on('eventName', handlerFunction) method

For disconnected components (not in the same scope chain):
* use the $rootscope.$broadcast method

So then to use

Step 1: Broadcast or Emit an Event
```javascript
$scope.$broadcast('namespace:eventName', {prop: value});
```
Best practice is to namespace all events in the manner above

Step 2: Register a listener and a handler for the Event
```javascript
$scope.$on('namespace:eventName', handler);

function handler(event, data) {
  if (data.prop === 'val1') {
    ...
  }
};
```

The $on function returns a deregistration function. So, in the $rootscope, you must use it to deregister the function and prevent memory/code leaks.
```javascript
var cancelListener = $rootscope.$on(...)

$ctrl.$onDestroy = function () {
   cancelListener();
};
```

##### Summary
* Publish-subscribe design pattern is implemented using the AngularJS Events system.
* You can publish events from anywhere in the system and listen for those events anywhere in the system.
* $scope.$emit sends the event up the scope chain.
* $scope.$broadcast sends the event down the scope chain.
* To broadcast to all nodes, use $rootscope.$broadcast
* To listen for events, use either $scope.$on or $rootscope.$on
* Deregister listener when using $rootscope.$on


#### Lecture 35 - Modules

Step 1: Declare/Create a Module, and specify other modules as dependencies

```javascript
angular.module('module1', []);
angular.module('module2', []);
angular.module('module3', ['module1', 'module2']);
```
* where the second argument is an arry of dependencies.
* if the second argument isn't present then a previously created module is referenced/called
* if a called module doesn't exit, that will result in an error.

Step 2: Declare Module Artifacts

```javascript
angular.module('module1')
.controller('MyController', MyController);
```

Step 3: Call the main module in your HTML

```html
<!DOCTYPE html>
<html ng-app='module3'>
</html>
```

Addtionally - it is a best practice to split Modules and Artifacts into their own files

```html
<script src="src/mod1/module1.js"></script>
<script src="src/mod1/controller.js"></script>

<script src="src/mod2/module2.js"></script>
<script src="src/mod2/component.js"></script>
```

* You can order the module declarations any way you like and angular will figure the proper order out. However the artifacts use/call of modules must still happen after the matching declaration.
* Config methods run before any other methods on the module. And you can only put Providers and constants in the config method.
* run method runs right after the config method. You can only inject instances(like services) and constants.

##### Summary

* angular.module method takes 2 arguments to <u>__create__</u> a module:
  * Name of module
  * Array of string module names as dependencies
* angular.module method with just a name argument retrieves the previouly created module.
  * Then you can declare components, controllers etc. on it.
* module.config method fires before module.run method
* All dependency modules get configured first
* It doesn't matter which modules are listed first in the html as long as module declarations are listed before the artifact declarations on that module.


#### Lecture 36 - Routing

In traditional client-server communication, the server would send whole page requests/updates to the client, in what became to be called coarse grained updates. Routing was a server side responsibility. In Web 2.0, with the introduction of AJAX, client-server communication used background requests to retrieve smaller pieces of data from the server. Then it was up to the brower to dynamically update the image that was already on the screen. This is known as fine-grained updates. However, the downside to this approach is that it breaks the user's use of simple navigation like the back button. That was because the server was still in charge of the routing. In the Single Page Application (SPA) model new view requests are constructed using the originating URL followed by a pound sign plus view info which can be caught and processed by the browser. Part of that processing might be a call out to the server for other views or data but it doesn't have to be. This works because the pound-sign/hash-tag traditionally made the browser scroll down to another link or id on the page. These sorts of urls with the hash-tag are shown in the browser's address bar and are inserted into the history, so all back and forward button requests can be handled correctly.

There is another approach to page navigation that does not rely upon urls. In it we represent each view as a view state, that is we use some javascript object to hold the data the view represents. The URL on the browser's address bar is not updated. Only programmatic state of the view is updated.

There are options as to which routing implementation you use in an angularJS app.

ngRoute:
* seperate JS files
* Developed by Google and community
* No concept of UI state
* Every route must be represented by a URL
* No concept of nested views
* OK for prototype projects

ui-router:
* also a seperate JS file
* Developed by the community
* UI state is central
  * Can have a route with no unique URL for that route
* URL routing is also supported
  * UI state is updated based on the URL
* Nested views supported
* Better choice for more serious projects.
* so will use in this package.

Basic use of the ui-router package:

Step 1: Reference it in your HTML

```html
<script src="lib/angular.min.js"></script>
<script src="lib/angular-ui-router.min.js"></script>
```

Step 2: Place ui-view Initial View Placeholder

```html
<body>
  ...
  <ui-view></ui-view>
  ...
</body>
```
The view content will be loaded in place of the ui-view tag.

Step 3: Declare the ui-router as a dependency

```javascript
angular.module('App', ['ui.router']);
```

Step 4: Configure the Routes in .config method
```javascript
angular.module('App')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/view1');
  ...
  $stateProvider
  .state('view1', {
    url: '/view1',
    template: '<div>...</div>',
    templateUrl: 'view1.html'
  })
  .state('view2', {...});
}
```
* The url option is optional, it will insert the value into the address bar.
* Use the template or templateUrl option to determine the content that will replace the ui-view tag in your HTML.
* Note that the state method is chainable.
* To handle user mistypes in the address bar and other mishaps it is common practice to configure a default route/view as shown  with the otherwise method on the $urlRouterProvider.

Get ui-router from a CDN (Content Delivery Network). Current version is 0.3.1.

```html
<div class="tabs">
  <a ui-sref="tab1" ui-sref-active="activeTab">Tab 1</a>
  <button ui-sref="tab2" ui-sref-active="activeTab">Tab 2</button>
</div>
```
Each state is defined such that the url option is optional and accessible with only its name.  
The ui-sref attribute is a _state reference_, which can automatically generate links and actions to configured states.  
The ui-sref-active attribute references a css entry for styling purposes.


##### Summary

* ui-router uses independent concepts for URL mapping and UI state representation.
* Configure ui-router in angular.config:
  * Provide alternate URL mapping with $urlRouterProvider.otherwise('alternateURL')
  * Configure states with optional URLs using $stateProvider.state('name', {url: '...', templateURL: '...'})
* Use <ui-view> tag as a placeholder for the state-based UI
* use ui-sref attribute to make elements clickable and to automatically construct links and actions to configured states.


#### Lecture 37 - Routing State with Controller

You can declare a controller as responsible for the view model of the html given as a template/templateUrl in a $stateProvider.state method.

```javascript
.state('home', {
  url: '/',
  templateUrl: 'home.html',
  controller: 'HomeCtrl as home'
});
```
So then, having pulled the controller/controller as declaration out of the html, it is possible to potentially reuse the html with another controller somewhere else.

##### Summary
* We can declare a Controller that is responsible for the state's template right in the state's declaration.
* Use
  * controller: 'CtrlName as label' or
  * controller: 'CtrlName',  
    controllerAs: 'label'
* In the template, use label.data as usual with the controllerAs syntax as we've done before.


#### Lecture 38 - Routing state with resolve

Step 1: Set up resolve Property
```javascript
.state('view1', {
  url: '/view1',
  templateUrl: 'view1.html',
  controller: 'View1Ctrl as view1',
  resolve: {
    myData: ['Service', function (Service) {
      return Service.getData();
    }]
  }
});
```
The return value of myData is injected into View1Ctrl as 'myData'.  
AngularJS will wait for the data to resolve before switching to the view.

Step 2: Inject Resolve Property into Controller
```javascript
View1Ctrl.$inject = ['myData'];
function View1Ctrl(myData) {
  var view1 = this;
  view1.myData = myData;
};
```
The resolve properties don't have to be promises, they can be anything, even simple things like strings, we want to inject into the corresponding controller.

##### Summary
* resolve property can be used to inject values directly into the controller responsible for the state.
* If the resolve property is a promise
  * The router will wait for it to resolve before transitioning to the state
  * If rejected, the router will not transition to the new state at all.
* The name of the key in the resolve's property object is what is to be injected into the corresponding controller's function.
* Resolve can have properties that contain anything: objects, strings, etc.


#### Lecture 39 - Routing State with URL Parameters

Step 1: Set up URL Property with Param(s)
```javascript
.state('view1', {
  url: '/view1/{param1}',
  templateUrl: 'view1.html',
  controller: 'View1Ctrl as view1',
  resolve: {
    myData: ['$stateParams', function ($stateParams) {
      return getDataBasedOn($stateParams.param1);
    }]
  }
});
```
`url: '/view1/{param1}'` matches:
  * /view1/
  * /view1/Hello
  * /view1/12
  * or even a regular expression

Step 2: Inject the Resolve Property into the Controller
```html
<a ui-sref="view1({itemId: 'someVal'})">
  Link to view with data
</a>
<!-- OR -->
<a ui-sref="view1({itemId: '{{someCtrl.someotherValue}}'})"></a>
```
Notice the single quotes around the value/interpolated_value

##### Summary
* State's url property can be declared with parameters
* Parameters:
  * Wrapped in curly braces /{paramName}
  * Can have more complex matching rules other than just a string
  * Support regular expression matching
* Use $stateParams service to retrieve parameters
  * $stateParams.paramName
* Construct a URL with ui-sref directive:
  * ui-sref="stateName({paramName: value})"


#### Lecture 40 - Routing State with Nested Views
* Master-Detail views aren't always appropriate, but for them ...
* Child states inherit state from parents

Setting up Child (nested) State
```javascript
// for the parent
.state('view1', {
  ...
  resolve: {
    myData: 'someVal'
  }
})

// then for the child
.state('view1.child', {
  url: '/detail/{param1}',
  templateUrl: 'view1Detail.html',
  controller: "ChildCtrl as child"
  ...

});

// where the parent data can be directly injected into the child controller
ChildCtrl.$inject = ['myData'];
function ChildCtrl(myData) {
  ...
}
```
This avoids extra server side calls when the data has already been pre-fetched for/in the parent.  
Remember that the URL is optional, however if it is removed angular would have no way of determining the value for the parameter. So you would then have to specify the params as follows:
```javascript
.state('view1.child', {
  //url: '/detail/{param1}',
  templateUrl: 'view1Detail.html',
  controller: "ChildCtrl as child"
  params: {
    itemId: null  // just a placeholder value, will fill at run time.
  }
  ...
});
```
The transition to the UI state is now done with actions and now does not have a URL associated with it.

##### Summary
* Nested states allow us to logically represent nested views
* Parent state template HTML has a ui-view tag into which the child state's template HTML will be inserted.
* Child state name is usually declared with syntax 'parent.child'
* The optionally declared url of the child gets concatenated to the declared url of the parent.
* The parent's resolve property is inherited by the child and is injectable directly into the child's controller.


#### Lecture 41 - Router State Transition Events

Since the router does lots of things in the background including sometimes reaching out to servers to fetch data, it is useful to plug into different events that occur as the router performs its functions. All router events occur at the $rootscope level, that is they are broadcast down the DOM tree allowing all elements to respond.

Some of the events ui-router fires:

>$stateChangeStart  
>fires when state change transition begins   

```javascript
$rootScope.$on('$stateChangeStart',
   function(event, toState, toParams, fromState, fromParams, options)) {
     ...
  });
```
This a good place to fire off a spinner.


>$stateChangeError  
>fires when an error occurs during transition

```javascript
$rootScope.$on('$stateChangeError',
   function(event, toState, toParams, fromState, fromParams, error)) {
     ...
  });
```

>$stateChangeStart  
>Use event.preventDefault() to prevent the transition from occuring
>
>If you wanted to evaluate some data and decide whether or not to proceed this is the place to do it. Then the above method can be called to stop the transition.

See Lecture 41 example code to see a spinner implementation that respond to stateChange events.  

Documentation for ui-router can be found at [Github](https://github.com/angular-ui/ui-router) and then scroll down to the [in-depth guide](https://github.com/angular-ui/ui-router/wiki).  
Although it isn't ready yet, watch out for version 1.0. Which is moving toward a component centric architecture, as in Angular 2.0. Once it's released you won't even have to specify controllers in your states you will be able to specify components that will be responsible for the entire state you are defining.

##### Summary

* ui-router exposes numerous state change events that our code is able to listen for.
* All ui-router events are fired on the $rootScope.
* $stateChangeStart - starts the state transition
  * Call event.preventDefault() to prevent the transition.
* $stateChangeSuccess indicates a successful transition end.
* $stateChangeError indicates that the transition failed, including having errors in the resolve.
  * Listen for this event to catch ALL error during state changes (or they might be swallowed and not even show up in the console).


#### Module 4 Wrap-up

Congratulations! The skills you now possess enable you to create nice and elegant Single Page Web Applications. All that's left is to practice.
