Coursera - Single Page Webapps using AngularJS - 2016-09-07
=====

## Lecture Notes:

### Week5

#### Module 5
Covers form validation and testing. Then there is an AngularJS redo of the restaurant website from the previous class.

#### Lecture 42 - Form Validation

A form is just a way to grap input. There are lots of input type elements, textfields, checkboxs etc. Grouping them together with a `<form></form>` tag is not required, but good practice and is needed by AngularJS form validation. The input type of 'submit' is largely historical when the browser used to collect the input and group it together(build key-value pairs) and send it off to some server (make a request with those parameters) according to the action attribute. The action attribute doesn't fit well into the Single-Page-Application paradigm, but the submit type natively renders as a button so it can still be used (or you could use the HTML button tag).  

To set up form validation:

Step 1: Create a form in HTML with name attributes
```html
<form name='formName'>
  <input type="text" name="name">
  <button>Submit</button>
</form>
```

Step 2: Bind Input with ng-Model

Form validation functionality is introduced into our form with the ng-model directive we've used before.  
So within a surrounding context that has a controller named 'ctrl' on it the form becomes:
```html
<form name='formName'>
  <input type="text" name="name" ng-model="ctrl.name">
  <button ng-click="ctrl.go()">Submit</button>
</form>
```

Step 3: Declare HTML5 Validation Attributes

```html
<form name='formName' novalidate>
  <input type="text" name="name" ng-model="ctrl.name" required min-length="4">
  <button ng-click="ctrl.go()">Submit</button>
</form>
```
Angular versions of some/all? of the validation attributes, such as ng-min-length, can be used if you want to handle them within the controller(using it's logic etc.).  
To have Angular handle the form validation you first have to tell the simpler HTML5 validation that it isn't required, by specifying the 'novalidate' attribute on the form element.  

Step 4: Use AngularJS Form Bound Objects

```html
<form name='formName' novalidate>
  <input type="text" name="name" ng-model="ctrl.name" required min-length="4">
  <span ng-if="formName.name.$error.required && formName.name.$touched">Name is required</span>
  <button ng-click="ctrl.go()"
          ng-disabled="formName.$invalid">Submit</button>
</form>
```
When AngularJS sees the form tag it automatically creates a controller for the form and the form contents. Plus a number of bound properties on the form itself. For example you can use the $invalid property to conditionally enable/disable the submit button.   

Step 5: Use AngularJS Validation Styles

```css
.ng-touched.ng-valid {
  border: 2px green solid;
}
.ng-touched.ng-invalid {
  border: 2px red solid;
}
```
AngularJS is automatically, in the background, adding and removing validation status classes to/from the form elements that we can use in our stylesheets.
See ng-model, ng-model-controller and ng-form documentation for details on the form attributes and classes.
