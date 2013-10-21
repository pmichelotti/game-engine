define( [], function() {

    var ScreenFlowBranch = function( id, options ) {

        options = options || {};

        var self = this;

        this.id = id;

        this.node = options.node;
        this.transition = options.transition;

    };

    return ScreenFlowBranch;

} );