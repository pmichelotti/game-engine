define( [], function() {

    var ScreenEngine = function( options ) {

        options = options || {};

        var self = this;

        this.game = null;
        this.screenFlow = null;
        this.currentScreen = null;
        this.gameEngine = null;

        this.renderingClockId = null;

        this.nextScreen = function( nextScreenId ) {

            /*
             * TODO: Transition handling
             */
            self.currentScreen.end();
            self.currentScreen = self.screenFlow.nextScreen( nextScreenId );
            self.currentScreen.start( self.gameEngine );

        };

        this.registerGame = function( game, gameEngine ) {

            self.game = game;
            self.gameEngine = gameEngine;

            self.screenFlow = game.screenFlow;
            self.screenFlow.start();

            self.currentScreen = screenFlow.getCurrentScreen();
            self.currentScreen.start( self.gameEngine );

            self.renderingClockId = game.properties.renderingClockId;

        };

        /**
         * First allow the current screen an opportunity to handle the clock event. Then, if the clock in question is
         * the clock defined as the rendering clock, call render.
         */
        this.handleClockEvent = function( clockId, timeElapsed ) {

            self.currentScreen.handleClockEvent( clockId, timeElapsed );

            if ( clockId === renderingClockId ) {
                self.render();
            }

        };

        /**
         * Delegates interaction handling to the screen
         */
        this.handleInteraction = function( interactionId, interactionType ) {

            if ( self.currentScreen && self.currentScreen.handleInteraction ) {
                self.currentScreen.handleInteraction( interactionId, interactionType );
            }

        };

        this.render = function() {

            self.gameEngine.clear();

            /*
             * Render the current screen
             */
            self.currentScreen.render();

            /*
             * Render any transition
             */

        };

    };

    return ScreenEngine;

} );