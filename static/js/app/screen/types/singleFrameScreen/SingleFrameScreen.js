define( [], function() {

    var INFINITE_DURATION = 'infinite';

    var SingleFrameScreen = function( id, options ) {

        options = options || {};

        var self = this;

        this.id = id;

        this.sprite = options.sprite;
        this.frame = options.frame;
        this.duration = options.duration || INFINITE_DURATION;

        this.durationClockId = options.durationClockId;

        this.gameEngine = null;

        var remainingDuration = this.duration;

        /**
         * Registers the game engine with the screen instance and resets the duration in case the screen was previously
         * used. This method is called by the game engine when this screen becomes the current screen.
         */
        this.start = function( gameEngine ) {

            self.gameEngine = gameEngine;
            remainingDuration = self.duration;

        };

        /**
         * For a Single Frame Screen - the only aspect of clock events which are of interest is the elapsed time. If a
         * duration was set for the screen then the screen should indicate to the game engine that it needs to
         * transition to the next screen when that duration is reached. The handleClockEvent method checks whether the
         * clock ID matches the ID specified as the duration clock and if it does, tracks the elapsed time accordingly.
         */
        this.handleClockEvent = function( id, elapsed ) {
            if ( self.duration !== INFINITE_DURATION && id === self.durationClockId ) {
                remainingDuration = remainingDuration - elapsed;

                if ( remainingDuration <= 0 && self.gameEngine ) {
                    self.gameEngine.nextScreen( self );
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