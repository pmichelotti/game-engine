define( [], function() {

    var GameEngine = function( options ) {

        options = options || {};

        var self = this;

        this.screenEngine = options.screenEngine;
        this.timingEngine = options.timingEngine;
        this.interactionEngine = options.interactionEngine;
        this.renderingEngine = options.renderingEngine;
        this.musicEngine = options.musicEngine;
        this.soundEffectsEngine = options.soundEffectsEngine;

        var currentGame = null;

        this.startGame = function( game ) {
            currentGame = game;

            self.interactionEngine.registerGame( game );
        };

    };

    return GameEngine;

} );