define( [], function() {

    var Game = function( options ) {

        options = options || {};

        this.sprites = options.sprites;
        this.screens = options.screens;
        this.screenFlow = options.screenFlow;
        this.interactions = options.interactions;
        this.clocks = options.clocks;
        this.ticksPerSecond = options.ticksPerSecond;
        this.musics = options.musics;
        this.soundEffects = options.soundEffects;

    };

    return Game;

} );