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

            /*
             * Register the game and engine with all contained engines
             */
            self.interactionEngine.registerGame( currentGame, self );
            self.screenEngine.registerGame( currentGame, self );
            self.timingEngine.registerGame( currentGame, self );
            self.renderingEngine.registerGame( currentGame, self );
            // self.musicEngine.registerGame( currentGame, self );
            // self.soundEffectsEngine.registerGame( currentGame, self );

            /*
             * Start the timing engine
             */
            self.timingEngine.start();

        };

        /*
         * Clock Methods
         */
        this.handleGameClockEvent = function( clockId, timeElapsed ) {

            self.screenEngine.handleClockEvent( clockId, timeElapsed );

        };

        /*
         * Interaction Methods
         */
        this.handleInteraction = function( interactionId, interactionType ) {

            self.screenEngine.handleInteraction( interactionId, interactionType );

        };

        /*
         * Screen Delegators
         */
        this.nextScreen = function( branchId ) {

            self.screenEngine.nextScreen( branchId );

        };

        /*
         * Rendering Delegators
         */
        this.setScreenSize = function( width, height ) {
            self.renderingEngine.setScreenSize( width, height );
        };

        this.renderSprite = function( sprite, position ) {
            self.renderingEngine.renderSprite( sprite, position );
        };

    };

    return GameEngine;

} );