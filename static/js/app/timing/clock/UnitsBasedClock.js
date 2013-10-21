define( [], function() {

    var UnitsBasedClock = function( id, options ) {

        options = options || {};

        var self = this;

        this.id = id;

        this.units = options.units;
        this.callback = options.callback;

        var unitsLeft = this.units;

        this.tick = function() {

            unitsLeft = unitsLeft - 1;

            if ( unitsLeft <= 0 ) {

                if ( self.callback ) {
                    self.callback( self.id, self.units );
                }

                unitsLeft = self.units;
            }

        };
    };

    return UnitsBasedClock;

} );