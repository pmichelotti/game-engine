define( [], function() {

    var Game = function( options ) {

        options = options || {};

        this.sprites = options.sprites;
        this.screens = options.screens;
        this.screenFlow = options.screenFlow;

    };

    return Game;

} );