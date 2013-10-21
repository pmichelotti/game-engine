define( [ 'timing/clock/ClockFactory' ], function( ClockFactory ) {

    var TimingEngine = function( options ) {

        options = options || {};

        var self = this;

        this.ticksPerSecond = null;
        this.millisecondsPerTick = null;

        this.gameClocks = Array();

        this.game = null;
        this.gameEngine = null;

        this.reset = function() {

            self.game = null;
            self.gameEngine = null;
            self.ticksPerSecond = null;
            self.millisecondsPerTick = null;
            self.gameClocks = Array();

        };

        /**
         * Registration of a Game involves extraction of the game's defined ticks per second and a game's defined
         * clocks. A game's clocks are defined under the property gameClocks. Each game clock consists of at least an id
         * as well as one of units or time. A clock with a units property indicates that the clock is unit based and
         * should trigger every time that number of units is hit regardless of the time per unit. A time property
         * indicates that the clock is time based and should trigger every time that amount of time has gone by
         * regardless of how many ticks that takes.
         * 
         * @param game
         *            The game to be registered
         * @param gameEngine
         *            the game engine registering the game with this timing engine
         */
        this.registerGame = function( game, gameEngine ) {

            self.reset();

            if ( !game || !gameEngine ) {
                return;
            }

            self.game = game;
            self.gameEngine = gameEngine;

            self.ticksPerSecond = game.ticksPerSecond;

            self.millisecondsPerTick = 1000.0 / self.ticksPerSecond;

            if ( game.gameClocks && game.gameClocks.length ) {

                game.gameClocks.forEach( function( curGameClockDefinition ) {

                    /*
                     * Push a new Game Clock into the array of game clocks using the Game Clock Factory for the
                     * construction of the clock. The callback delegates clock processing to the game engine.
                     */
                    self.gameClocks.push( ClockFactory( curGameClockDefinition.id, {
                        time : curGameClockDefinition.time,
                        units : curGameClockDefinition.units,
                        callback : function( clockId, elapsed ) {
                            if ( self.gameEngine && self.gameEngine.handleGameClockEvent ) {
                                self.gameEngine.handleGameClockEvent( clockId, elapsed );
                            }
                        }
                    } ) );

                } );

            }
        };

        this.start = function( options ) {

        };

        /**
         * Iterate through all of the game clocks calling the tick function on each passing a durration equal to the
         * milliseconds per tick calculated upon registration of the game.
         */
        this.tick = function() {

            self.gameClocks.forEach( function( curGameClock ) {
                curGameClock.tick( self.millisecondsPerTick );
            } );

        };

    };

    return TimingEngine;

} );