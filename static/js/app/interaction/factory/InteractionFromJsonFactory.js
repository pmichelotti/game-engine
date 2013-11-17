define( [ 'interaction/Interaction' ], function( Interaction ) {

    var InteractionFactory = function() {

        this.make = function( json, options ) {

            return new Interaction( json.id, json );

        };

    };

    return InteractionFactory;

} );