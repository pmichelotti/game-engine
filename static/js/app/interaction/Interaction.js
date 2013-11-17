define( [], function() {

    var Interaction = function( id, options ) {

        options = options || {};

        this.id = id;
        this.mappings = options.mappings || Array();

    };

    return Interaction;

} );