define( [ 'timing/clock/TimeBasedClock', 'timing/clock/UnitsBasedClock' ], function( TimeBasedClock, UnitsBasedClock ) {

    var ClockFactory = function( id, options ) {

        if ( options.time ) {
            return new TimeBasedClock( id, options );
        }

        return new UnitsBasedClock( id, options );

    };

    return ClockFactory;

} );