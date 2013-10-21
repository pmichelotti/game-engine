define( [], function() {

    var ScreenEngine = function( options ) {

        options = options || {};

        var self = this;

        this.currentScreen = null;

        this.gameEngine = null;

        this.nextScreen = function( nextScreenId ) {

        };

    };

    return ScreenEngine;

} );