define( [], function() {

    var ScreenFlow = function( options ) {

        options = options || {};

        var self = this;

        /*
         * A map of String ids to Screen Flow Node objects
         */
        this.nodes = options.nodes;

        /*
         * The Root or starting Screen Flow Node object representing the starting point of the Screen Flow
         */
        this.rootNode = options.rootNode;

    };

    return ScreenFlow;

} );