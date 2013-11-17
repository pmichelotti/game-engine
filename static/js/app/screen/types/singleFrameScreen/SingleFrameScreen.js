define( [ 'interaction/InteractionTypes' ], function( InteractionTypes ) {

    var INFINITE_DURATION = 'infinite';

    var SingleFrameScreen = function( id, options ) {

        options = options || {};

        var self = this;

        this.id = id;

        this.sprite = options.sprite;
        this.frame = options.frame;
        this.size = options.size;
        this.bypassInteractionId = options.bypassInteractionId;
        this.duration = options.duration || INFINITE_DURATION;

        this.durationClockId = options.durationClockId;

        this.gameEngine = null;

        var remainingDuration = this.duration;
        var acceptingInteractions = false;

        /**
         * Registers the game engine with the screen instance and resets the duration in case the screen was previously
         * used. This method is called by the game engine when this screen becomes the current screen.
         */
        this.start = function( gameEngine ) {

            self.gameEngine = gameEngine;
            remainingDuration = self.duration;
            acceptingInteractions = true;

        };

        this.end = function() {

        };

        /**
         * For a Single Frame Screen - the only aspect of clock events which are of interest is the elapsed time. If a
         * duration was set for the screen then the screen should indicate to the game engine that it needs to
         * transition to the next screen when that duration is reached. The handleClockEvent method checks whether the
         * clock ID matches the ID specified as the duration clock and if it does, tracks the elapsed time accordingly.
         */
        this.handleClockEvent = function( clockId, elapsed ) {
            if ( self.duration !== INFINITE_DURATION && clockId === self.durationClockId ) {
                remainingDuration = remainingDuration - elapsed;

                if ( remainingDuration <= 0 && self.gameEngine ) {
                    self.gameEngine.nextScreen( self );
                }
            }
        };

        /**
         * If the screen is accepting interactions and the interaction proffered is the defined bypass interaction, then
         * we call upon the game engine to transfer to the next screen and we stop accepting interactions.
         */
        this.handleInteraction = function( interactionId, interactionType ) {

            if ( acceptingInteractions && self.bypassInteractionId && interactionId === self.bypassInteractionId ) {
                if ( interactionType === InteractionTypes.EXECUTE ) {
                    acceptingInteractions = false;
                    self.gameEngine.nextScreen();
                }
            }

        };

        /**
         * Render the single sprite frame using the game engine's abstract rendering API
         */
        this.render = function() {
            if ( !self.gameEngine ) {
                return;
            }

            self.gameEngine.renderSprite( self.sprite, {
                top : 0,
                left : 0
            } );
        };

    };

    SingleFrameScreen.id = 'single-frame-screen';

    return SingleFrameScreen;

} );