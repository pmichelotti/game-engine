define( [], function() {

    var TimeBasedClock = function( id, options ) {

        options = options || {};

        var self = this;

        this.id = id;
        this.time = options.time;
        this.callback = options.callback;

        var timeRemaining = this.time;

        this.tick = function( durration ) {

            timeRemaining = timeRemaining - durration;

            if ( timeRemaining <= 0 ) {

                if ( self.callback ) {
                    self.callback( self.id, self.time );
                }

                timeRemaining = self.time + timeRemaining;

            }
        };

        this.reset = function() {
            timeRemaining = self.time;
        };

    };

    return TimeBasedClock;

} );