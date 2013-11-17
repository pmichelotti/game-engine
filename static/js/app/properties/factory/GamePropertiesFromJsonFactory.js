define( [], function() {

    var GamePropertiesFactory = function() {

        this.make = function( json, options ) {

            var retProperties = {};

            retProperties.ticksPerSecond = json.ticksPerSecond;
            retProperties.renderingClockId = json.renderingClock;

        };

    };

    return GamePropertiesFactory;

} );