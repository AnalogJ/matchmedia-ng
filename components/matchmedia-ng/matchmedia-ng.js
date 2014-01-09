/* matchmedia-ng v0.0.1 | (c) 2014 Jason Kulatunga, Inc. | http://analogj.mit-license.org/
 */
'use strict';

angular.module("matchmedia-ng", []).
    factory('matchmedia', function($window,safeApply, logger) {

        logger.log('Creating matchmedia');
        ///////////////////////////////////////////////////////////////////////
        // Configuration
        ///////////////////////////////////////////////////////////////////////


        ///////////////////////////////////////////////////////////////////////
        // Private Methods
        ///////////////////////////////////////////////////////////////////////
        function createSafeListener(cb, $scope){
            return function(mediaQueryList){
                safeApply(function() {
                    cb(mediaQueryList);
                },$scope);
            }
        }

        ///////////////////////////////////////////////////////////////////////
        // Public Methods
        ///////////////////////////////////////////////////////////////////////
        //should never be called directly, but is available for custom calls.
        var matchmediaService = {};

        /**
         * @param {string} query media query to listen on.
         * @param {function(event)} listener Function to call when the media query is matched.
         * @returns {function()} Returns a deregistration function for this listener.
         */
        matchmediaService.$on = function(query, listener, $scope) {
            logger.log('adding listener for query: '+ query);
            var mediaQueryList = $window.matchMedia(query);
            var handler = createSafeListener(listener, $scope);
            mediaQueryList.addListener(handler);
            //immediately return the current mediaQueryList;
            handler(mediaQueryList);

            return function() {
                logger.log('removing listener from query: '+ query);
                mediaQueryList.removeListener(handler);

            };
        },


        ///////////////////////////////////////////////////////////////////////
        // Aliased Methods
        ///////////////////////////////////////////////////////////////////////
        matchmediaService.$onPrint = function(listener, $scope){
            return matchmediaService.$on('print',listener, $scope)
        }
        matchmediaService.$onScreen = function(listener, $scope){
            return matchmediaService.$on('screen',listener, $scope)
        }
        matchmediaService.$onPhone = function(listener, $scope){
            return matchmediaService.$on('(max-width: 767px)',listener, $scope)
        }
        matchmediaService.$onTablet = function(listener, $scope){
            return matchmediaService.$on('(min-width: 768px) and (max-width: 979px)',listener, $scope)
        }
        matchmediaService.$onDesktop = function(listener, $scope){
            return matchmediaService.$on('(min-width: 979px)',listener, $scope)
        }
        matchmediaService.$onPortrait = function(listener, $scope){
            return matchmediaService.$on('(orientation: portrait)',listener, $scope)
        }
        matchmediaService.$onLandscape = function(listener, $scope){
            return matchmediaService.$on('(orientation: landscape)',listener, $scope)
        }
        return matchmediaService;
    })
    .factory('safeApply', ['$rootScope',function($rootScope) {
        return function(fn, $scope) {
            $scope = $scope || $rootScope;
            var phase = $scope.$root.$$phase;
            if(phase == '$apply' || phase == '$digest') {
                if (fn) {
                    $scope.$eval(fn);
                }
            } else {
                if (fn) {
                    $scope.$apply(fn);
                } else {
                    $scope.$apply();
                }
            }
        }
    }])
    .provider('logger', function(){
        this.DEVMODE = false;

        this.setDEVMODE = function(devmode){
            this.DEVMODE = devmode;
        }

        this.$get = ['$window',function($window) {
            var DEVMODE = this.DEVMODE;
            var logger = {};
            logger.log = function(){
                DEVMODE && console.log.apply(console, arguments);
            }
            logger.always = function(){
                console.log.apply(console, arguments);
            }
            return logger;
        }]
    })
    .config(function(loggerProvider){
        loggerProvider.setDEVMODE(true);
    });



