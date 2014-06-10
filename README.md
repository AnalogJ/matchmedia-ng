matchmedia-ng
============

matchmedia-ng is a set of [AngularJS](http://angularjs.org/) bindings and helper functions for the [matchMedia javascript api](https://developer.mozilla.org/en-US/docs/Web/API/Window.matchMedia).
With matchMedia, AngularJS and matchmedia-ng you can automatically respond to the orientation, browser height, width and other properties supported by CSS Media Queries.

matchmedia-ng provides two core methods `.is()` and `.on`.

`.on()` is syntactically similar to the angular `.$on()` method, providing a way to listen on media queries and respond.
`.is()` is just a simple alias for the `matchMedia().matches` method.

Both `on()` and `is()` have aliases provided for the following common media queries:

- print - `print`
- screen - `screen`
- phone - `(max-width: 767px)`
- tablet - `(min-width: 768px) and (max-width: 979px)`
- desktop - `(min-width: 979px)`
- portrait - `(orientation: portrait)`
- landscape - `(orientation: landscape)`

They can be used as `onPrint()`, `isPortrait()`, `onLandscape()` etc. 



### Live Demo: <a target="_blank" href="http://analogj.github.io/matchmedia-ng/">AngularJS Media Query App</a>.

Check out the `github-pages` branch for more the live demo code.

Install
-----

    bower install matchmedia-ng

Usage
-----
Include [angular.js](//ajax.googleapis.com/ajax/libs/angularjs/1.2.7/angular.min.js) and mediastore-ng.js in your application.
Optionally you can include the matchMedia polyfill if are worried about [browser compatibility](https://developer.mozilla.org/en-US/docs/Web/API/Window.matchMedia#Browser_compatibility) 

```html
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.7/angular.min.js"></script>
<script src="matchmedia.js"></script>
<script src="matchmedia-ng.js"></script>
```

Add the module `matchmedia-ng` as a dependency to your app module:

```js
var myapp = angular.module('myapp', ['matchmedia-ng']);
```

Quick Start
----------------------------------

Set `matchmedia` as a service dependency in your controller:

```js
myapp.controller('MyCtrl', ['$scope', 'matchmedia',
  function MyCtrl($scope, matchmedia) {
    ...
  }
]);
```
If you would like to execute javascript code to load a higher resolution image when the page loads on a tablet rather than a mobile phone, you could do something like the following in your controller:

```js
$scope.tablet = matchmedia.isTablet();
if($scope.tablet){
	$scope.primaryImg = "images/primary@2x.png";
}

```

If you would like to do something a bit more complicated, such as detect when the user drags the page below the threshold of a mobile phone, you can do something like this:

```js
var unregister = matchmedia.onPhone( function(mediaQueryList){
  $scope.isPhone = mediaQueryList.matches;
});

```

Or even execute javascript when the user attempts to print the page.
```js
var unregister = matchmedia.onPrint( function(mediaQueryList){
  $scope.isPrint = mediaQueryList.matches;
  //hide ads, show water mark, pause animations/video, etc.
});

```

See the source for the
[controller behind the demo app](http://analogj.github.io/matchmedia-ng/index.html)
for a working example code.


Custom Media Queries
-----------
Though the common media query aliases are helpful, in some cases you will want to execute javascript on very specific media queries (maybe in tandem with a specific css media query). In that case you can use the core `.on()` and `.is()` functions;

__on()__

    /**
     * @param {string} query Media query to listen on.
     * @param {function(mediaQueryList)} listener Function to call when the media query is matched.
     * @param {$scope} $scope Optional AngularJS scope, if not provided will use $rootScope
     * @returns {function()} Returns a deregistration function for this listener.
     */
    matchmedia.on(query, listener, $scope)

	
	matchmedia.on('tv and (min-width: 700px) and (orientation: landscape)', function(mediaQueryList){
		console.log(mediaQueryList.matches);
	}

__is()__

	/**
     * @param {string} query media query to test.
     * @returns {boolean} Returns true if the media query matches.
     */
    matchmedia.is(query)

	var resp = matchmedia.is('(min-width: 700px), handheld and (orientation: landscape)');


Aliases & Shortcuts
-----------
The following is a comprehensive list of the media query aliases.
 
	matchmedia.onPrint(listener, $scope)
    matchmedia.onScreen(listener, $scope)
    matchmedia.onPhone(listener, $scope)
    matchmedia.onTablet(listener, $scope
    matchmedia.onDesktop(listener, $scope)
    matchmedia.onPortrait(listener, $scope)
    matchmedia.onLandscape(listener, $scope)

    matchmedia.isPrint()
    matchmedia.isScreen()
    matchmedia.isPhone()
    matchmedia.isTablet()
    matchmedia.isDesktop()
    matchmedia.isPortrait()
    matchmedia.isLandscape()

###Override Aliases
It is possible to override the media queries given for the aliases above by using a `config` function.

```js
angular.module('myapp', ['matchmedia-ng']).config(['matchmediaProvider', function (matchmediaProvider) {
      matchmediaProvider.rules.phone = "(max-width: 500px)";
      matchmediaProvider.rules.desktop = "(max-width: 1500px)";
   }]);

```

Logging
-----------
You can enable logging by using the following snippet in your code.

```js
    .config(['loggerProvider',function(loggerProvider){
        loggerProvider.setDEVMODE(true);
    }])
```
TODO
-----------
- Add more documentaton regarding the matchmedia queries. (full options list).
- Example with polyfill.
- Tests for the matchmedia-ng framework are coming shortly.

Pull Requests
-----------
To make a pull request, please do the following:

Mention what specific version matchmedia-ng.js you were using when you encountered the issue/added the feature. This can be accessed by looking at the matchmedia-ng.js file header.
Provide a pastie or gist that demonstrates the bug/feature
Do not modify the version header. I will modify that manually when merging the request


License
-------
Copyright (c) 2013 Jason Kulatunga, released under the [MIT license](http://analogj.mit-license.org/)
